"use client";

import { useCallback, useContext, useEffect, useState } from "react";

import { AppContext } from "@/contexts/AppContext";
import { PostListCard } from "@/components/post/postListCard";
import { ProfileCard } from "@/components/profile/profileCard";
import { useRouter } from "next/navigation";

export default function ProfilePage({ params }: { params: { uuid: string } }) {
  const router = useRouter();

  const [user, setUser] = useState({
    uuid: "",
    nickname: "",
    intro: "",
    avatar: "",
  });
  const { isLoading } = useContext(AppContext);
  const [isFetchingPost, setIsFetchingPost] = useState(false);
  const limit = 20;

  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

  const { profile, setProfile } = useContext(AppContext);
  const { profileOffset, setProfileOffset } = useContext(AppContext);
  const { profilePosts, setProfilePosts } = useContext(AppContext);
  const { profileAllDataLoaded, setProfileAllDataLoaded } =
    useContext(AppContext);

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch(
        `https://storify-be.fly.dev/api/users/${params.uuid}`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const user = await response.json();
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  }, [params.uuid]);

  const fetchPosts = useCallback(async () => {
    if (profilePosts.length > 0 && profilePosts.length > profileOffset) {
      return; // 이미 충분한 게시글이 로드되었으므로 fetch하지 않습니다.
    }

    if (isLoading) {
      console.log("already loading");
      return;
    }
    setIsFetchingPost(true);
    try {
      const response = await fetch(
        `https://storify-be.fly.dev/api/posts?author=${params.uuid}&offset=${profileOffset}&limit=${limit}`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const newPosts = await response.json();

      if (newPosts.length < limit) {
        setProfileAllDataLoaded(true);
      }
      // 특정 조건에서는 중복 렌더링 문제가 발생해서 중복 제거 로직을 추가함. offset 관리 방식 변경하면서 해결될 수도 있음.
      setProfilePosts((prevPosts) => {
        const existingPostIds = new Set(prevPosts.map((post) => post.id));
        const uniqueNewPosts = newPosts.filter(
          (post) => !existingPostIds.has(post.id)
        );
        return [...prevPosts, ...uniqueNewPosts];
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingPost(false);
    }
  }, [
    isLoading,
    params.uuid,
    profileOffset,
    profilePosts.length,
    setProfileAllDataLoaded,
    setProfilePosts,
  ]);

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (
          window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 400 &&
          !profileAllDataLoaded
        ) {
          setProfileOffset((prevOffset) => prevOffset + limit);
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [profileAllDataLoaded, setProfileOffset]);

  useEffect(() => {
    if (profile !== params.uuid) {
      setProfile(params.uuid);
      setProfileOffset(0);
      setProfilePosts([]);
      return;
    }
    fetchUser();
    fetchPosts();
  }, [
    fetchPosts,
    fetchUser,
    params.uuid,
    profile,
    setProfile,
    setProfileOffset,
    setProfilePosts,
  ]);
  return (
    <div>
      <ProfileCard user={user} />
      {profilePosts.map((post) => (
        <PostListCard key={post.id} post={post} />
      ))}
    </div>
  );
}
