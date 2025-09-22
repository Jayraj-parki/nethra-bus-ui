import Image from "next/image";
import style from "./BusResultCard.module.scss";


export default function BusResultCard({ bus }) {
  return (
    <>
      <div className={`row ${style.bus_card}   mb-3 p-3 d-flex justify-content-center align-items-center shadow-none border rounded-4 g-0`}>
        <div className="col-12 col-lg d-flex  m-0 p-0">
          <Image src={bus.image} alt="" width={100} height={100} className={`${style["bus-img"]} img-fluid rounded-3`} />
        </div>
        <div className="col-12 col-lg mt-2 mt-lg-0 ">
          <div className={`${style.bus_content} ps-3 `}>
            <div className={`${style["bus-title"]} d-flex align-items-between justify-content-between gap-2`}>
              <h4 className="d-inline d-sm-block">{bus.name}</h4>
              <span className={`${style.chip} fs-6 d-lg-none d-block`}>
                <i className="bi bi-star-fill me-1"></i> {bus.rating}
              </span>
            </div>
            <div className={`${style.bus_meta} my-1 text-body-tertiary f-1`}><small>{bus.code} ・ {bus.type}</small></div>
            <div className={`${style.bus_meta} my-1 text-body-tertiary`}>
              <small><i className="bi bi-person-badge me-1 "></i> Driver: {bus.driver}</small>
            </div>
            <div className={`${style.bus_meta} my-1 text-secondary-emphasis`}>
              <small><i className="bi bi-geo-alt me-1"></i> {bus.route}</small>
            </div>
            <div className={style.tags}>
              {bus.features.map(tag => (
                <span key={tag} className="badge">{tag}</span>
              ))}
            </div>

          </div>
        </div>
        <div className="col-12 col-lg d-xl-block d-none">
          <div className={style["bus-content"]}>
            <div className={style["bus-title"]}>
              <span className={`${style.chip} fs-6`}>
                <i className="bi bi-star-fill me-1"></i> {bus.rating}
              </span>
            </div></div>
        </div>
        <div className="col-12 col-lg text-center">
          <div className={style["bus-times"]}>
            {/* Departure */}
            <div>
              <h4 className="mb-0">{bus.departure.time}</h4>
              <div className="text-muted small text-body-tertiary">{bus.departure.city}</div>
            </div>

            {/* Divider with duration */}
            <div className="d-flex align-items-center my-2">
              <div className="flex-grow-1 border-top"></div>
              <div className="px-2 small text-muted text-body-tertiary">
                <i className="bi bi-clock"></i> {bus.duration}
              </div>
              <div className="flex-grow-1 border-top"></div>
            </div>

            {/* Arrival */}
            <div>
              <h4 className="mb-0">{bus.arrival.time}</h4>
              <div className="text-muted small text-body-tertiary">{bus.arrival.city}</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg d-flex align-items-center justify-content-center align-items-lg-center justify-content-lg-center mt-3 mt-lg-0">
          <div className={`${style.actions} bg-inherit p-0 m-0  text-center justify-content-center align-items-center`}>
            <div className="d-inline  text-center ">
              {bus.striked && (
                <span className={`text-body-tertiary`}>₹<del>{bus.striked}</del></span>
              )}
              {bus.discount && (
                <span className={style.discount}>%{bus.discount} OFF</span>
              )}
            </div>
            <div className={`${style.price}  m-auto p-auto text-center `}>₹{bus.price} </div>
            <span className={` ${style.perPerson} text-body-tertiary  my-auto `}>₹{bus.perPerson} per person</span>
            
            <div className={`${style.seats}  mt-3  d-inline text-center`}>
              <div className="text-success">{bus.seats} seats available</div>
              <div className="small">out of {bus.totalSeats} total seats</div>
            </div>

          </div>
        </div>
        <div className="col-12 d-flex  m-0 ms-auto p-0">
          <div className="rows col-12 mx-auto d-flex  m-0  p-0  flex-wrap justify-content-between align-items-center">
            <div className="col-12 d-flex flex-wrap gap-2 my-2 ">
              {bus.features.map(tag => (
                <small key={tag} className={`${style.bus_feature_pill} p-1 px-2 border rounded-4 `}>
                  {tag}
                </small>
              ))}
            </div>
            <span className={`${style.chip} fs-6 d-md-none d-lg-block d-xl-none `}>
                <i className="bi bi-star-fill me-1"></i> {bus.rating}
              </span>

            <button className={`col-12 col-lg-3 ms-auto btn ${style["select-btn"]} d-block outline-0 shadow-0 text-center`}>Select Seats</button>
          </div>

        </div>
      </div>

    </>
  );
}
