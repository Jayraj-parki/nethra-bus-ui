"use client";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import style from "./navbar.module.scss"; // import your SCSS
import { useState } from "react";
export default function Navbar() {
  const [activeLink, setActiveLink] = useState("/")
  return (
    <nav className={`${style.navbar} navbar navbar-expand-lg navbar-custom border-bottom`}>
      <div className="container-fluid  col-10">
        {/* Brand */}
        <Link className={`${style.navbar_brand} navbar-brand`} href="#">
          <i className="bi bi-bus-front"></i> BusBook
        </Link>

        {/* Links */}
        <div className={`${style.navbar_links} d-flex align-items-center gap-3`} >
          <Link href="#" onClick={() => setActiveLink("/")} className={`${style.link } ${activeLink == "/" && style.active_links} nav-link`}>
            <i className="bi bi-house-door"></i> Dashboard
          </Link>
          <Link href="#" onClick={() => setActiveLink("booking_history")} className={`${style.link} ${activeLink == "booking_history" && style.active_links + ' '} nav-link`}>
            <i className="bi bi-clock-history"></i> Booking History
          </Link>
        </div>

        {/* Right side */}
        <div className={`${style.navbar_user_actions} d-flex align-items-center gap-3 ms-auto`}>
          <span className={`${style.navbar_user_actions} text-muted`}>Welcome, John Doe</span>
          <button className={`${style.logout_btn} btn  border logout-btn`}>
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
