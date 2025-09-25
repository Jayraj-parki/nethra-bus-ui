"use client";
import style from './AvailableBusesHeader.module.scss';


export default function AvailableBusesHeader({ from, to, date, passengers, resultsCount, onBack }) {
  return (
    <div className="row align-items-center  p-1">
      <div className="col-auto">
        <button 
          className={`btn btn-outline-0 shadow-0 border ${style.backBtn}`} 
          onClick={onBack}>
          <i className="bi bi-arrow-left me-2"></i>
          Back to Search
        </button>
      </div>
      <div className="mt-3 m-lg-0 col-auto">
        <h4 className={style.pageHeader}>Available Buses</h4>
        <div className={`${style.routeInfo} mt-2 m-lg-0`}>
          {from} &rarr; {to} <hr className='m-0 p-0 border-0 d-block d-lg-inline'/> &bull; {date} <hr className='m-0 p-0 border-0 d-block d-lg-inline'/> &bull; {passengers} {passengers > 1 ? 'passengers' : 'passenger'}
        </div>
      </div>
        <div className={`col-12 ${style.resultsCount} mt-3 fs-6`}>
          Found {resultsCount} buses for your journey
        </div>
    </div>
  );
}
