
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookingsApi } from "@/services/bookingsApi";

export const fetchSeatLayout = createAsyncThunk(
  "seatLayout/fetchSeatLayout",
  async ({ tripId }) => {
    if (!tripId) throw new Error("tripId is required");
    const data = await bookingsApi.getSeatLayout(tripId);
    const seats = Array.isArray(data?.seats) ? data.seats : [];
    const byNumber = {};
    seats.forEach((s) => {
      const id = String(s.seat_number).trim();
      byNumber[id] = {
        number: id,
        type: s.seat_type || "",
        booked: Boolean(s.is_booked),
      };
    });

    return {
      seats,
      byNumber,
      receivedAt: Date.now(),
    };
  }
);

const initialState = {
  loading: false,
  error: null,
  seats: [],
  byNumber: {},  // map seatNumber -> { number, type, booked }
  selected: [],
  passengers: 1,
  receivedAt: 0,
};

const seatLayoutSlice = createSlice({
  name: "seatLayout",
  initialState,
  reducers: {
    setPassengers(state, action) {
      const n = Number(action.payload || 1);
      state.passengers = Math.max(1, n);
      // trim selected if over limit
      if (state.selected.length > state.passengers) {
        state.selected = state.selected.slice(0, state.passengers);
      }
    },
    toggleSeat(state, action) {
      const seat = action.payload;
      const info = state.byNumber[seat];
      if (!info || info.booked) return;

      const i = state.selected.indexOf(seat);
      if (i >= 0) {
        state.selected.splice(i, 1);
      } else if (state.selected.length < state.passengers) {
        state.selected.push(seat);
      }
    },
    clearSelection(state) {
      state.selected = [];
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchSeatLayout.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(fetchSeatLayout.fulfilled, (s, a) => {
      s.loading = false;
      s.error = null;
      s.seats = a.payload.seats;
      s.byNumber = a.payload.byNumber;
      s.receivedAt = a.payload.receivedAt;
      // Keep existing selection but drop invalid seats
      s.selected = s.selected.filter((x) => s.byNumber[x] && !s.byNumber[x].booked);
    });
    b.addCase(fetchSeatLayout.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error?.message || "Failed to load seat layout";
    });
  },
});

export const { setPassengers, toggleSeat, clearSelection } = seatLayoutSlice.actions;

export const selectSeatMap = (s) => s.seatLayout.byNumber;
export const selectBooked = (s) => new Set(Object.values(s.seatLayout.byNumber).filter(x => x.booked).map(x => x.number));
export const selectSelectedSeats = (s) => s.seatLayout.selected;
export const selectPassengers = (s) => s.seatLayout.passengers;
export const selectSeatLoading = (s) => s.seatLayout.loading;
export const selectSeatError = (s) => s.seatLayout.error;

export default seatLayoutSlice.reducer;
