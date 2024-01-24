"use client";

import { AppContext } from "@/contexts/AppContext";
import { LoginForm } from "@/components/login/loginForm";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

  const handleLogin = async (event) => {
    event.preventDefault();

    let username = event.target.username.value;
    let password = event.target.password.value;
    try {
      const res = await fetch(`https://storify-be.fly.dev/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      const { accessToken, refreshToken } = data;
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);

      if (res.ok) {
        setIsLoggedIn(true);
        router.push("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center h-screen">
      <LoginForm onSubmit={handleLogin}></LoginForm>
    </div>
  );
}
