"use client";
import Image from "next/image";
import style from "./featuresRow.module.scss";

const FEATURES = [
  {
    icon: "bi bi-bus-front", 
    title: "500+ Buses",
    desc: "Choose from a wide range of buses"
  },
  {
    icon: "bi bi-trophy-fill", 
    title: "Best Prices",
    desc: "Guaranteed best prices with discounts"
  },
  {
    icon: "bi bi-lightning-charge-fill", 
    title: "Instant Booking",
    desc: "Quick and easy booking process"
  }
];

export default function FeaturesRow() {
  return (
    <div className={style.features_row + ' d-flex justify-content-between gap-4 flex-wrap '}>
      {FEATURES.map((f, idx) => (
        <div key={idx} className={style.card + ' border shadow-none  py-4' }>
          <div className={style.icon_wrapper + 'm-3'}>
            <i className={`${style.icon} ${f.icon} p-3 rounded  `}></i>
          </div>
          <div>
            <div className={style.title}>{f.title}</div>
            <div className={style.desc}>{f.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
