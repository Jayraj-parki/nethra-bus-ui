import { apiFetch } from "./https";

export const busApi = {
  getAvailableCities: () => apiFetch("/buses/available-cities/", { method: "GET" }),
  searchBuses: ({ source, destination, date }) => {
    const qs = new URLSearchParams({
      source: String(source).trim(),
      destination: String(destination).trim(),
      date: String(date).trim(),
    }).toString();
    return apiFetch(`/buses/search/?${qs}`, { method: "GET" });
  },
};
