"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { AppContext } from "@/contexts/AppContext";
import { PostListCard } from "@/components/post/postListCard";

export default function PostListPage() {
  const [isLoading, setIsLoading] = useState(false);
  const limit = 20;
  const { offset, setOffset } = useContext(AppContext);
  const { posts, setPosts } = useContext(AppContext);
  const { allDataLoaded, setAllDataLoaded } = useContext(AppContext);

  const fetchPosts = useCallback(async () => {
    if (posts.length > 0 && posts.length > offset) {
      return; // 이미 충분한 게시글이 로드되었으므로 fetch하지 않습니다.
    }

    if (isLoading || allDataLoaded) {
      console.log("already loading");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://storify-be.fly.dev/api/posts?offset=${offset}&limit=${limit}`
      );
      const reaPosts = await response.json();
      const newPosts = reaPosts.books;

      if (newPosts.length < limit || newPosts.length === 0) {
        setAllDataLoaded(true);
      }
      // 특정 조건에서는 중복 렌더링 문제가 발생해서 중복 제거 로직을 추가함. offset 관리 방식 변경하면서 해결될 수도 있음.
      setPosts((prevPosts) => {
        const existingPostIds = new Set(prevPosts.map((post) => post.id));
        const uniqueNewPosts = newPosts.filter(
          (post) => !existingPostIds.has(post.id)
        );
        return [...prevPosts, ...uniqueNewPosts];
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [posts.length, offset, isLoading, setPosts, setAllDataLoaded]);

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (
          window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 400 &&
          !allDataLoaded
        ) {
          setOffset((prevOffset) => prevOffset + limit);
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allDataLoaded, setOffset]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, offset, setPosts]);

  return (
    <>
      {posts.map((post) => (
        <PostListCard key={post.id} post={post} />
      ))}
    </>
  );
}
