from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    CORS(app, origins=["http://localhost:5173"])

    from routes.trips import trips_bp
    from routes.users import users_bp
    from routes.reviews import reviews_bp
    from routes.bucket import bucket_bp

    app.register_blueprint(trips_bp, url_prefix="/api/trips")
    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(reviews_bp, url_prefix="/api/reviews")
    app.register_blueprint(bucket_bp, url_prefix="/api/bucket")

    with app.app_context():
        db.create_all()

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)