"use client";
import { urls } from "@/utils/constants";
import Header from "../common/Header";
import style from "./SeatSelector.module.scss";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSeatLayout } from "@/src/hooks/useSeatLayout";

const seatGridShape = [
  ["A1", "A2", "", "A3", "A4"],
  ["B1", "B2", "", "B3", "B4"],
  ["C1", "C2", "", "C3", "C4"],
  ["D1", "D2", "", "D3", "D4"],
  ["E1", "E2", "", "E3", "E4"],
  ["F1", "F2", "", "F3", "F4"],
  ["G1", "G2", "", "G3", "G4"],
  ["H1", "H2", "", "H3", "H4"],
];

const demoTrip = {
  name: "Express Travels",
  code: "EXP - 001",
  driver: "Rajesh Kumar",
  route: "Delhi → Kolkata",
  date: "Tuesday 30 September, 2025",
  departure: "10:30 PM",
  arrival: "06:30 AM",
  price: 1200,
  discount: 15,
};

export default function SeatSelector() {
  const params = useSearchParams();
  const tripId = params.get("trip_id") || "1";
  const passengersParam = Number(params.get("passengers") || 1);

  const { seatMap, selected, passengers, loading, error, toggle } = useSeatLayout({
    tripId,
    passengers: passengersParam,
  });

  const [headerData, setHeader] = useState({});
  const requiredSeats = Math.max(0, passengers - selected.length);

  useEffect(() => {
    setHeader({
      prevPage: `${urls.available_bus}`,
      pageHeader: "Select Your Seats",
      pageDescription: `Choose ${passengers} seats for your journey`,
      pageResult: "",
      pageType: "",
    });
  }, [passengers]);

  const isBooked = (seat) => seatMap[seat]?.booked === true;

  const total = useMemo(() => {
    const base = demoTrip.price * selected.length;
    const disc = Math.round((demoTrip.price * demoTrip.discount) / 100) * selected.length;
    return base - disc;
  }, [selected]);

  return (
    <div className="container">
      <Header {...headerData} />
      <div className="row align-items-start">
        <div className="col-lg-7">
          <div className={style.card + " border shadow-none"}>
            <div className="mb-2">
              <div className="d-flex flex-wrap justify-content-between">
                <span>Bus Layout - Sleeper</span>
                <span className="badge bg-light text-dark text-center p-2 ms-2 border bg-transparent">
                  {demoTrip.code}
                </span>
              </div>
              <div className="col my-4 d-flex flex-wrap justify-content-end">
                <span className="d-flex align-items-center text-bg-light px-2 py-1 rounded-3">
                  <i className="bi bi-person-badge fs-5 text-primary me-1"></i>
                  <span>Driver</span>
                </span>
              </div>
            </div>

            {/* Seat Grid */}
            {loading && <div className="text-muted mb-2">Loading seat layout...</div>}
            {error && <div className="text-danger mb-2">Error: {error}</div>}

            <div className={style.seatGrid}>
              {Array(5)
                .fill(0)
                .map((_, colIdx) => (
                  <div className={style.seatColumn} key={colIdx}>
                    {seatGridShape.map((row, rowIdx) => {
                      const seat = row[colIdx];
                      if (!seat) return <span key={rowIdx} style={{ height: "44px" }} />;
                      const booked = isBooked(seat);
                      const isSelected = selected.includes(seat);
                      const classes =
                        style.seatBtn +
                        " " +
                        (booked
                          ? style.seatOccupied
                          : isSelected
                          ? style.seatSelected
                          : style.seatAvailable);
                      return (
                        <span key={seat} className={classes} onClick={() => !booked && toggle(seat)}>
                          {seat}
                        </span>
                      );
                    })}
                  </div>
                ))}
            </div>

            {/* Legend */}
            <div className={style.legend + " rows mx-auto d-flex justify-content-center mt-4 align-items-center flex-wrap"}>
              <div className="legendItem col-12 col-sm-auto d-flex justify-content-center mt-sm-4 align-items-center">
                <span className={style.seatLegend + " border shadow-sm " + style.availableLegend}></span>
                <span className="mx-3 mx-sm-1">Available</span>
              </div>
              <div className="legendItem col-12 col-sm-auto d-flex justify-content-center mt-sm-4 align-items-center">
                <span className={style.seatLegend + " " + style.selectedLegend}></span>
                <span className="mx-3 mx-sm-1">Selected</span>
              </div>
              <div className="legendItem col-12 col-sm-auto d-flex justify-content-center mt-sm-4 align-items-center">
                <span className={style.seatLegend + " " + style.occupiedLegend}></span>
                <span className="mx-3 mx-sm-1">Occupied</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Details & Fare */}
        <div className="col-lg-5">
          <div className={style.tripDetails + " border shadow-none"}>
            <div className={style.sectionHeader + " mb-3"}>
              <small className="text-muted fs-6">Trip Details</small>
            </div>
            <div className="fw-medium ">{demoTrip.name}</div>
            <div className="text-muted text-body-tertiary small mb-2">{demoTrip.code}</div>
            <hr />
            <div className="d-flex justify-content-between pt-1">
              <span className="text-muted fs-6 fw-medium me-auto">Route:</span> {demoTrip.route}
            </div>
            <div className="d-flex justify-content-between pt-1">
              <span className="text-muted fs-6 fw-medium me-auto">Date:</span> {demoTrip.date}
            </div>
            <div className="d-flex justify-content-between pt-1">
              <span className="text-muted fs-6 fw-medium me-auto">Departure:</span> {demoTrip.departure}
            </div>
            <div className="d-flex justify-content-between pt-1">
              <span className="text-muted fs-6 fw-medium me-auto">Arrival:</span> {demoTrip.arrival}
            </div>
            <div className="d-flex justify-content-between pt-1">
              <span className="text-muted fs-6 fw-medium me-auto">Driver:</span>{" "}
              <i className="bi bi-person-badge me-1"></i> {demoTrip.driver}
            </div>
            <hr />
            <div className="d-flex justify-content-between pt-1">
              <span className="text-muted fs-6 fw-medium me-auto">Selected Seats:</span>{" "}
              <span>{selected.length ? selected.join(", ") : "None"}</span>
            </div>
            <div className="d-flex justify-content-between pt-1">
              <span className="text-muted fs-6 fw-medium me-auto">Passengers:</span> {passengers}
            </div>
            <div className="d-flex justify-content-between pt-1">
              <span className="text-muted fs-6 fw-medium me-auto">Required Seats:</span>{" "}
              {requiredSeats > 0 ? `${requiredSeats} more` : "Done"}
            </div>
          </div>

          <div className={style.fareDetails}>
            <div className={style.sectionHeader + " mb-3"}>Fare Details</div>
            <div className="d-flex justify-content-between pt-1">
              <span className="text-muted fs-6 fw-medium me-auto">Base Fare:</span>
              <span>₹{demoTrip.price} x {selected.length}</span>
            </div>
            <div className="d-flex justify-content-between pt-1 text-danger">
              <span className="text-muted fs-6 fw-medium me-auto">
                % Discount ({demoTrip.discount}%):
              </span>{" "}
              -₹{selected.length ? Math.round((demoTrip.price * demoTrip.discount) / 100) * selected.length : "0"}
            </div>
            <hr />
            <div className="fw-medium me-auto">
              <span className="fw-medium me-auto">Total Amount:</span> ₹{total}
            </div>

            <Link
              href={`${urls.booking_confirmed}?trip_id=${tripId}&seats=${encodeURIComponent(selected.join(","))}&amount=${total}`}
              className={`${style.bookBtn} d-block fs-6 ${requiredSeats > 0 ? style.btn_disabled : ""}`}
              aria-disabled={requiredSeats > 0}
              onClick={(e) => {
                if (requiredSeats > 0) e.preventDefault();
              }}
            >
              Book Now – ₹{total}
            </Link>
            {requiredSeats > 0 && (
              <div className="text-danger text-center small">
                Please select {requiredSeats} more seat{requiredSeats > 1 ? "s" : ""}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
