const BASE = "http://localhost:5000/api";

async function req(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
  const data = await res.json().catch(() => null);
  throw new Error(data?.error || `API error ${res.status}`);
}
}

// Trips
export const getTrips = (tag) =>
  req(`/trips/${tag ? `?tag=${tag}` : ""}`);

export const getTrendingTrips = () => req("/trips/trending");

export const getTrip = (id) => req(`/trips/${id}`);

export const createTrip = (data) =>
  req("/trips/", { method: "POST", body: JSON.stringify(data) });

export const joinTrip = (tripId, userId) =>
  req(`/trips/${tripId}/join`, { method: "POST", body: JSON.stringify({ user_id: userId }) });

export const leaveTrip = (tripId, userId) =>
  req(`/trips/${tripId}/leave`, { method: "POST", body: JSON.stringify({ user_id: userId }) });

// Users
export const createUser = (data) =>
  req("/users/", { method: "POST", body: JSON.stringify(data) });

export const getUser = (id) => req(`/users/${id}`);

export const getUserSuggestions = (userId) =>
  req(`/users/${userId}/suggestions`);

export const getUserTrips = (userId) => req(`/users/${userId}/trips`);

// Reviews
export const getReviews = (tripId) =>
  req(`/reviews/${tripId ? `?trip_id=${tripId}` : ""}`);

export const createReview = (data) =>
  req("/reviews/", { method: "POST", body: JSON.stringify(data) });

// Bucket list
export const getBucket = (userId) => req(`/bucket/${userId}`);

export const addToBucket = (data) =>
  req("/bucket/", { method: "POST", body: JSON.stringify(data) });

export const removeFromBucket = (itemId) =>
  req(`/bucket/${itemId}`, { method: "DELETE" });
