import Image from "next/image";

export function ProfileCard({ user }) {
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl mx-auto my-10">
        <figure className="pt-20 pb-2">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <Image
                src={
                  user.avatar ||
                  "data:image/png;base64,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"
                }
                alt=""
                width={360}
                height={360}
              />
            </div>
          </div>
        </figure>
        <div className="card-body items-center text-center h-72">
          <h2 className="card-title">{user?.nickname}</h2>
          <p>{user?.intro}</p>
          <div className="card-actions">
            <button className="btn btn-primary">친구 추가</button>
          </div>
        </div>
      </div>
    </div>
  );
}
