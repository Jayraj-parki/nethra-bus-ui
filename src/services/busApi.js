
import { apiFetch } from "../services/http";

export const busApi = {
  getAvailableCities: () =>
    apiFetch("/buses/available-cities/", { method: "GET" }),
};
