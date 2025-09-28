'use client';
import React, { useState } from "react";
import style from './Bookinghistory.module.scss';
import InfoCard from "./Card";
import Ticket from "./Ticket";

const Bookinghistory = () => {
  const [active, setActive] = useState("recent");
  const bookings = [
  {
    company: "Express Travels",
    route: "Mumbai → Delhi",
    date: "1 Oct 2025",
    passenger: "Guest User",
    amount: "₹1,020",
    seats: "H3",
    bookedOn: "26 Sept 2025",
  },
  {
    company: "Express Travels",
    route: "Delhi → Jaipur",
    date: "5 Oct 2025",
    passenger: "Rahul Sharma",
    amount: "₹850",
    seats: "B2, B3",
    bookedOn: "27 Sept 2025",
  },
]; 

  return (
    <div className={`container mt-4 mb-5 ${style.top}`}>
      <h2 className="ms-5 text-2xl">John Doe Booking History </h2>
      <p className="ms-5 text-secondary">
        View your guest session bookings - these will be cleared when you end the session
      </p>

    
      <div className={`container d-flex gap-3 mb-4 ${style.tab}`}>
        <button
          className={`${style.b1} ${active === "recent" ? style.active : style.inactive}`}
          onClick={() => setActive("recent")}
        >
          Recent Bookings
        </button>
        <button
          className={`${style.b1} ${active === "cancelled" ? style.active : style.inactive}`}
          onClick={() => setActive("cancelled")}
        >
          Cancelled Bookings
        </button>
      </div>

     
      <div className={active === "recent" ? "d-block" : "d-none"}>
        <div >
        
          
          <InfoCard
          icon={"🎫"}
            title="No confirmed bookings"
            subtitle="You haven't made any guest bookings yet. Start by searching for buses!"
          />
           <InfoCard
          icon={"📝"}
            title="No bookings history"
            subtitle="Your guest booking history will appear here once you make your first booking in this session."
          />
          <Ticket bookings={bookings} />;
        </div>
      </div>

      
      <div className={active === "cancelled" ? "d-block" : "d-none"}>
        <div >
         
          <InfoCard
          icon={"✅"}
            title="No cancelled bookings"
            subtitle="Great! You haven't cancelled any bookings."
          />
           <InfoCard
          icon={"🎫"}
            title="No confirmed bookings"
            subtitle="You haven't made any guest bookings yet. Start by searching for buses!"
          />
           {/* <Ticket bookings={bookings} />; */}
           <div className={`container mt-4 ${style.w}`}>
      {bookings.map((booking, index) => (
        <div
          key={index}
          className="card p-3 mb-4 shadow-sm border rounded-3"
        >
         
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className={`fw-bold ${style.f}`}>{booking.company}</h5>
            <div>
              <span className="badge bg-danger me-2"  style={{ backgroundColor: "#4b0082", color: "#fff" }}>Cancelled</span>
             
            </div>
          </div>

         
          <div className="row">
            <div className="col-md-6 mb-2">
              <p className="mb-1">
                <i className="bi bi-geo-alt-fill me-2"></i>
                {booking.route}
              </p>
              <p className="mb-1">
                <i className="bi bi-calendar-event me-2"></i>
                Travel Date: {booking.date}
              </p>
              <p className="mb-1">
                <i className="bi bi-person-fill me-2"></i>
                Passenger: {booking.passenger}
              </p>
            </div>

            <div className="col-md-6 mb-2">
              <p className="mb-1">
                <i className="bi bi-credit-card me-2"></i>
                Amount: {booking.amount}
              </p>
              <p className="mb-1">Seats: <strong>{booking.seats}</strong></p>
              <p className="mb-1">Booked on: {booking.bookedOn}</p>
            </div>
          </div>

          
        </div>
      ))}
    </div>
        </div>
      </div>
    </div>
  );
};

export default Bookinghistory;
