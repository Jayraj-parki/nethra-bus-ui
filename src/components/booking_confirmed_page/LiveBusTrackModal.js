import React, { useRef, useEffect } from "react";
import style from "./LiveBusTrackModal.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Image from "next/image";

export default function LiveBusTrackModal({ open, onClose, track }) {
  const modalRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    }
    if (open) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [open, onClose]);
  if (!open) return null;

  return (
    <div className={style.busTrackOverlay + '  rows mx-auto d-flex justify-content-center align-items-center'}>
      <div className={style.busTrackDialog + ' bg-white rounded-4 shadow-lg col-4 p-3'} ref={modalRef}>
        <button className={style.closeBtn + ' btn btn-light btn-sm border-0  '} onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>
        <h5 className="mb-3  fw-medium">Live Bus Tracking & Route Map</h5>
        <div  className={style.busTrack + ' mt-4 p-2 '} >
          <Image src={track?.image} alt="Bus Route" className={style.routeImg + ' rounded-3'} width={100} height={100} />
          <div className={style.routeText + ' px-3 py-1 rounded-4'}>
            <div className="fw-semibold ">
              {track.route}
            </div>
            <div className="fw-semibold ">
              Total Distance: {track.distance}
            </div>
          </div>
        </div>
        <div className={style.statusGrid + ' rows mx-auto d-flex gap-2 mt-1 p-2 '}>
          <div className={style.statusCard + ' col-6 bg-light rounded-3 p-3'}>
            <div className={style.statusLabel + " text-success mb-2" }>Current Status</div>
            <div className="">{track.current}</div>
            <div className="text-muted">Last updated: {track.updated}</div>
          </div>
          <div className={style.statusCard +' col-6 bg-light rounded-3 p-3'}>
            <div className={style.statusLabel + " text-primary mb-2"}>Next Stop</div>
            <div >{track.next}</div>
            <div className="text-muted">Expected arrival in {track.arrivalIn}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
