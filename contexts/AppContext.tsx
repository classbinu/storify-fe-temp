"use client";

import { createContext } from "react";

interface AppContextType {
  isLoading: boolean;
  setIsLoading: Function;

  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  offset: number;
  setOffset: Function;
  posts: Array<any>;
  setPosts: Function;
  allDataLoaded: boolean;
  setAllDataLoaded: Function;

  myOffset: number;
  setMyOffset: Function;
  myPosts: Array<any>;
  setMyPosts: Function;
  myAllDataLoaded: boolean;
  setMyAllDataLoaded: Function;

  profile: string | null;
  setProfile: Function;
  profileOffset: number;
  setProfileOffset: Function;
  profilePosts: Array<any>;
  setProfilePosts: Function;
  profileAllDataLoaded: boolean;
  setProfileAllDataLoaded: Function;

  clearAllData: Function;
}

export const AppContext = createContext<AppContextType>({
  isLoading: false,
  setIsLoading: () => {},

  isLoggedIn: false,
  setIsLoggedIn: () => {},
  offset: 0,
  setOffset: () => {},
  posts: [],
  setPosts: () => {},
  allDataLoaded: false,
  setAllDataLoaded: () => {},

  myOffset: 0,
  setMyOffset: () => {},
  myPosts: [],
  setMyPosts: () => {},
  myAllDataLoaded: false,
  setMyAllDataLoaded: () => {},

  profile: null,
  setProfile: () => {},
  profileOffset: 0,
  setProfileOffset: () => {},
  profilePosts: [],
  setProfilePosts: () => {},
  profileAllDataLoaded: false,
  setProfileAllDataLoaded: () => {},

  clearAllData: () => {},
});
