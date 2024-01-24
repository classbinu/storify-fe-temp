import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";

export function InterviewForm({
  onSubmit,
  isPrivate,
  setIsPrivate,
  answer,
  setAnswer,
  answerPostLoading,
  buttonText,
}) {
  const isLoggedIn = useContext(AppContext).isLoggedIn;
  const maxAnswerLength = 1000;
  return (
    <form onSubmit={onSubmit}>
      {/* <div className="flex justify-start">
        <div className="form-control w-20">
          <label className="label cursor-pointer mb-4">
            <span className="label-text">비공개</span>
            <input
              type="checkbox"
              checked={isPrivate}
              className="checkbox checkbox-primary"
              onChange={(e) => setIsPrivate(e.target.checked)}
              disabled={!isLoggedIn}
            />
          </label>
        </div>
      </div> */}
      <div className="form-control">
        <textarea
          name="answer"
          placeholder={
            isLoggedIn ? "여러분의 일상을 입력해 주세요." : "로그인이 필요합니다."
          }
          className="textarea textarea-bordered textarea-primary"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            if (e.target.value.length > maxAnswerLength) {
              alert("답변은 1000자를 넘을 수 없습니다.");
              setAnswer(e.target.value.slice(0, maxAnswerLength));
            }
          }}
          rows={10}
          disabled={!isLoggedIn}
          maxLength={maxAnswerLength}
        ></textarea>
      </div>
      <div className="form-control mt-2">
        <input
          type="submit"
          value={isLoggedIn ? buttonText : "로그인이 필요합니다."}
          className="btn btn-primary"
          disabled={!isLoggedIn || answerPostLoading}
        />
      </div>
    </form>
  );
}
