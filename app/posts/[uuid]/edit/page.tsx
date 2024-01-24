"use client";

import { useContext, useEffect, useState } from "react";

import { AppContext } from "@/contexts/AppContext";
import { InterviewForm } from "@/components/interview/interviewForm";
import Swal from "sweetalert2";
import { getAccessTokenAndValidate } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function EditPostPage({ params }: { params: { uuid: string } }) {
  const route = useRouter();

  const [isPrivate, setIsPrivate] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answerPostLoading, setAnswerPostLoading] = useState(false);
  const [postDeleteLoading, setPostDeleteLoading] = useState(false);

  const { offset, setOffset } = useContext(AppContext);
  const { posts, setPosts } = useContext(AppContext);
  const { myPosts, setMyPosts } = useContext(AppContext);
  const { myOffset, setMyOffset } = useContext(AppContext);

  const fetchPost = async (uuid: string) => {
    try {
      const response = await fetch(
        `https://storify-be.fly.dev/api/posts/${uuid}`
      );
      const post = await response.json();
      setAnswer(post.content);
      setIsPrivate(post.isPrivate);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let content = answer;

    if (content === "") {
      return alert("답변을 입력해주세요.");
    }

    setAnswerPostLoading(true);

    const newAnswer = { content, isPrivate };

    try {
      const accessToken = await getAccessTokenAndValidate();

      const res = await fetch(
        `https://storify-be.fly.dev/api/posts/${params.uuid}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newAnswer),
        }
      );
      setAnswerPostLoading(false);
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

  const handlePostDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "정말로 삭제하시겠습니까?",
      text: "삭제하면 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });
    if (!confirm.isConfirmed) return;

    setPostDeleteLoading(true);
    try {
      const accessToken = await getAccessTokenAndValidate();

      await fetch(`https://storify-be.fly.dev/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPostDeleteLoading(false);

      setOffset(0);
      setPosts([]);
      setMyOffset(0);
      setMyPosts([]);

      route.push("/posts");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPost(params.uuid);
  }, [params.uuid]);

  return (
    <div className="mt-20 px-5">
      <InterviewForm
        onSubmit={onSubmit}
        isPrivate={isPrivate}
        setIsPrivate={setIsPrivate}
        answer={answer}
        setAnswer={setAnswer}
        answerPostLoading={answerPostLoading}
        buttonText="답변 수정"
      />
      <div className="label">
        <span className="label-text-alt text-primary">
          * 답변을 수정해도 AI 댓글은 변경되지 않습니다.
        </span>
      </div>
      <div className="text-center">
        <button
          className={"text-error mt-10 hover:underline"}
          onClick={() => handlePostDelete(params.uuid)}
          disabled={postDeleteLoading}
        >
          답변 삭제
        </button>
      </div>
    </div>
  );
}
