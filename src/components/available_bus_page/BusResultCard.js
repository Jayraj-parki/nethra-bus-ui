import Image from "next/image";
import style from "./BusResultCard.module.scss";
import Link from "next/link";
import { urls } from "@/utils/constants";

const extractHMTime = (time_format) => {
  const orginal_time = new Date(time_format);
  const extracted_time = orginal_time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
  return extracted_time
}

const getTravelDuration=(departure_time_format,arrival_time_format)=>{
  const orginal_departure_time = new Date(departure_time_format);
  const orginal_arrival_time = new Date(arrival_time_format);
  let diffMs = orginal_arrival_time - orginal_departure_time;
if (diffMs < 0) {
    diffMs += 24 * 60 * 60 * 1000; // add 24 hours in ms
  }
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${diffHours}h ${diffMinutes}m`;

}


export default function BusResultCard({ bus }) {
  const departure_time = extractHMTime(bus?.departure_time)
  const arrival_time = extractHMTime(bus?.arrival_time)
  const bus_duration = getTravelDuration(bus?.departure_time,bus?.arrival_time)
  
  const price = bus?.price
  const discounted_price = bus?.discounted_price
  const discount = bus?.discount
  const bus_number = bus?.bus_number
  const total_seats = bus?.total_seats
  const available_seats = bus?.available_seats
  const amenities = bus?.amenities?.split(",").map(item => item.trim());
  const bus_type = bus?.type
  const driver_name = bus?.driver_name
  const rating = bus?.rating
  const bus_id = bus?.bus
  const route = bus?.route?.join(" → ")
  const bus_name = 'Express Travel'
  const departure_city = 'Mumbai'
  const arrival_city = 'Banglore'

  return (
    <>
      <div className={`row ${style.bus_card}   mb-3 p-3 d-flex justify-content-center align-items-center shadow-none border rounded-4 g-0`}>
        <div className="col-12 col-lg d-flex  m-0 p-0">
          <Image src={bus?.image} alt="" width={100} height={100} className={`${style["bus-img"]} img-fluid rounded-3`} />
        </div>
        <div className="col-12 col-lg mt-2 mt-lg-0 ">
          <div className={`${style.bus_content} ps-3 `}>
            <div className={`${style["bus-title"]} d-flex align-items-between justify-content-between gap-2`}>
              <h4 className="d-inline d-sm-block">{bus_name}</h4>
              <span className={`${style.chip} fs-6 d-lg-none d-block`}>
                <i className="bi bi-star-fill me-1"></i> {rating}
              </span>
            </div>
            <div className={`${style.bus_meta} my-1 text-body-tertiary f-1`}><small>{bus_number} ・ {bus_type}</small></div>
            <div className={`${style.bus_meta} my-1 text-body-tertiary`}>
              <small><i className="bi bi-person-badge me-1 "></i> Driver: {driver_name}</small>
            </div>
            <div className={`${style.bus_meta} my-1 text-secondary-emphasis`}>
              <small><i className="bi bi-geo-alt me-1"></i> {route}</small>
            </div>
            <div className={style.tags}>
              {amenities?.map(tag => (
                <span key={tag} className="badge">{tag}</span>
              ))}
            </div>

          </div>
        </div>
        <div className="col-12 col-lg d-xl-block d-none">
          <div className={style["bus-content"]}>
            <div className={style["bus-title"]}>
              <span className={`${style.chip} fs-6`}>
                <i className="bi bi-star-fill me-1"></i> {rating}
              </span>
            </div></div>
        </div>
        <div className="col-12 col-lg text-center">
          <div className={style["bus-times"]}>
            {/* Departure */}
            <div>
              <h4 className="mb-0">{departure_time}</h4>
              <div className="text-muted small text-body-tertiary">{departure_city}</div>
            </div>

            {/* Divider with duration */}
            <div className="d-flex align-items-center my-2">
              <div className="flex-grow-1 border-top"></div>
              <div className="px-2 small text-muted text-body-tertiary">
                <i className="bi bi-clock"></i> {bus_duration}
              </div>
              <div className="flex-grow-1 border-top"></div>
            </div>

            {/* Arrival */}
            <div>
              <h4 className="mb-0">{arrival_time}</h4>
              <div className="text-muted small text-body-tertiary">{arrival_city}</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg d-flex align-items-center justify-content-center align-items-lg-center justify-content-lg-center mt-3 mt-lg-0">
          <div className={`${style.actions} bg-inherit p-0 m-0  text-center justify-content-center align-items-center`}>
            <div className="d-inline  text-center ">
              {price && (
                <span className={`text-body-tertiary`}>₹<del>{price}</del></span>
              )}
              {discount && (
                <span className={style.discount}>%{discount} OFF</span>
              )}
            </div>
            <div className={`${style.price}  m-auto p-auto text-center `}>₹{discounted_price} </div>
            <span className={` ${style.perPerson} text-body-tertiary  my-auto `}>₹{discounted_price} per person</span>

            <div className={`${style.seats}  mt-3  d-inline text-center`}>
              <div className="text-success">{available_seats} seats available</div>
              <div className="small">out of {total_seats} total seats</div>
            </div>

          </div>
        </div>
        <div className="col-12 d-flex  m-0 ms-auto p-0">
          <div className="rows col-12 mx-auto d-flex  m-0  p-0  flex-wrap justify-content-between align-items-center">
            <div className="col-12 d-flex flex-wrap gap-2 my-2 ">
              {amenities?.map(tag => (
                <small key={tag} className={`${style.bus_feature_pill} p-1 px-2 border rounded-4 `}>
                  {tag}
                </small>
              ))}
            </div>
            <span className={`${style.chip} fs-6 d-none d-lg-block d-xl-none `}>
              <i className="bi bi-star-fill me-1"></i> {rating}
            </span>

            <Link href={`${urls.select_seats}`} className={`col-12 col-lg-3 ms-auto btn ${style["select-btn"]} d-block outline-0 shadow-0 text-center`}>Select Seats</Link>
          </div>

        </div>
      </div>

    </>
  );
}
