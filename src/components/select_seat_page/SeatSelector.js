"use client";
import { urls } from "@/utils/constants";
import Header from "../common/Header";
import style from "./SeatSelector.module.scss";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const seatLayout = [
    ["A1", "A2", "", "A3", "A4"],
    ["B1", "B2", "", "B3", "B4"],
    ["C1", "C2", "", "C3", "C4"],
    ["D1", "D2", "", "D3", "D4"],
    ["E1", "E2", "", "E3", "E4"],
    ["F1", "F2", "", "F3", "F4"],
    ["G1", "G2", "", "G3", "G4"],
    ["H1", "H2", "", "H3", "H4"],
];

const occupied = ["B1", "D2", "A3", "C4", "F1", "E3", "G4", "H2"];
const demoTrip = {
    name: "Express Travels",
    code: "EXP - 001",
    driver: "Rajesh Kumar",
    route: "Delhi → Kolkata",
    date: "Tuesday 30 September, 2025",
    departure: "10:30 PM",
    arrival: "06:30 AM",
    passengers: 2,
    price: 1200,
    discount: 15
};

export default function SeatSelector() {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [headerData,setHeader]=useState({})
    const passengers = demoTrip.passengers;
    const requiredSeats = passengers - selectedSeats.length;

    function handleSelect(seat) {
        if (occupied.includes(seat)) return;
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else if (selectedSeats.length < passengers) {
            setSelectedSeats([...selectedSeats, seat]);
        }
    }
    useEffect(()=>{
        setHeader({
            prevPage: `${urls.available_bus}`, pageHeader:'Select Your Seats', pageDescription:`Choose ${passengers} seats for your journey`, pageResult:'', pageType :''
        })
    },[])

    return (
        <div className="container">
           
            <Header  {...headerData}/>
            <div className="row align-items-start">
                <div className="col-lg-7 ">
                    <div className={style.card + ' border shadow-none '}>
                        <div className=" mb-2">
                            <div className="d-flex flex-wrap justify-content-between align-items-between">
                                <span className="">Bus Layout - Sleeper</span>
                                <span className="badge bg-light text-dark text-center p-2 ms-2 border bg-transparent">{demoTrip.code}</span>
                            </div>
                            <div className="col my-4 d-flex flex-wrap justify-content-end align-items-end">
                                <span className="d-flex flex-wrap justify-content-center align-items-center text-bg-light px-2 py-1 rounded-3">
                                    <i className="  bi bi-person-badge   fs-5 text-primary me-1"></i>
                                    <span>Driver</span>
                                </span>
                            </div>
                        </div>
                        {/* Seat Grid */}
                        <div className={style.seatGrid }>
                            {Array(5).fill(0).map((_, colIdx) => (
                                <div className={style.seatColumn} key={colIdx}>
                                    {seatLayout.map((row, rowIdx) => {
                                        const seat = row[colIdx];
                                        if (!seat) return <span key={rowIdx} style={{ height: "44px" }}></span>;
                                        const occupiedSeat = occupied.includes(seat);
                                        const selectedSeat = selectedSeats.includes(seat);
                                        return (
                                            <span
                                                key={seat}
                                                className={
                                                    style.seatBtn + " " +
                                                    (occupiedSeat
                                                        ? style.seatOccupied
                                                        : selectedSeat
                                                            ? style.seatSelected
                                                            : style.seatAvailable)
                                                }
                                                onClick={() => handleSelect(seat)}
                                            >
                                                {seat}
                                            </span>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                        {/* Legend */}
                        <div className={style.legend +  " rows mx-auto d-flex justify-content-center mt-4 align-items-center flex-wrap"}>
                            <div className="legendItem col-12 col-sm-auto   d-flex justify-content-center mt-sm-4 align-items-center">
                                <span className={style.seatLegend + " border shadow-sm  " + style.availableLegend}></span><span className="mx-3 mx-sm-1">Available</span>
                            </div>
                            <div className="legendItem  col-12 col-sm-auto  d-flex justify-content-center  mt-sm-4 align-items-center">
                                <span className={style.seatLegend + " " + style.selectedLegend}></span><span className="mx-3 mx-sm-1">Selected</span>
                            </div>
                            <div className="legendItem col-12 col-sm-auto  d-flex justify-content-center mt-sm-4 align-items-center">
                                <span className={style.seatLegend + " " + style.occupiedLegend}></span><span className="mx-3 mx-sm-1">Occupied</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Trip Details & Fare */}
                <div className="col-lg-5">
                    <div className={style.tripDetails + ' border shadow-none '}>
                        <div className={style.sectionHeader + ' mb-3 '}><small className="text-muted fs-6">Trip Details</small></div>
                        <div className="fw-medium ">{demoTrip.name}</div>
                        <div className="text-muted text-body-tertiary small mb-2">{demoTrip.code}</div>
                        <hr />
                        <div className="d-flex justify-content-between align-content-between pt-1"><span className="text-muted fs-6 fw-medium me-auto">Route:</span> {demoTrip.route}</div>
                        <div className="d-flex justify-content-between align-content-between pt-1"><span className="text-muted fs-6 fw-medium me-auto">Date:</span> {demoTrip.date}</div>
                        <div className="d-flex justify-content-between align-content-between pt-1"><span className="text-muted fs-6 fw-medium me-auto">Departure:</span> {demoTrip.departure}</div>
                        <div className="d-flex justify-content-between align-content-between pt-1"><span className="text-muted fs-6 fw-medium me-auto">Arrival:</span> {demoTrip.arrival}</div>
                        <div className="d-flex justify-content-between align-content-between pt-1"><span className="text-muted fs-6 fw-medium me-auto">Driver:</span> <i className="bi bi-person-badge me-1"></i> {demoTrip.driver}</div>
                        <hr />
                        <div className="d-flex justify-content-between align-content-between pt-1"><span className="text-muted fs-6 fw-medium me-auto">Selected Seats:</span> <span className="">{selectedSeats.length ? selectedSeats.join(", ") : "None"}</span></div>
                        <div className="d-flex justify-content-between align-content-between pt-1"><span className="text-muted fs-6 fw-medium me-auto">Passengers:</span> {passengers}</div>
                        <div className="d-flex justify-content-between align-content-between pt-1"   ><span className="text-muted fs-6 fw-medium me-auto">Required Seats:</span> {requiredSeats > 0 ? `${requiredSeats} more` : "Done"}</div>
                    </div>
                    <div className={style.fareDetails}>
                        <div className={style.sectionHeader + ' mb-3'}>Fare Details</div>
                        <div className="d-flex justify-content-between align-content-between pt-1"><span className="text-muted fs-6 fw-medium me-auto">Base Fare: </span><span >₹{demoTrip.price} x {selectedSeats.length}</span></div>
                        <div className="d-flex justify-content-between align-content-between pt-1 text-danger"><span className="text-muted fs-6 fw-medium me-auto">% Discount ({demoTrip.discount}%):</span> -₹{selectedSeats.length ? Math.round((demoTrip.price * demoTrip.discount / 100) * selectedSeats.length) : "0"}</div>
                        <hr />
                        <div className="fw-medium me-auto "><span className="fw-medium me-auto">Total Amount:</span> ₹{selectedSeats.length ? (demoTrip.price - Math.round(demoTrip.price * demoTrip.discount / 100)) * selectedSeats.length : "0"}</div>
                        <Link href={urls?.booking_confirmed} className={`${style.bookBtn} d-block fs-6 ${ requiredSeats > 0 ? style.btn_disabled : ''}`} disabled={requiredSeats > 0}>
                            Book Now – ₹{selectedSeats.length ? (demoTrip.price - Math.round(demoTrip.price * demoTrip.discount / 100)) * selectedSeats.length : "0"}
                        </Link>
                        {requiredSeats > 0 &&
                            <div className="text-danger text-center small">
                                Please select {requiredSeats} more seat{requiredSeats > 1 ? "s" : ""}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
