"use client";
import style from "./searchBusForm.module.scss";
import { useState } from "react";
import CustomSelect from "../common/CustomSelect";
import CustomDatePicker from "../common/CustomDatePicker";
import Link from "next/link";
import { urls } from "@/utils/constants";
import { useAvailableCities } from "@/hooks/useAvailableCities";
export default function SearchBusForm() {
    const router = useRouter();
    const { sources, destinations, loading, error } = useAvailableCities();
    const [fromCity, setFromCity] = useState("");
    const [toCity, setToCity] = useState("");
    const [passengers, setPassengers] = useState(1);
    const today = new Date().toISOString().split("T")[0]; // "yyyy-mm-dd"
    const [date, setDate] = useState(today);
    const max_passenger = 6
    // const cityOptions = [
    //     { value: "Mumbai", label: "Mumbai" },
    //     { value: "Delhi", label: "Delhi" },
    //     { value: "Bangalore", label: "Bangalore" },
    //     { value: "Chennai", label: "Chennai" },
    //     { value: "Kolkata", label: "Kolkata" },
    // ];
    const onSelect = (type, val) => {
        if (type === "from") setFromCityet(val);
        else setToCity(val);
        onChange?.({ from: type === "from" ? val : from, to: type === "to" ? val : to });
    };

    const passengerOptions = Array.from({ length: max_passenger }, (_, i) => ({
        value: i + 1,
        label: `${i + 1} Passenger${i > 0 ? "s" : ""}`,
    }));

    const swapCities = () => {
        setFromCity(toCity);
        setToCity(fromCity);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!fromCity || !toCity || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
        if (passengers < 1 || passengers > max_passenger) return;
        const qs = new URLSearchParams({ fromCity, toCity, date,passengers: String(passengers) }).toString();
        router.push(
            `/${urls.available_bus}?${qs}`
        );
    };

    return (
        <section className={style.bus_search_wrapper + ' mt-5 mb-5 p-4 border rounded-4'}>
            <h5 className={style.heading}>
                <i className="bi bi-search"></i> Search Bus Tickets
            </h5>
            <p className={style.subtext}>
                Enter your travel details to find available buses
            </p>
            {error && <p className="text-danger small mt-1">Failed to load cities: {error}</p>}
            <form className={style.form_section} onSubmit={handleSubmit}>
                <div className="row g-3 align-items-end">
                    {/* From */}
                    <div className="col-md-6">
                        <label className={style.label}>
                            <i className="bi bi-geo-alt"></i> From
                        </label>
                        <CustomSelect
                            options={sources}
                            value={fromCity}
                            onChange={(value) => onSelect("from", value)}
                            placeholder={loading ? "Loading..." : "Select Departure city"}
                            isSearchable
                            isDisabled={loading || !!error}
                        />
                    </div>

                    {/* To */}
                    <div className="col-md-6">
                        <label className={style.label}>
                            <i className="bi bi-geo-alt"></i> To
                        </label>
                        <CustomSelect
                            options={destinations}
                            value={toCity}
                            onChange={(value) => onSelect("to", value)}
                            placeholder={loading ? "Loading..." : "Select Arrival city"}
                            isSearchable
                            isDisabled={loading || !!error}
                        />
                    </div>

                    {/* Swap Button */}
                    <div className="col d-flex justify-content-center mx-auto">
                        <button
                            type="button"
                            className={style.swap_btn}
                            onClick={swapCities}
                        >
                            <i className="bi bi-arrow-left-right"></i> Swap Cities
                        </button>
                    </div>
                </div>

                <div className="row g-3 mt-3 align-items-end">
                    {/* Travel Date */}
                    <div className="col-md-6  ">
                        <label className={style.label}>
                            <i className="bi bi-calendar"></i> Travel Date
                        </label>
                        <CustomDatePicker
                            selected={date}
                            onChange={setDate}
                            placeholder="dd-mm-yyyy"
                        />
                    </div>

                    {/* Passengers */}
                    <div className="col-md-6">
                        <label className={style.label}>
                            <i className="bi bi-person"></i> Passengers
                        </label>
                        <CustomSelect
                            options={passengerOptions}
                            value={passengers}
                            onChange={setPassengers}
                            placeholder="Select number of passengers"
                            isSearchable={true}
                        />
                    </div>
                </div>

                {/* Search Button */}
                <div className="row mt-4">
                    <div className="col-12">
                        <button type="submit" className={style.search_btn}>
                            <i className="bi bi-search"></i> Search Buses
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}
