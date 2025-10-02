import { busApi } from "@/services/busApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// Normalize and parse server payload
const normalizeBus = (b) => ({
  id: b.id,
  departureTimeUtc: b.departure_time,  
  arrivalTimeUtc: b.arrival_time,       
  price: Number(b.price),              
  discountedPrice: b.discounted_price != null ? Number(b.discounted_price) : null,
  busNumber: b.bus_number,
  totalSeats: b.total_seats,
  availableSeats: b.available_seats,
  amenities: (b.amenities || "").split(",").map(s => s.trim()).filter(Boolean),
  type: b.type,                          
  driverName: b.driver_name,
  discountText: b.discount,             
  rating: Number(b.rating || 0),
  busId: b.bus,
  routeId: b.route,
  createdAt: b.created_at,
  updatedAt: b.updated_at,
});

export const searchBuses = createAsyncThunk(
  "search/searchBuses",
  async ({ source, destination, date }) => {
    // Basic client-side validation
    if (!source || !destination || !date) {
      throw new Error("source, destination and date are required");
    }
    const data = await busApi.searchBuses({ source, destination, date });
    const list = Array.isArray(data?.buses) ? data.buses : [];
    return {
      params: { source, destination, date },
      results: list.map(normalizeBus),
      receivedAt: Date.now(),
    };
  }
);

const initialState = {
  params: { source: "", destination: "", date: "" ,passengers: 1},
  results: [],
  loading: false,
  error: null,
  receivedAt: 0,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearResults(state) {
      state.results = [];
      state.error = null;
      state.loading = false;
      state.receivedAt = 0;
    },
    setParams(state, action) {
      state.params = { ...state.params, ...action.payload };
    },
  },
  extraReducers: (b) => {
    b.addCase(searchBuses.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(searchBuses.fulfilled, (s, a) => {
      s.loading = false;
      s.params = a.payload.params;
      s.results = a.payload.results;
      s.receivedAt = a.payload.receivedAt;
    });
    b.addCase(searchBuses.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error?.message || "Failed to search buses";
    });
  },
});

export const { clearResults, setParams } = searchSlice.actions;

export const selectSearchParams = (s) => s.search.params;
export const selectSearchResults = (s) => s.search.results;
export const selectSearchLoading = (s) => s.search.loading;
export const selectSearchError = (s) => s.search.error;

export default searchSlice.reducer;
