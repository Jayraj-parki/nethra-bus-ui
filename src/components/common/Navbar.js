"use client";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import style from "./navbar.module.scss"; // import your SCSS
import { useState } from "react";
export default function Navbar() {
  const [activeLink, setActiveLink] = useState("/")
   const [collapse, setCollapse] = useState(true)
  return (
    <nav className={`${style.navbar} navbar navbar-expand-lg navbar-custom border-bottom`}>
      <div className="container-fluid  col-md-10">
        {/* Brand */}
        <Link className={`${style.navbar_brand} navbar-brand`} href="#">
          <i className="bi bi-bus-front"></i> BusBook
        </Link>
        <button onClick={() => setCollapse(prev => (!prev))} className={`navbar-toggler shadow-none border-0  outline-none ${collapse && "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={`${collapse} && "false"`} aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className={`col-auto flex-wrap collapse navbar-collapse ${!collapse && "show"} ms-lg-2`} id="navbarSupportedContent">
          {/* Links */}
          <div className={`${style.navbar_links} row  mx-auto d-flex align-items-center gap-2 gap-lg-3`} >
            <Link href="#" onClick={() => setActiveLink("/")} className={`${style.link} ${activeLink == "/" && style.active_links} nav-link col-10 col-lg-auto mx-auto mx-lg-0 my-0`}>
              <i className="bi bi-house-door"></i> Dashboard
            </Link>
            <Link href="#" onClick={() => setActiveLink("booking_history")} className={`${style.link} ${activeLink == "booking_history" && style.active_links }  col-10 border p-2 rounded-3 col-lg-auto nav-link mx-auto mx-lg-0 my-0`}>
              <i className="bi bi-clock-history"></i> Booking History
            </Link>
          </div>

          {/* Right side */}
          <div className={`${style.navbar_user_actions} row mx-auto  d-flex align-items-center gap-1 gap-lg-3  ms-lg-auto`}>
            <span className={`${style.navbar_user_actions} text-muted mt-2  py-2 py-lg-0 text-center col-10 col-lg-auto mx-auto mx-lg-0`}>Welcome, John Doe</span>
            <button className={`${style.logout_btn} btn  border logout-btn col-10 col-lg-auto mx-auto mx-lg-0`} >
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
