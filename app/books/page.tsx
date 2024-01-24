"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { AppContext } from "@/contexts/AppContext";
import { PostListCard } from "@/components/post/postListCard";

export default function PostListPage() {
  const [isLoading, setIsLoading] = useState(false);
  const limit = 20;
  // const { offset, setOffset } = useContext(AppContext);
  const { posts, setPosts } = useContext(AppContext);
  // const { allDataLoaded, setAllDataLoaded } = useContext(AppContext);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://storify-be.fly.dev/api/books?page=1&limit=999`
      );
      const newPosts = await response.json();
      setPosts(newPosts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {posts.map((post) => (
        <PostListCard key={post.id} post={post} />
      ))}
    </div>
  );
}
