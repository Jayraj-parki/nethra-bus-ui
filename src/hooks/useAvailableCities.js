
"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  ensureAvailableCities,
  selectCitySources,
  selectCityDestinations,
  selectCitiesLoading,
  selectCitiesError,
} from "../store/lookupSlice";
import { useEffect } from "react";

export function useAvailableCities() {
  const dispatch = useDispatch();
  const sources = useSelector(selectCitySources);
  const destinations = useSelector(selectCityDestinations);
  const loading = useSelector(selectCitiesLoading);
  const error = useSelector(selectCitiesError);

  useEffect(() => {
    dispatch(ensureAvailableCities());
  }, [dispatch]);

  return { sources, destinations, loading, error, refetch: () => dispatch(ensureAvailableCities()) };
}
