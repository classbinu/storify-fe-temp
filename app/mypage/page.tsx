"use client";

import { decodeToken, getAccessTokenAndValidate } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "@/contexts/AppContext";
import { MypageForm } from "@/components/mypage/mypageForm";
import { useRouter } from "next/navigation";

export default function MypagePage() {
  const router = useRouter();

  const { isLoading } = useContext(AppContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const [user, setUser] = useState(null);

  const handleMypage = async (event) => {
    event.preventDefault();
    try {
      await fetch(`https://storify-be.fly.dev/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = async () => {
    try {
      const accessToken = await getAccessTokenAndValidate();
      const decodedToken = decodeToken(accessToken);

      const response = await fetch(
        `https://storify-be.fly.dev/api/users/${decodedToken.sub}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const user = await response.json();
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUser();
    } else if (isLoggedIn === false) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <MypageForm
        onSubmit={handleMypage}
        user={user}
        setUser={setUser}
      ></MypageForm>
    </div>
  );
}
