import Link from "next/link";

export function ChangeForm({ onSubmit, passwords, setPasswords }) {
  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto">
      <form onSubmit={onSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">현재 비밀번호</span>
          </label>
          <input
            type="password"
            value={passwords?.oldPassword || ""}
            onChange={(e) =>
              setPasswords({ ...passwords, oldPassword: e.target.value })
            }
            className="input input-bordered"
            minLength={4}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">새로운 비밀번호</span>
          </label>
          <input
            type="password"
            value={passwords?.newPassword || ""}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
            className="input input-bordered"
            minLength={4}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">비밀번호 확인</span>
          </label>
          <input
            type="password"
            value={passwords?.newPassword2 || ""}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword2: e.target.value })
            }
            className="input input-bordered"
            minLength={4}
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">비밀번호 변경</button>
        </div>
      </form>
    </div>
  );
}
