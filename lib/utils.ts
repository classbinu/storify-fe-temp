"use client";

import { JwtPayload as OriginalJwtPayload } from "jwt-decode";
import { jwtDecode } from "jwt-decode";

interface JwtPayload extends OriginalJwtPayload {
  email?: string;
}

export const decodeToken = (token: string): JwtPayload | null => {
  const decoded = jwtDecode(token);

  return decoded;
};

export const getAccessTokenAndValidate = async (): Promise<string | null> => {
  const accessToken = sessionStorage.getItem("accessToken");

  if (!accessToken) {
    return null;
  }

  const decoded = decodeToken(accessToken);
  const currentTime = Date.now() / 1000;

  if (decoded && decoded.exp && decoded.exp < currentTime) {
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (!refreshToken) {
      return null;
    }

    try {
      const response = await fetch(
        `https://storify-be.fly.dev/api/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${refreshToken}`,
          },
          // body: JSON.stringify({ refreshToken }),
        }
      );

      if (response.ok) {
        const { accessToken, refreshToken } = await response.json();
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        return accessToken;
      } else {
        console.log("Error refreshing token");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return accessToken;
};
