from app import db
from datetime import datetime


trip_members = db.Table(
    "trip_members",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("trip_id", db.Integer, db.ForeignKey("trips.id"), primary_key=True),
    db.Column("joined_at", db.DateTime, default=datetime.utcnow),
)


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    avatar_color = db.Column(db.String(20), default="#1D9E75")
    home_city = db.Column(db.String(100))
    interests = db.Column(db.String(500))  # comma-separated tags
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    trips_created = db.relationship("Trip", backref="creator", lazy=True)
    trips_joined = db.relationship("Trip", secondary=trip_members, backref="members")
    reviews = db.relationship("Review", backref="author", lazy=True)
    bucket_items = db.relationship("BucketItem", backref="user", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "avatar_color": self.avatar_color,
            "home_city": self.home_city,
            "interests": self.interests.split(",") if self.interests else [],
        }


class Trip(db.Model):
    __tablename__ = "trips"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    destination = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    emoji = db.Column(db.String(10), default="🌍")
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    tags = db.Column(db.String(300))  # comma-separated
    visibility = db.Column(db.String(20), default="open")  # open | invite | private
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    reviews = db.relationship("Review", backref="trip", lazy=True)

    def avg_rating(self):
        if not self.reviews:
            return None
        return round(sum(r.rating for r in self.reviews) / len(self.reviews), 1)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "destination": self.destination,
            "description": self.description,
            "emoji": self.emoji,
            "start_date": str(self.start_date) if self.start_date else None,
            "end_date": str(self.end_date) if self.end_date else None,
            "tags": self.tags.split(",") if self.tags else [],
            "visibility": self.visibility,
            "creator": self.creator.username if self.creator else None,
            "members": [{"id": m.id, "username": m.username, "avatar_color": m.avatar_color} for m in self.members],
            "member_count": len(self.members),
            "rating": self.avg_rating(),
            "created_at": str(self.created_at),
        }


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey("trips.id"), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    rating = db.Column(db.Integer, nullable=False)  # 1–5
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "trip_id": self.trip_id,
            "trip_title": self.trip.title if self.trip else None,
            "author": self.author.username if self.author else None,
            "author_color": self.author.avatar_color if self.author else "#1D9E75",
            "rating": self.rating,
            "body": self.body,
            "created_at": str(self.created_at),
        }


class BucketItem(db.Model):
    __tablename__ = "bucket_items"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    trip_id = db.Column(db.Integer, db.ForeignKey("trips.id"), nullable=True)
    custom_title = db.Column(db.String(200))
    custom_dest = db.Column(db.String(200))
    emoji = db.Column(db.String(10), default="🌍")
    added_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        if self.trip_id:
            t = Trip.query.get(self.trip_id)
            return {
                "id": self.id,
                "trip_id": self.trip_id,
                "title": t.title if t else self.custom_title,
                "destination": t.destination if t else self.custom_dest,
                "emoji": t.emoji if t else self.emoji,
                "added_at": str(self.added_at),
            }
        return {
            "id": self.id,
            "trip_id": None,
            "title": self.custom_title,
            "destination": self.custom_dest,
            "emoji": self.emoji,
            "added_at": str(self.added_at),
        }
