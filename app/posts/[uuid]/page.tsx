"use client";

import { decodeToken, getAccessTokenAndValidate } from "@/lib/utils";
import { useCallback, useContext, useEffect, useState } from "react";

import { AppContext } from "@/contexts/AppContext";
import { CommentListCard } from "@/components/comment/commentListCard";
import { PostDetailCard } from "@/components/post/postDetailCard";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function PostPage({ params }: { params: { uuid: string } }) {
  const router = useRouter();

  const [post, setPost] = useState({
    id: "",
    title: "Loading...",
    content: "Loading...",
    author: {
      id: "",
      nickname: "Loading...",
      avatar: "",
      type: 1,
    },
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
        `https://storify-be.fly.dev/api/posts/${params.uuid}`
      );
      const post = await response.json();
      setPost(post);
    } catch (error) {
      console.error(error);
    }
  }, [params.uuid]); // 여기에 의존성을 추가합니다.

  const fetchLikesAndDislikes = useCallback(async () => {
    try {
      const likes = await fetch(
        `https://storify-be.fly.dev/api/posts/${params.uuid}/likes`
      );
      const likesData = await likes.json();
      setLikes(likesData);

      const dislikes = await fetch(
        `https://storify-be.fly.dev/api/posts/${params.uuid}/dislikes`
      );
      const dislikesData = await dislikes.json();
      setDislikes(dislikesData);
    } catch (error) {
      console.error(error);
    }
  }, [params.uuid]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(
        `https://storify-be.fly.dev/api/posts/${params.uuid}/comments`
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  }, [params.uuid]); // 여기에 의존성을 추가합니다.

  const submitComment = async (event) => {
    event.preventDefault();
    let content = comment;

    if (content === "") {
      return alert("댓글을 입력해주세요.");
    }

    setCommnetPostLoading(true);

    const newComment = { content };
    newComment["postId"] = params.uuid;

    try {
      const accessToken = await getAccessTokenAndValidate();
      await fetch(`https://storify-be.fly.dev/api/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newComment),
      });
      setComment("");
      setCommnetPostLoading(false);
      await fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async () => {
    if (pendingLike) {
      Swal.fire({
        icon: "info",
        title: "'좋아요'를 처리하고 있어요.",
        text: "잠시 후 다시 시도해 주세요.",
      });
      return;
    }
    setPendingLike(true);

    if (likes.some((like) => like.user.id === decodedToken.sub)) {
      setLikes(likes.filter((like) => like.user.id !== decodedToken.sub));
    } else {
      setLikes([...likes, { user: { id: decodedToken.sub } }]);
    }

    try {
      const accessToken = await getAccessTokenAndValidate();
      await fetch(`https://storify-be.fly.dev/api/posts/${params.uuid}/likes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      await fetchLikesAndDislikes();
    } catch (error) {
      console.error(error);
    } finally {
      setPendingLike(false);
    }
  };

  const handleDislike = async () => {
    if (pendingDislike) {
      Swal.fire({
        icon: "info",
        title: "'싫어요'를 처리하고 있어요.",
        text: "잠시 후 다시 시도해 주세요.",
      });
      return;
    }
    setPendingDislike(true);

    if (dislikes.some((dislike) => dislike.user.id === decodedToken.sub)) {
      setDislikes(
        dislikes.filter((dislike) => dislike.user.id !== decodedToken.sub)
      );
    } else {
      setDislikes([...dislikes, { user: { id: decodedToken.sub } }]);
    }
    try {
      const accessToken = await getAccessTokenAndValidate();
      await fetch(
        `https://storify-be.fly.dev/api/posts/${params.uuid}/dislikes`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      await fetchLikesAndDislikes();
    } catch (error) {
      console.error(error);
    } finally {
      setPendingDislike(false);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchLikesAndDislikes();
    fetchComments();
  }, [fetchComments, fetchLikesAndDislikes, fetchPost]);

  return (
    <>
      <PostDetailCard
        id={post.id}
        isLoggedIn={isLoggedIn}
        post={post}
        onSubmit={submitComment}
        comment={comment}
        setComment={setComment}
        commentPostLoading={commentPostLoading}
        decodedToken={decodedToken}
        likes={likes}
        dislikes={dislikes}
        handleLike={handleLike}
        handleDislike={handleDislike}
      />
      {commnets.map((comment) => (
        <CommentListCard
          key={comment.id}
          uuid={comment.id}
          comment={comment}
          decodedToken={decodedToken}
        />
      ))}
    </>
  );
}
