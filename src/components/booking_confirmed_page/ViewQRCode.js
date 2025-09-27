import React, { useRef, useEffect } from "react";
import Image from "next/image";
import style from './BookingConfirmed.module.scss';
export default function ViewQrCode({ open, onClose, booking }) {
  const dialogRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) onClose();
    }
    if (open) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [open, onClose]);
  if (!open) return null;

  return (
    <div className={style.qrOverlay + ' rows mx-auto d-flex justify-content-center align-items-center '}>
      <div className={style.qrDialog + ' bg-white rounded-4 shadow-lg col-11 col-sm-12 p-3'} ref={dialogRef}>
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
