"use client";

import { useContext, useEffect, useState } from "react";

import { AppContext } from "@/contexts/AppContext";
import { CommentInput } from "@/components/comment/commentInput";
import Swal from "sweetalert2";
import { getAccessTokenAndValidate } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function EditCommentPage({
  params,
}: {
  params: { uuid: string };
}) {
  const route = useRouter();

  const [comment, setComment] = useState("");
  const [post, setPost] = useState(null);
  const [commentPatchtLoading, setCommentPatchtLoading] = useState(false);
  const [commentDeleteLoading, setCommnetDeleteLoading] = useState(false);

  const { isLoggedIn } = useContext(AppContext);

  const fetchComment = async (uuid: string) => {
    try {
      const response = await fetch(
        `https://storify-be.fly.dev/api/comments/${uuid}`
      );
      const comment = await response.json();
      setComment(comment.content);
      setPost(comment.post);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let content = comment;

    if (content === "") {
      return alert("댓글을 입력해주세요.");
    }

    setCommentPatchtLoading(true);

    const newComment = { content };

    try {
      const accessToken = await getAccessTokenAndValidate();

      const res = await fetch(
        `https://storify-be.fly.dev/api/comments/${params.uuid}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newComment),
        }
      );
      setCommentPatchtLoading(false);
      const data = await res.json();
      if (data.id) {
        Swal.close();
      } else {
        alert("답변을 저장할 수 없습니다.");
      }
      route.push(`/posts/${params.uuid}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "정말로 삭제하시겠습니까?",
      text: "삭제하면 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });
    if (!confirm.isConfirmed) return;

    setCommnetDeleteLoading(true);
    try {
      const accessToken = await getAccessTokenAndValidate();

      await fetch(`https://storify-be.fly.dev/api/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCommnetDeleteLoading(false);
      route.push(`/posts/${post.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComment(params.uuid);
  }, [params.uuid]);

  return (
    <div className="mt-20 px-5">
      <CommentInput
        isLoggedIn={isLoggedIn}
        onSubmit={onSubmit}
        comment={comment}
        setComment={setComment}
        disabled={commentPatchtLoading}
        buttonText="댓글 수정"
      />
      {/* <div className="label">
        <span className="label-text-alt text-error">
          * 필요한 경우 라벨 메시지 추가
        </span>
      </div> */}
      <div className="text-center">
        <button
          className={"text-error mt-10 hover:underline"}
          onClick={() => handleCommentDelete(params.uuid)}
          disabled={commentDeleteLoading}
        >
          댓글 삭제
        </button>
      </div>
    </div>
  );
}
