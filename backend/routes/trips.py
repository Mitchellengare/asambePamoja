from flask import Blueprint, request, jsonify
from app import db
from models.models import Trip, User, trip_members

trips_bp = Blueprint("trips", __name__)


@trips_bp.route("/", methods=["GET"])
def get_trips():
    tag = request.args.get("tag")
    visibility = request.args.get("visibility", "open")

    query = Trip.query
    if visibility != "all":
        query = query.filter_by(visibility=visibility)
    if tag:
        query = query.filter(Trip.tags.contains(tag))

    trips = query.order_by(Trip.created_at.desc()).all()
    return jsonify([t.to_dict() for t in trips])


@trips_bp.route("/trending", methods=["GET"])
def get_trending():
    # Trips with most members, last 30 days
    trips = (
        Trip.query
        .filter_by(visibility="open")
        .order_by(Trip.created_at.desc())
        .limit(12)
        .all()
    )
    sorted_trips = sorted(trips, key=lambda t: len(t.members), reverse=True)
    return jsonify([t.to_dict() for t in sorted_trips])


@trips_bp.route("/<int:trip_id>", methods=["GET"])
def get_trip(trip_id):
    trip = Trip.query.get_or_404(trip_id)
    return jsonify(trip.to_dict())


@trips_bp.route("/", methods=["POST"])
def create_trip():
    data = request.get_json()
    required = ["title", "destination", "creator_id"]
    if not all(k in data for k in required):
        return jsonify({"error": "Missing required fields"}), 400

    trip = Trip(
        title=data["title"],
        destination=data["destination"],
        description=data.get("description", ""),
        emoji=data.get("emoji", "🌍"),
        start_date=data.get("start_date"),
        end_date=data.get("end_date"),
        tags=",".join(data.get("tags", [])),
        visibility=data.get("visibility", "open"),
        creator_id=data["creator_id"],
    )
    db.session.add(trip)
    db.session.flush()

    # Creator auto-joins
    creator = User.query.get(data["creator_id"])
    if creator:
        trip.members.append(creator)

    db.session.commit()
    return jsonify(trip.to_dict()), 201


@trips_bp.route("/<int:trip_id>/join", methods=["POST"])
def join_trip(trip_id):
    data = request.get_json()
    user_id = data.get("user_id")
    trip = Trip.query.get_or_404(trip_id)
    user = User.query.get_or_404(user_id)

    if user in trip.members:
        return jsonify({"message": "Already a member"}), 200

    trip.members.append(user)
    db.session.commit()
    return jsonify({"message": "Joined successfully", "trip": trip.to_dict()})


@trips_bp.route("/<int:trip_id>/leave", methods=["POST"])
def leave_trip(trip_id):
    data = request.get_json()
    user_id = data.get("user_id")
    trip = Trip.query.get_or_404(trip_id)
    user = User.query.get_or_404(user_id)

    if user in trip.members:
        trip.members.remove(user)
        db.session.commit()

    return jsonify({"message": "Left trip"})


@trips_bp.route("/<int:trip_id>", methods=["DELETE"])
def delete_trip(trip_id):
    trip = Trip.query.get_or_404(trip_id)
    db.session.delete(trip)
    db.session.commit()
    return jsonify({"message": "Trip deleted"})
