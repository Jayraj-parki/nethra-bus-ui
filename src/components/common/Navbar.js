"use client";

import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import style from "./navbar.module.scss";
import { useEffect, useMemo, useState } from "react";
import { urls } from "@/utils/constants";
import { usePathname, useRouter } from "next/navigation";
import { getPathByLevel } from "@/utils/navigation_path";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState(urls.landing_page);
  const [collapse, setCollapse] = useState(true);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { isAuthed, isGuest, signOut, user } = useAuth();

  // Ensure client-only UI runs after hydration to avoid SSR mismatch
  useEffect(() => setMounted(true), []);

  // Active link based on level-1 path
  useEffect(() => {
    setActiveLink(getPathByLevel(pathname, 1));
  }, [pathname]);

  const displayName = useMemo(() => {
    if (!mounted) return "";
    if (isAuthed) return user?.name || user?.email || "User";
    if (isGuest) return "Guest";
    return "";
  }, [mounted, isAuthed, isGuest, user]);

  const closeCollapse = () => setCollapse(true);

  const handleLogout = () => {
    signOut();
    router.replace(urls.signin);
  };

  return (
    <nav className={`${style.navbar} navbar navbar-expand-lg navbar-custom border-bottom`}>
      <div className="container-fluid col-md-10">
        {/* Brand */}
        <Link
          className={`${style.navbar_brand} navbar-brand`}
          href={urls.landing_page}
          onClick={() => {
            setActiveLink(urls.landing_page);
            closeCollapse();
          }}
        >
          <i className="bi bi-bus-front" /> BusBook
        </Link>

        {/* Toggler */}
        <button
          onClick={() => setCollapse((v) => !v)}
          className={`navbar-toggler shadow-none border-0 outline-none ${collapse ? "collapsed" : ""}`}
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={!collapse}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Collapsible content */}
        <div
          className={`col-auto flex-wrap collapse navbar-collapse ${!collapse ? "show" : ""} ms-lg-2`}
          id="navbarSupportedContent"
        >
          {/* Left links */}
          <div className={`${style.navbar_links} row mx-auto d-flex align-items-center gap-2 gap-lg-3`}>
            <Link
              href={urls.landing_page}
              onClick={() => {
                setActiveLink(urls.landing_page);
                closeCollapse();
              }}
              className={`${style.link} ${activeLink === urls.landing_page ? style.active_links : ""} nav-link col-10 col-lg-auto mx-auto mx-lg-0 my-0 border p-2 rounded-3`}
            >
              <i className="bi bi-house-door" /> Dashboard
            </Link>

            <Link
              href={urls.booking_history}
              onClick={() => {
                setActiveLink(urls.booking_history);
                closeCollapse();
              }}
              className={`${style.link} ${activeLink === urls.booking_history ? style.active_links : ""} col-10 border p-2 rounded-3 col-lg-auto nav-link mx-auto mx-lg-0 my-0`}
            >
              <i className="bi bi-clock-history" /> Booking History
            </Link>
          </div>

          {/* Right actions */}
          <div className={`${style.navbar_user_actions} row mx-auto d-flex align-items-center gap-2 gap-lg-3 ms-lg-auto`}>
            <div className="col-10 col-lg-auto mx-auto mx-lg-0 d-flex align-items-center">
              {/* SSR-stable placeholder to avoid changing element types across hydration */}
              {mounted ? (
                (isAuthed || isGuest) ? (
                  <span className="text-muted">Welcome, {displayName}</span>
                ) : (
                  <span className="text-muted d-inline-block" style={{ minWidth: 120, visibility: "hidden" }}>placeholder</span>
                )
              ) : (
                <span className="text-muted d-inline-block" style={{ minWidth: 120, visibility: "hidden" }}>placeholder</span>
              )}
            </div>

            {mounted ? (
              (isAuthed || isGuest) ? (
                <button
                  onClick={() => {
                    handleLogout();
                    closeCollapse();
                  }}
                  className={`${style.logout_btn} btn border col-10 col-lg-auto mx-auto mx-lg-0`}
                  type="button"
                >
                  <i className="bi bi-box-arrow-right" /> Logout
                </button>
              ) : (
                <>
                  <Link
                    href={urls.signin}
                    onClick={closeCollapse}
                    className="btn btn-outline-secondary col-10 col-lg-auto mx-auto mx-lg-0"
                  >
                    <i className="bi bi-box-arrow-in-right" /> Sign In
                  </Link>
                  <Link
                    href={urls.signup}
                    onClick={closeCollapse}
                    className="btn btn-primary col-10 col-lg-auto mx-auto mx-lg-0"
                  >
                    Create Account
                  </Link>
                </>
              )
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
