"use client";

import { useContext, useEffect } from "react";

import { AppContext } from "@/contexts/AppContext";
import { SignupForm } from "@/components/signup/signupForm";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

  const handleSignup = async (event) => {
    event.preventDefault();
    let email = event.target.email.value;
    let password = event.target.password.value;
    try {
      const res = await fetch(`https://storify-be.fly.dev/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, isAdmin: true }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Swal.fire({
      title: "안내",
      html: "정글피디아 AI는 테스트 서비스입니다.<br>계정 및 게시글은 예고 없이 삭제될 수 있습니다.",
      icon: "info",
      confirmButtonText: "확인",
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <SignupForm onSubmit={handleSignup}></SignupForm>
    </div>
  );
}
