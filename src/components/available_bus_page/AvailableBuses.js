"use client";

import { urls } from "@/utils/constants";
import BusResultCard from "./BusResultCard";
import { useEffect, useState } from "react";
import Header from "../common/Header";

export default function AvailableBuses() {
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
        setHeader({
            prevPage: `${urls.landing_page}`, pageHeader: 'Available Buses', 
            pageDescription:{from:'Delhi',to:'Mumbai',date:'Tuesday 30 September, 2025',passengers:2}, pageResult: 'Found 2 buses for your journey', pageType: 'yes'
        })
    }, [])
    return (
        <>
            <main className="container row mx-auto col-12 ">
                
                <Header {...headerData}/>
                <BusResultCard bus={sampleBus} />
                <BusResultCard bus={sampleBus} />
                <BusResultCard bus={sampleBus} />
                <BusResultCard bus={sampleBus} />
                <BusResultCard bus={sampleBus} />
                <BusResultCard bus={sampleBus} />
                <BusResultCard bus={sampleBus} />
                <BusResultCard bus={sampleBus} />
                <BusResultCard bus={sampleBus} />
                <BusResultCard bus={sampleBus} />
                <BusResultCard bus={sampleBus} />

            </main>
        </>
    );
}
