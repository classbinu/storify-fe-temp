import Link from "next/link";

export function PostListCard({ post }) {
  return (
    <div className="m-2">
      <Link href={`/books/${post._id}`}>
        <div
          className="card w-80 h-80 bg-cover bg-base-100 shadow-xl hover:-translate-y-1 hover:shadow-2xl"
          style={{ backgroundImage: `url(${post.coverUrl})` }}
        >
          <div className="card-body py-4">
            {post.isPrivate ? (
              <div className="badge badge-accent">비공개</div>
            ) : (
              ""
            )}
            <div className="bg-white rounded-xl flex justify-center">
              <h2 className="card-title">{post.title}</h2>
            </div>
            <p className="text-base-300"></p>
          </div>
        </div>
      </Link>
    </div>
  );
}
