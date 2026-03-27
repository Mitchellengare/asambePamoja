"""
Run this once to seed the database with sample data.
Usage: python seed.py
"""
from app import create_app, db
from models.models import User, Trip, Review, BucketItem
from datetime import date

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()

    # Users
    users = [
        User(username="Mitchelle", email="mitchelle@example.com", avatar_color="#1D9E75", home_city="Hanover, NH", interests="africa,culture,adventure"),
        User(username="Amara", email="amara@example.com", avatar_color="#D85A30", home_city="Nairobi, Kenya", interests="africa,beach,food"),
        User(username="David", email="david@example.com", avatar_color="#534AB7", home_city="London, UK", interests="europe,culture,history"),
        User(username="Sofia", email="sofia@example.com", avatar_color="#BA7517", home_city="Rome, Italy", interests="europe,food,beach"),
    ]
    for u in users:
        db.session.add(u)
    db.session.flush()

    # Trips
    trips = [
        Trip(title="Serengeti Migration", destination="Tanzania", description="Witness the great wildebeest migration across the Serengeti plains.", emoji="🦁", start_date=date(2025, 8, 12), end_date=date(2025, 8, 22), tags="africa,adventure", visibility="open", creator_id=users[1].id),
        Trip(title="Amalfi Coast Drive", destination="Italy", description="Wind through cliffside villages and turquoise coves on the Amalfi Coast.", emoji="🏖️", start_date=date(2025, 9, 5), end_date=date(2025, 9, 14), tags="europe,beach", visibility="open", creator_id=users[3].id),
        Trip(title="Kyoto Cherry Blossom", destination="Japan", description="Experience hanami season in the ancient capital of Japan.", emoji="🌸", start_date=date(2026, 4, 1), end_date=date(2026, 4, 10), tags="asia,culture", visibility="open", creator_id=users[2].id),
        Trip(title="Machu Picchu Trek", destination="Peru", description="Hike the Inca Trail to the lost city of the Incas.", emoji="🏔️", start_date=date(2025, 7, 20), end_date=date(2025, 7, 30), tags="americas,adventure", visibility="open", creator_id=users[0].id),
        Trip(title="Zanzibar Beach Week", destination="Tanzania", description="Spice island beaches, dhow cruises, and Stone Town culture.", emoji="🌺", start_date=date(2025, 12, 10), end_date=date(2025, 12, 17), tags="africa,beach", visibility="open", creator_id=users[1].id),
        Trip(title="Paris & Versailles", destination="France", description="Art, food, and the grandeur of Versailles in autumn.", emoji="🏙️", start_date=date(2025, 10, 3), end_date=date(2025, 10, 8), tags="europe,culture", visibility="open", creator_id=users[3].id),
    ]
    for t in trips:
        db.session.add(t)
    db.session.flush()

    # Members
    trips[0].members.extend([users[1], users[0], users[2]])
    trips[1].members.extend([users[3], users[2]])
    trips[2].members.extend([users[2], users[0], users[1], users[3]])
    trips[3].members.extend([users[0], users[1]])
    trips[4].members.extend([users[1], users[0], users[3]])
    trips[5].members.extend([users[3], users[2]])

    db.session.flush()

    # Reviews
    reviews = [
        Review(trip_id=trips[0].id, author_id=users[0].id, rating=5, body="An absolutely life-changing experience. The wildebeest crossing was unlike anything I have ever seen. Joining this group made all the difference."),
        Review(trip_id=trips[0].id, author_id=users[2].id, rating=5, body="Perfectly organized. Everyone contributed ideas and the shared itinerary feature kept us all aligned. Would join again in a heartbeat."),
        Review(trip_id=trips[1].id, author_id=users[2].id, rating=5, body="The drive from Positano to Ravello at sunset is something I will never forget. Great group energy throughout."),
        Review(trip_id=trips[2].id, author_id=users[0].id, rating=5, body="Sakura season in Kyoto is surreal. The collaborative planning meant we never wasted a moment. Perfect trip."),
        Review(trip_id=trips[3].id, author_id=users[1].id, rating=4, body="Challenging hike but so worth it. The group kept morale high on the tough days. Machu Picchu at sunrise is breathtaking."),
    ]
    for r in reviews:
        db.session.add(r)

    # Bucket items
    bucket_items = [
        BucketItem(user_id=users[0].id, trip_id=trips[2].id),
        BucketItem(user_id=users[0].id, trip_id=trips[4].id),
        BucketItem(user_id=users[0].id, custom_title="Gorilla Trekking", custom_dest="Rwanda", emoji="🦍"),
    ]
    for b in bucket_items:
        db.session.add(b)

    db.session.commit()
    print("✓ Database seeded successfully.")
    print(f"  {len(users)} users, {len(trips)} trips, {len(reviews)} reviews, {len(bucket_items)} bucket items")
