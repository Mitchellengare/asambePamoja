# asambePamoja 🌍

A social travel planning platform — create trips, invite others, review destinations, and get personalized suggestions.

---

## Project Structure

```
asambePamoja/
├── backend/          # Flask API
│   ├── app.py
│   ├── config.py
│   ├── requirements.txt
│   ├── models/
│   │   └── models.py
│   └── routes/
│       ├── trips.py
│       ├── users.py
│       ├── reviews.py
│       └── bucket.py
└── frontend/         # React + Vite
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── App.css
        ├── services/
        │   └── api.js
        └── pages/
            ├── Explore.jsx
            ├── CreateTrip.jsx
            ├── TripDetail.jsx
            ├── BucketList.jsx
            └── Reviews.jsx
```

---

## Setup

### 1. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in `backend/`:

```
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///asambepamoja.db   # or your PostgreSQL URL
ANTHROPIC_API_KEY=your-anthropic-key
TRIPADVISOR_API_KEY=your-tripadvisor-key  # optional
```

Run the server:

```bash
python app.py
# Runs on http://localhost:5000
```

---

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/trips/ | List trips (filter by tag/visibility) |
| GET | /api/trips/trending | Trending trips |
| GET | /api/trips/:id | Single trip |
| POST | /api/trips/ | Create trip |
| POST | /api/trips/:id/join | Join a trip |
| POST | /api/trips/:id/leave | Leave a trip |
| POST | /api/users/ | Create user |
| GET | /api/users/:id | Get user |
| GET | /api/users/:id/suggestions | AI-powered trip suggestions |
| GET | /api/users/:id/trips | User's created + joined trips |
| GET | /api/reviews/ | All reviews (or filter by trip_id) |
| POST | /api/reviews/ | Post a review |
| GET | /api/bucket/:user_id | User's bucket list |
| POST | /api/bucket/ | Add to bucket list |
| DELETE | /api/bucket/:item_id | Remove from bucket list |

---

## Features

- **Trip creation** — title, destination, dates, emoji cover, tags, visibility
- **Join/leave trips** — open trips anyone can join
- **Peer reviews** — members rate and review each other's trips (1 review per user per trip)
- **Bucket list** — save any trip to your personal bucket list
- **AI suggestions** — Claude API generates personalized trip recommendations based on user profile
- **Trending feed** — sorted by member count with tag filtering

---

## Adding Real Auth

Currently uses a mock `CURRENT_USER` in `App.jsx`. To add real auth:

1. Add `flask-jwt-extended` to backend
2. Create `POST /api/auth/login` and `POST /api/auth/register` routes
3. Store JWT in `localStorage` on the frontend
4. Pass `Authorization: Bearer <token>` header in `api.js`
5. Replace `CURRENT_USER` in `App.jsx` with a React context

---

## Database

Defaults to SQLite for local dev. For production, set `DATABASE_URL` to a PostgreSQL connection string and install `psycopg2-binary` (already in requirements).
