# trips_api.py
import requests
from flask import Blueprint, jsonify

trips_api = Blueprint("trips_api", __name__)

@trips_api.route("/api/hotels")
def get_hotels():
    url = "https://tripadvisor-scraper.p.rapidapi.com/hotels/list"

    headers = {
        "x-rapidapi-key": "YOUR_KEY",
        "x-rapidapi-host": "tripadvisor-scraper.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers)
    return jsonify(response.json())