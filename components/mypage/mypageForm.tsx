import Link from "next/link";

export function MypageForm({ onSubmit, user, setUser }) {
  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto">
      <form onSubmit={onSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">이메일</span>
          </label>
          <input
            type="text"
            value={user?.email || ""}
            className="input input-bordered"
            readOnly
            disabled
          />
          <div className="label">
            <span className="label-text-alt text-warning">
              이메일은 변경할 수 없어요
            </span>
          </div>
        </div>
        <div className="form-control">
          <label className="label" htmlFor="nickname">
            <span className="label-text">닉네임</span>
          </label>
          <input
            type="text"
            id="nickname"
            placeholder="10자 이내로 닉네임을 입력해 주세요."
            value={user?.nickname || ""}
            className="input input-primary input-bordered"
            maxLength={10}
            onChange={(e) => setUser({ ...user, nickname: e.target.value })}
            required
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="intro">
            <span className="label-text">인삿말</span>
          </label>
          <textarea
            id="intro"
            placeholder="간단한 인삿말을 적어 주세요."
            value={user?.intro || ""}
            className="textarea textarea-primary"
            maxLength={80}
            onChange={(e) => setUser({ ...user, intro: e.target.value })}
            rows={4}
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="avatar">
            <span className="label-text">프로필 사진</span>
          </label>
          <input
            id="avatar"
            type="file"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">저장</button>
        </div>
      </form>
      <div className="text-center mb-6">
        <Link
          href="/password/change"
          className="text-sm text-primary hover:underline"
        >
          비밀번호 변경
        </Link>
      </div>
    </div>
  );
}
