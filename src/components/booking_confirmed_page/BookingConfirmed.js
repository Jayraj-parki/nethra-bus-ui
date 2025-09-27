"use client"
import Link from 'next/link';
import style from './BookingConfirmed.module.scss';
import { urls } from '@/utils/constants';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import LiveBusTrackModal from './LiveBusTrackModal';

function EBadge() {
  return (
    <span className="badge bg-light text-dark fw-normal px-2 py-2 rounded-pill">
      <i className="bi bi-ticket-perforated me-1"></i> E-Ticket
    </span>
  );
}
function StatusBadge() {
  return (
    <span className="badge bg-success text-white small  px-3 py-2 rounded-pill ms-2">
      CONFIRMED
    </span>
  );
}

function QrButton({ onClick }) {
  return (
    <button className="btn btn-outline-secondary btn-sm" onClick={onClick}>
      <i className="bi bi-qr-code me-1"></i> View QR Code
    </button>
  );
}
function QrDialog({ open, onClose, booking }) {
  const dialogRef = useRef();

  useEffect(() => {
    function handleOverlay(e) {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleOverlay);
      return () => document.removeEventListener("mousedown", handleOverlay);
    }
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className={style.qrOverlay + ' rows mx-auto d-flex justify-content-center align-items-center '}>
      <div className={style.qrDialog + ' bg-white rounded-4 shadow-lg col-12 p-3'} ref={dialogRef}>
        <div className="d-flex justify-content-end">
          <button className="btn btn-light btn-sm" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="text-center py-1">
          <div className="fs-4 fw-semibod mb-2">Ticket QR Code</div>
          <div className={style.qrBox + '  d-flex justify-content-center align-items-center rounded-3 my-3'}>
            <Image className='rounded-3 p-0 m-0 border ' src="/assets/images/QR.png" alt="qr" width={150} height={150} />
          </div>
          <div className="mt-2 mb-4 text-muted small" >
            Show this QR code to the bus conductor for verification
          </div>
          <div className="bg-light rounded p-3 mb-1 small">
            <div><b className='fw-semibold '>Booking:</b> {booking.id}</div>
            <div><b className='fw-semibold '>Route:</b> {booking.route}</div>
            <div><b className='fw-semibold '>Date:</b> {booking.date}</div>
            <div><b className='fw-semibold '>Seats:</b> {booking.seats}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmed() {
  const [qrOpen, setQrOpen] = useState(false);
  const demoStatus = {
    image: "/assets/images/bus.png", 
    route: "Mumbai → Pune → Delhi Route",
    distance: "1,155 km",
    current: "Departed from Mumbai - En Route to Pune",
    updated: "4:55:37 pm",
    next: "Pune (ETA: 11:45 PM)",
    arrivalIn: "1h 15m"
  };
  const [showTrack, setShowTrack] = useState(false);

  const booking = {
    id: "1758967241645",
    route: "Pune → Chennai",
    date: "2025-09-30",
    seats: "D4"
  }
  const amenities = ["AC", "WiFi", "Charging Point", "Water Bottle"];
  const downloadTicket = () => {
    window.alert("Ticket downloaded successfully..!")
  }
  return (
    <div className={`${style.page} container pb-3`}>
      <div className="text-center mb-2 ">
        <i className="bi bi-check-circle-fill text-success fs-1"></i>
        <div className={`${style.heading} mt-2 mb-1 fw-bold fs-2 text-success`} >
          Booking Confirmed!
        </div>
        <div className="text-muted mb-4" >
          Your bus ticket has been successfully booked. Get ready for a comfortable journey!
        </div>
      </div>
      <div className="row justify-content-center mb-4">
        <div className="col-lg-8">
          <div className={`p-0 ${style.card} p-3`}>
            <div className="d-flex justify-content-between align-items-center border-bottom px-4 py-2" >
              <EBadge />
              <StatusBadge />
            </div>
            <div className="row g-0 px-4 py-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <div className="mb-2 small text-body-tertiary text-muted">Booking ID</div>
                <div className="fw-medium mb-4" style={{ fontSize: "1.07em" }}>1758967241645</div>
                <div className="d-flex align-items-start mb-2">
                  <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                  <div>
                    <div className="small text-body-tertiary text-muted">Route</div>
                    <div className="fw-medium ">Pune &rarr; Chennai</div>
                  </div>
                </div>
                <div className="d-flex align-items-start mb-2">
                  <i className="bi bi-calendar-event text-primary me-2"></i>
                  <div>
                    <div className="small text-body-tertiary text-muted">Travel Date</div>
                    <div className=" fw-medium">Tuesday 30 September, 2025</div>
                  </div>
                </div>
                <div className="d-flex align-items-start mb-2">
                  <i className="bi bi-clock text-primary me-2"></i>
                  <div>
                    <div className="small text-body-tertiary text-muted">Departure Time</div>
                    <div className=" fw-medium">10:30 PM</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex justify-content-end">

                  <QrButton onClick={() => setQrOpen(true)} />
                  <QrDialog open={qrOpen} onClose={() => setQrOpen(false)} booking={booking} />
                </div>
                <div className="my-2 small text-body-tertiary text-muted">Seat Numbers</div>
                <div className="mb-3 fw-medium ">D4</div>
                <div className="d-flex align-items-start mb-2">
                  <i className="bi bi-bus-front-fill text-primary me-2"></i>
                  <div>
                    <div className="small text-body-tertiary text-muted">Bus Operator</div>
                    <div className=" fw-medium">Express Travels</div>
                  </div>
                </div>
                <div className="d-flex align-items-start mb-2">
                  <i className="bi bi-cash-stack text-primary me-2"></i>
                  <div>
                    <div className="small text-body-tertiary text-muted">Total Amount</div>
                    <div className=" fw-medium">₹1,020</div>
                  </div>
                </div>
              </div>
            </div>
            {/* driver & contact */}
            <div className="border-top border-bottom px-4 py-3">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="small  mb-2 small">Driver & Contact Information</div>
                  <div className="d-flex align-items-center">
                    <span className="bg-light rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
                      <i className="bi bi-person-fill text-primary" style={{ fontSize: "1.3em" }}></i>
                    </span>
                    <div>
                      <div className="small small text-body-tertiary text-muted">Driver</div>
                      <div className="fw-medium">Rajesh Kumar</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center">
                  <div className="small small text-body-tertiary text-muted mb-1">Driver Contact</div>
                  <span className="fw-medium">
                    <i className="bi bi-telephone me-1"></i>
                    +91 98765 43210
                  </span>
                </div>
              </div>
            </div>
            {/* Bus location */}
            <div className="border-bottom px-4 py-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="small  small">Bus Location & Route</span>
                <button className="btn btn-outline-light btn-sm border text-dark px-3" onClick={() => setShowTrack(true)}>
                  <i className="bi bi-map me-1 "></i> View Route & Live Location
                </button>
                <LiveBusTrackModal open={showTrack} onClose={() => setShowTrack(false)} track={demoStatus} />
              </div>
              <div className="rows mx-auto bg-light rounded px-3 py-1 d-flex align-items-start  flex-wrap">
                <span className="col-auto text-success d-flex justify-content-center align-items-center text-center p-0"><i className={`${style.icon} bi bi-dot fs-1 p-0 m-0  fw-bold`}></i>Live</span>

                <span className="ms-3 mb-3 mt-0 p-0  col-12 small ">
                  <span className='text-body-tertiary text-muted'>
                    Departed from Mumbai – En Route to Pune
                  </span><br />
                  <span>
                    Pune (ETA 11:45 PM)
                  </span>

                </span>
              </div>
            </div>
            {/* Amenities */}
            <div className="px-4 py-3">
              <div className="small  small mb-1">Bus Amenities</div>
              <div className="d-flex flex-wrap small gap-2">
                {amenities.map(item => (
                  <span className={`bg-light  fw-semibold p-1  small border rounded-pill px-2`} key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
          {/* Call-to-actions */}
          <div className="text-center mt-3">
            <button onClick={() => downloadTicket()} className="btn btn-outline-secondary me-2">
              <i className="bi bi-download me-1"></i> Download Ticket
            </button>
            <Link href={urls?.landing_page} className="btn btn-primary px-4" style={{ background: "#6e2faf", border: "none" }}>
              Continue to Dashboard
            </Link>
          </div>
        </div>
      </div>
      {/* Info notice */}
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="bg-light rounded p-3 px-md-4" style={{ fontSize: "0.99rem", color: '#640556', marginTop: "0.8em" }}>
            <div className="fw-bold mb-1" style={{ fontSize: "1rem" }}>Important Instructions</div>
            <ul className="mb-0" style={{ paddingLeft: 20 }}>
              <li>Please arrive at the boarding point 15 minutes before departure</li>
              <li>Carry a valid ID proof along with this ticket</li>
              <li>Show the QR code to the conductor for verification</li>
              <li>Contact driver for any emergency: +91 98765 43210</li>
              <li>Cancellation allowed up to 2 hours before departure</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
