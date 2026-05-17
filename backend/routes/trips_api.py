import requests
from flask import Blueprint, jsonify, request, current_app

trips_api_bp = Blueprint("trips_api", __name__)

@trips_api_bp.route("/hotels", methods=["GET"])
def get_hotels():
    destination = request.args.get("destination", "")
    url = "https://tripadvisor-scraper.p.rapidapi.com/hotels/list"
    headers = {
        "x-rapidapi-key": current_app.config.get("TRIPADVISOR_API_KEY", ""),
        "x-rapidapi-host": "tripadvisor-scraper.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers, params={"location": destination})
    return jsonify(response.json())