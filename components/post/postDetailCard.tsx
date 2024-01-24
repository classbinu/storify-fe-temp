import Avatar from "../ui/avatar/avatar";
import { CommentInput } from "../comment/commentInput";
import Link from "next/link";
import { PostBanner } from "../banner/postBanner";

export function PostDetailCard({
  id,
  isLoggedIn,
  post,
  onSubmit,
  comment,
  setComment,
  commentPostLoading,
  decodedToken,
  likes,
  dislikes,
  handleLike,
  handleDislike,
}) {
  return (
    <div className="m-2">
      <div className="card w-full bg-base-100 shadow-xl py-10">
        <Avatar
          src={post.author && post.author.avatar}
          alt={post.author.nickname}
          obj={post}
        />

        <div className="card-body">
          {post.isPrivate ? (
            <div className="badge badge-accent">비공개</div>
          ) : (
            ""
          )}
          <h2 className="card-title font-bold text-4xl">{post.title}</h2>
          <div className="divider"></div>
          <p className="pb-20">{post.content}</p>
          <PostBanner />
          <div className={`text-right`}>
            <Link
              href={`/posts/${id}/edit`}
              className={`btn btn-xs btn-warning mr-2 ${
                decodedToken && decodedToken.sub === post.author.id
                  ? ""
                  : "hidden"
              }`}
            >
              수정
            </Link>
          </div>

          <div className="divider"></div>

          <div className="flex justify-center mb-6">
            <button
              className={`btn ${
                likes.some((like: any) => like.user.id === decodedToken.sub)
                  ? ""
                  : "btn-outline"
              } btn-primary mx-1`}
              onClick={handleLike}
              disabled={!isLoggedIn}
            >
              👍 좋아요 {likes.length}
            </button>
            <button
              className={`btn ${
                dislikes.some(
                  (dislikes: any) => dislikes.user.id === decodedToken.sub
                )
                  ? ""
                  : "btn-outline"
              } btn-error mx-1`}
              onClick={handleDislike}
              disabled={!isLoggedIn}
            >
              👎 싫어요 {dislikes.length}
            </button>
          </div>
          {/* <Link href="/posts" className="btn btn-primary w-36">목록으로 돌아가기</Link> */}
          <CommentInput
            isLoggedIn={isLoggedIn}
            onSubmit={onSubmit}
            comment={comment}
            setComment={setComment}
            disabled={commentPostLoading}
            buttonText="댓글 작성"
          />
        </div>
      </div>
    </div>
  );
}
