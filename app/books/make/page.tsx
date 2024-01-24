"use client";

import { useEffect, useState } from "react";

import { InterviewForm } from "@/components/interview/interviewForm";
import Swal from "sweetalert2";
import { getAccessTokenAndValidate } from "@/lib/utils";
import topics from "@/data/topics";
import { useRouter } from "next/navigation";

export default function InterviewPage() {
  const route = useRouter();

  const [topic, setTopic] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [answer, setAnswer] = useState("");
  const [topicLoading, setTopicLoading] = useState(false);
  const [answerPostLoading, setAnswerPostLoading] = useState(false);

  // const selectTopic = () => {
  //   setTopic("");
  //   setTopicLoading(true);
  //   setTimeout(() => {
  //     const pickedTopic = topics[Math.floor(Math.random() * topics.length)];
  //     setTopic(pickedTopic);
  //     setTopicLoading(false);
  //   }, 2000);
  // };

  const onSubmit = async (event) => {
    event.preventDefault();
    let content = answer;

    if (content === "") {
      return alert("답변을 입력해주세요.");
    }

    setAnswerPostLoading(true);
    showAdModal();

    // const newAnswer = { content, isPrivate };
    // newAnswer["title"] = topic;

    try {
      const accessToken = await getAccessTokenAndValidate();

      const res = await fetch(`https://storify-be.fly.dev/api/stories/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ message: content }),
      });
      setAnswerPostLoading(false);
      const data = await res.json();
      console.log(data._id);
      if (data._id) {
        Swal.close();
        route.push(`/books/${data._id}`);
      } else {
        alert("동화책 만들기에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showAdModal = () => {
    let timerInterval;
    Swal.fire({
      title: "AI가 동화책을 만들고 있어요🤖",
      html: `<b></b>ms 남았어요.`,
      timer: 40000,
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  };

  // useEffect(() => {
  //   selectTopic();
  // }, []);

  return (
    // <div className="px-5">
    //   <div className="h-20">
    //     <div className="text-center mt-10">
    //       {topic === "" ? (
    //         <span className="loading loading-bars loading-lg"></span>
    //       ) : (
    //         <h1 className="text-xl md:text-3xl font-semibold">{topic}</h1>
    //       )}
    //     </div>
    //   </div>
    //   <div className="flex justify-center mt-10">
    //     <button
    //       className="btn btn-outline btn-primary"
    //       disabled={topicLoading}
    //       onClick={selectTopic}
    //     >
    //       다른 문제
    //     </button>
    //   </div>
    //   <div className="divider"></div>
    // </div>
    <div>
      <InterviewForm
        onSubmit={onSubmit}
        isPrivate={isPrivate}
        setIsPrivate={setIsPrivate}
        answer={answer}
        setAnswer={setAnswer}
        answerPostLoading={answerPostLoading}
        buttonText="동화책 만들기"
      />
    </div>
  );
}
