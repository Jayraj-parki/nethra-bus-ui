"use client";

import { urls } from "@/utils/constants";
import BusResultCard from "./BusResultCard";
import { useEffect, useState } from "react";
import Header from "../common/Header";
import { useBusSearch } from "@/hooks/useBusSearch";

export default function AvailableBuses() {
    const params = useSearchParams();
    const router = useRouter();
    const { results, loading, error, runSearch } = useBusSearch();
    const source = params.get("fromCity") || "";
    const destination = params.get("toCity") || "";
    const date = params.get("date") || "";
    const passengers = Number(params.get("passengers") || 1);
    const visible = results.filter(b => b.availableSeats >= passengers);
    const sampleBus = {
        image: "/assets/images/image.png",
        name: "Express Travels",
        rating: "4.2",
        code: "EXP-001",
        type: "Sleeper",
        driver: "Rajesh Kumar",
        route: "Mumbai → Pune → Delhi",
        features: ["AC", "WiFi", "Charging Point", "Water Bottle"],
        departure: { time: "10:30 PM", city: "Delhi" },
        duration: "8h 00m",
        arrival: { time: "06:30 AM", city: "Kolkata" },
        striked: "2400",
        discount: "15",
        price: "2040",
        perPerson: "1020",
        seats: 25,
        totalSeats: 40
    }
    const [headerData, setHeader] = useState({})
    useEffect(() => {
        if (!source || !destination || !date) router.replace(`${urls.landing_page}`);
        const original_date = new Date(date);
        const formattedDate = original_date.toLocaleDateString("en-US", {
            weekday: "long",  // Tuesday
            day: "numeric",   // 30
            month: "long",    // September
            year: "numeric"   // 2025
        });
        setHeader({
            prevPage: `${urls.landing_page}`, pageHeader: 'Available Buses',
            pageDescription: { from: source, to: destination, date: `${formattedDate}`, passengers: passengers }, pageResult: `Found ${results.length} buses for your journey`, pageType: 'yes'
        })
        runSearch({ source, destination, date });
    }, [source, destination, date, runSearch]);
   
    return (
        <>
            <main className="container row mx-auto col-12 ">
                <Header {...headerData} />
                {loading && <div>Loading...</div>}
                {error && <div className="text-danger">Error: {error}</div>}
                {!loading && !error && results.length === 0 && <div>No buses found.</div>}
                {results.map((b) => (<BusResultCard key={b.id} bus={b} />))}
            </main>
        </>
    );
}
