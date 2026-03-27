from flask import Blueprint, request, jsonify
from app import db
from models.models import Review, Trip, User

reviews_bp = Blueprint("reviews", __name__)


@reviews_bp.route("/", methods=["GET"])
def get_reviews():
    trip_id = request.args.get("trip_id")
    query = Review.query
    if trip_id:
        query = query.filter_by(trip_id=trip_id)
    reviews = query.order_by(Review.created_at.desc()).all()
    return jsonify([r.to_dict() for r in reviews])


@reviews_bp.route("/", methods=["POST"])
def create_review():
    data = request.get_json()
    required = ["trip_id", "author_id", "rating", "body"]
    if not all(k in data for k in required):
        return jsonify({"error": "Missing required fields"}), 400

    if not (1 <= int(data["rating"]) <= 5):
        return jsonify({"error": "Rating must be between 1 and 5"}), 400

    # Check user was a member of the trip
    trip = Trip.query.get_or_404(data["trip_id"])
    user = User.query.get_or_404(data["author_id"])
    if user not in trip.members:
        return jsonify({"error": "Only trip members can leave reviews"}), 403

    # One review per user per trip
    existing = Review.query.filter_by(
        trip_id=data["trip_id"], author_id=data["author_id"]
    ).first()
    if existing:
        return jsonify({"error": "You already reviewed this trip"}), 409

    review = Review(
        trip_id=data["trip_id"],
        author_id=data["author_id"],
        rating=data["rating"],
        body=data["body"],
    )
    db.session.add(review)
    db.session.commit()
    return jsonify(review.to_dict()), 201


@reviews_bp.route("/<int:review_id>", methods=["DELETE"])
def delete_review(review_id):
    review = Review.query.get_or_404(review_id)
    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Review deleted"})
