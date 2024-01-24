"use client";

import { useContext, useEffect } from "react";

import { AppContext } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn, clearAllData } = useContext(AppContext);

  useEffect(() => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    clearAllData();
    setIsLoggedIn(false);

    router.push("/");
  }, []);
}
