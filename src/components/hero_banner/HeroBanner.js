"use client";
import style from "./heroBanner.module.scss";

export default function HeroBanner() {
  return (
    <section className={style.hero_banner+' mb-5 rounded-4'}>
      <div className={style.content}>
        <h1>Find Your Perfect Bus Journey</h1>
        <p>Search and book bus tickets across India with ease and comfort</p>
      </div>
    </section>
  );
}
