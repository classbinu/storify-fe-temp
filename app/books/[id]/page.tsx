"use client";

import { decodeToken, getAccessTokenAndValidate } from "@/lib/utils";
import { useCallback, useContext, useEffect, useState } from "react";

import { AppContext } from "@/contexts/AppContext";
import { CommentListCard } from "@/components/comment/commentListCard";
import Image from "next/image";
import { PostDetailCard } from "@/components/post/postDetailCard";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function PostPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [post, setPost] = useState({
    _id: "",
    title: "Loading...",
    coverUrl: "",
    body: [],
  });

  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);

  const [pendingLike, setPendingLike] = useState(false);
  const [pendingDislike, setPendingDislike] = useState(false);

  const [commnets, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const [commentPostLoading, setCommnetPostLoading] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);

  const { isLoggedIn } = useContext(AppContext);

  useEffect(() => {
    const fetchTokenAndDecode = async () => {
      const accessToken = await getAccessTokenAndValidate();
      if (accessToken) {
        const tokenData = decodeToken(accessToken);
        setDecodedToken(tokenData);
      }
    };

    fetchTokenAndDecode();
  }, []);

  const fetchPost = useCallback(async () => {
    try {
      const response = await fetch(
        `https://storify-be.fly.dev/api/books/${params.id}`
      );
      const post = await response.json();
      const bodyArray = Object.values(post.body);
      setPost({ ...post, body: bodyArray });
      console.log(post.body);
    } catch (error) {
      console.error(error);
    }
  }, [params.id]); // 여기에 의존성을 추가합니다.

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <>
      <h1 className="text-4xl font-bold text-center my-10">{post.title}</h1>
      <div className="flex justify-center">
        <Image
          src={post.coverUrl}
          alt={post.title}
          width={480}
          height={480}
          className="rounded-2xl"
        />
      </div>
      <div className="divider"></div>
      <div>
        {post.body.map((item, index) => (
          <div key={index} className="flex flex-col lg:flex-row">
            <Image
              src={item.imageUrl}
              alt={`Image ${index}`}
              width={480}
              height={480}
              className="rounded-2xl m-10"
            />
            <div>
              <p className="m-10 p-10 text-xl leading-10">{item.text}</p>
            </div>
            {/* 기타 필요한 데이터 렌더링 */}
          </div>
        ))}
      </div>
    </>
  );
}
