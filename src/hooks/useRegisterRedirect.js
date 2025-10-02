
"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { registerUser } from "@/store/authSlice";

export function useRegisterRedirect() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector(selectAuth);

  const register = async (payload) => {
    const res = await dispatch(registerUser(payload));
    if (res.meta.requestStatus === "fulfilled") {
      const qs = new URLSearchParams({
        email: payload.email ?? "",
        registered: "1",
      }).toString();
      router.replace(`/login?${qs}`);
    }
    return res;
  };

  return { register, loading };
}
