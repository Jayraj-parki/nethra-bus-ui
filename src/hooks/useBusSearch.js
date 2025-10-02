"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  searchBuses,
  selectSearchResults,
  selectSearchLoading,
  selectSearchError,
  selectSearchParams,
  setParams,
  clearResults,
} from "@/store/searchSlice";

export function useBusSearch() {
  const dispatch = useDispatch();
  const results = useSelector(selectSearchResults);
  const loading = useSelector(selectSearchLoading);
  const error = useSelector(selectSearchError);
  const params = useSelector(selectSearchParams);

  const runSearch = async (p) => dispatch(searchBuses(p));
  const updateParams = (p) => dispatch(setParams(p));
  const reset = () => dispatch(clearResults());

  return { results, loading, error, params, runSearch, updateParams, reset };
}
