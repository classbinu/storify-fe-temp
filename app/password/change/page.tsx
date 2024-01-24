"use client";

import { decodeToken, getAccessTokenAndValidate } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "@/contexts/AppContext";
import { ChangeForm } from "@/components/password/changeForm";
import { useRouter } from "next/navigation";

export default function MypagePage() {
  const router = useRouter();

  const { isLoading } = useContext(AppContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const [passwords, setPasswords] = useState(null);

  const handleSignup = async (event) => {
    event.preventDefault();
    let oldPassword = passwords.oldPassword;
    let newPassword = passwords.newPassword;
    let newPassword2 = passwords.newPassword2;
    if (newPassword !== newPassword2) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const accessToken = await getAccessTokenAndValidate();

      await fetch(`https://storify-be.fly.dev/api/auth/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.push("/login");
      return;
    }
  }, [isLoading, isLoggedIn, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <ChangeForm
        onSubmit={handleSignup}
        passwords={passwords}
        setPasswords={setPasswords}
      ></ChangeForm>
    </div>
  );
}
