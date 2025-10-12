// src/hooks/useSeatLayout.js
"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchSeatLayout,
  setPassengers,
  toggleSeat,
  clearSelection,
  selectSeatMap,
  selectSelectedSeats,
  selectPassengers,
  selectSeatLoading,
  selectSeatError,
} from "@/store/seatLayoutSlice";
import { useEffect } from "react";

export function useSeatLayout({ tripId, passengers = 1 }) {
  const dispatch = useDispatch();
  const seatMap = useSelector(selectSeatMap);
  const selected = useSelector(selectSelectedSeats);
  const pax = useSelector(selectPassengers);
  const loading = useSelector(selectSeatLoading);
  const error = useSelector(selectSeatError);

  useEffect(() => {
    dispatch(setPassengers(passengers));
  }, [dispatch, passengers]);

  useEffect(() => {
    if (tripId) dispatch(fetchSeatLayout({ tripId }));
  }, [dispatch, tripId]);

  return {
    seatMap,
    selected,
    passengers: pax,
    loading,
    error,
    toggle: (seat) => dispatch(toggleSeat(seat)),
    clear: () => dispatch(clearSelection()),
    refetch: () => dispatch(fetchSeatLayout({ tripId })),
  };
}
