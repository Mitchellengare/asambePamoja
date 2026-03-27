from flask import Blueprint, request, jsonify, current_app
from app import db
from models.models import User, Trip
import anthropic
import json

users_bp = Blueprint("users", __name__)


@users_bp.route("/", methods=["POST"])
def create_user():
    data = request.get_json()
    if not data.get("username") or not data.get("email"):
        return jsonify({"error": "Username and email required"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already exists"}), 409

    user = User(
        username=data["username"],
        email=data["email"],
        avatar_color=data.get("avatar_color", "#1D9E75"),
        home_city=data.get("home_city", ""),
        interests=",".join(data.get("interests", [])),
    )
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201


@users_bp.route("/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())


@users_bp.route("/<int:user_id>/suggestions", methods=["GET"])
def get_suggestions(user_id):
    user = User.query.get_or_404(user_id)

    # Fetch open trips the user hasn't joined
    all_trips = Trip.query.filter_by(visibility="open").all()
    not_joined = [t for t in all_trips if user not in t.members]
    trips_summary = [
        {"id": t.id, "title": t.title, "destination": t.destination,
         "tags": t.tags, "rating": t.avg_rating()}
        for t in not_joined[:20]
    ]

    prompt = f"""You are a travel recommendation engine for a social trip planning platform.

User profile:
- Home city: {user.home_city or 'unknown'}
- Interests: {user.interests or 'general travel'}

Available open trips (JSON):
{json.dumps(trips_summary, indent=2)}

Return a JSON array of up to 4 trip IDs the user would most enjoy, with a one-sentence reason each.
Format: [{{"trip_id": 1, "reason": "..."}}]
Return ONLY valid JSON, no extra text."""

    try:
        client = anthropic.Anthropic(api_key=current_app.config["ANTHROPIC_API_KEY"])
        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=500,
            messages=[{"role": "user", "content": prompt}]
        )
        suggestions_raw = json.loads(message.content[0].text)

        # Hydrate with full trip data
        result = []
        for s in suggestions_raw:
            trip = Trip.query.get(s["trip_id"])
            if trip:
                result.append({**trip.to_dict(), "reason": s["reason"]})

        return jsonify(result)
    except Exception as e:
        # Fallback: return top rated trips
        fallback = sorted(not_joined, key=lambda t: t.avg_rating() or 0, reverse=True)[:4]
        return jsonify([t.to_dict() for t in fallback])


@users_bp.route("/<int:user_id>/trips", methods=["GET"])
def get_user_trips(user_id):
    user = User.query.get_or_404(user_id)
    created = [t.to_dict() for t in user.trips_created]
    joined = [t.to_dict() for t in user.trips_joined if t.creator_id != user_id]
    return jsonify({"created": created, "joined": joined})
