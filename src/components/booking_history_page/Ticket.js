import React from "react";
import style from './Ticket.module.scss';
const Ticket = ({ bookings }) => {
  return (
    <div className={`container mt-4 ${style.w}`}>
      {bookings.map((booking, index) => (
        <div
          key={index}
          className="card p-3 mb-4 shadow-sm border rounded-3"
        >
         
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className={`fw-bold ${style.f}`}>{booking.company}</h5>
            <div>
              <span className="badge bg-purple me-2"  style={{ backgroundColor: "#4b0082", color: "#fff" }}>Confirmed</span>
              <span className="badge bg-success">Upcoming</span>
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

          <hr />

          
          <button className={`btn btn-danger fw-bold ${style.cb}`}>
            <i className="bi bi-x-circle me-1"></i>
            Cancel Booking
          </button>
        </div>
      ))}
    </div>
  );
};

export default Ticket;
