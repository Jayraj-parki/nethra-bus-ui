// src/store/lookupSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { busApi } from "../services/busApi";

// Optional: cache TTL to avoid refetching too often
const TTL_MS = 5 * 60 * 1000; // 5 minutes

export const fetchAvailableCities = createAsyncThunk(
  "lookup/fetchAvailableCities",
  async () => {
    // Expected response:
    // { sources: ["Mumbai", ...], destinations: ["Pune", ...] }
    const data = await busApi.getAvailableCities();

    // Normalize and sort for UX consistency
    const toList = (arr) =>
      Array.from(new Set((arr || []).map((s) => String(s).trim()))).sort(
        (a, b) => a.localeCompare(b),
      );

    return {
      sources: toList(data?.sources),
      destinations: toList(data?.destinations),
      receivedAt: Date.now(),
    };
  }
);

const initialState = {
  sources: [],
  destinations: [],
  loading: false,
  error: null,
  receivedAt: 0,
};

const lookupSlice = createSlice({
  name: "lookup",
  initialState,
  reducers: {
    clearCities(state) {
      state.sources = [];
      state.destinations = [];
      state.loading = false;
      state.error = null;
      state.receivedAt = 0;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchAvailableCities.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(fetchAvailableCities.fulfilled, (s, a) => {
      s.loading = false;
      s.sources = a.payload.sources;
      s.destinations = a.payload.destinations;
      s.receivedAt = a.payload.receivedAt;
    });
    b.addCase(fetchAvailableCities.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error?.message || "Failed to load cities";
    });
  },
});

export const { clearCities } = lookupSlice.actions;

export const selectCitySources = (s) => s.lookup.sources;
export const selectCityDestinations = (s) => s.lookup.destinations;
export const selectCitiesLoading = (s) => s.lookup.loading;
export const selectCitiesError = (s) => s.lookup.error;
export const selectCitiesReceivedAt = (s) => s.lookup.receivedAt;

// Helper to conditionally fetch using TTL
export const ensureAvailableCities =
  () =>
  (dispatch, getState) => {
    const last = selectCitiesReceivedAt(getState());
    const fresh = last && Date.now() - last < TTL_MS;
    if (!fresh) {
      return dispatch(fetchAvailableCities());
    }
    return Promise.resolve();
  };

export default lookupSlice.reducer;
