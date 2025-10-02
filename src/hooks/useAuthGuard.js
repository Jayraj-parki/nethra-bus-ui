"use client"; 

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation"; // App Router

const selectStatus = (s) => s.auth.status; // 'anonymous' | 'guest' | 'authenticated'

/**
 * Redirects away if user is not allowed.
 * @param {Object} options
 * @param {boolean} options.allowGuest - whether guest users can access
 * @param {string} options.fallback - route to redirect if not allowed
 */
export function useAuthGuard({ allowGuest = false, fallback = "/login" } = {}) {
  const status = useSelector(selectStatus);
  const router = useRouter();
  const pathname = usePathname?.() || ""; // safe if using pages router

  useEffect(() => {
    // do nothing on server
    if (typeof window === "undefined") return;

    const isAuthed = status === "authenticated";
    const isGuest = status === "guest";

    // allow if authed, or guest allowed
    if (isAuthed || (allowGuest && isGuest)) return;

    // otherwise redirect to fallback with optional next param
    const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
    router.replace(`${fallback}${next}`);
  }, [status, allowGuest, fallback, router, pathname]);
}

// import { useAuthGuard } from "@/src/hooks/useAuthGuard";

// export default function Checkout() {
//   useAuthGuard({ allowGuest: true, fallback: "/login" }); // guests can access
//   return <div>Checkout</div>;
// }
