from flask import Blueprint, request, jsonify
from app import db
from models.models import BucketItem, User

bucket_bp = Blueprint("bucket", __name__)


@bucket_bp.route("/<int:user_id>", methods=["GET"])
def get_bucket(user_id):
    User.query.get_or_404(user_id)
    items = BucketItem.query.filter_by(user_id=user_id).order_by(BucketItem.added_at.desc()).all()
    return jsonify([i.to_dict() for i in items])


@bucket_bp.route("/", methods=["POST"])
def add_to_bucket():
    data = request.get_json()
    if not data.get("user_id"):
        return jsonify({"error": "user_id required"}), 400

    # Prevent duplicates
    if data.get("trip_id"):
        existing = BucketItem.query.filter_by(
            user_id=data["user_id"], trip_id=data["trip_id"]
        ).first()
        if existing:
            return jsonify({"message": "Already in bucket list"}), 200

    item = BucketItem(
        user_id=data["user_id"],
        trip_id=data.get("trip_id"),
        custom_title=data.get("title"),
        custom_dest=data.get("destination"),
        emoji=data.get("emoji", "🌍"),
    )
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201


@bucket_bp.route("/<int:item_id>", methods=["DELETE"])
def remove_from_bucket(item_id):
    item = BucketItem.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Removed from bucket list"})
