
import os

class Config:

    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key")

    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "sqlite:///asambepamoja.db")

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

    TRIPADVISOR_API_KEY = os.environ.get("TRIPADVISOR_API_KEY", "")

