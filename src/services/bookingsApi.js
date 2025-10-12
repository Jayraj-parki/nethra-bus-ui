
import { apiFetch } from "../services/http";
export const bookingsApi = {
  getSeatLayout: (tripId) =>
    apiFetch(`/bookings/seat-layout/?trip_id=${encodeURIComponent(tripId)}`, {
      method: "GET",
    }),
};
