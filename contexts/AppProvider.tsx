"use client";

import React, { useEffect, useState } from "react";

import { AppContext } from "./AppContext";

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [offset, setOffset] = useState(0);
  const [posts, setPosts] = useState([]);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const [myOffset, setMyOffset] = useState(0);
  const [myPosts, setMyPosts] = useState([]);
  const [myAllDataLoaded, setMyAllDataLoaded] = useState(false);

  const [profile, setProfile] = useState(null);
  const [profileOffset, setProfileOffset] = useState(0);
  const [profilePosts, setProfilePosts] = useState([]);
  const [profileAllDataLoaded, setProfileAllDataLoaded] = useState(false);

  useEffect(() => {
    setIsLoading(false);

    const checkAuth = async () => {
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkAuth();

    setIsLoading(false);
  }, []);

  const clearAllData = () => {
    setOffset(0);
    setPosts([]);
    setAllDataLoaded(false);

    setMyOffset(0);
    setMyPosts([]);
    setMyAllDataLoaded(false);

    setProfile(null);
    setProfileOffset(0);
    setProfilePosts([]);
    setProfileAllDataLoaded(false);
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,

        isLoggedIn,
        setIsLoggedIn,
        offset,
        setOffset,
        posts,
        setPosts,
        allDataLoaded,
        setAllDataLoaded,

        myOffset,
        setMyOffset,
        myPosts,
        setMyPosts,
        myAllDataLoaded,
        setMyAllDataLoaded,

        profile,
        setProfile,
        profileOffset,
        setProfileOffset,
        profilePosts,
        setProfilePosts,
        profileAllDataLoaded,
        setProfileAllDataLoaded,

        clearAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
