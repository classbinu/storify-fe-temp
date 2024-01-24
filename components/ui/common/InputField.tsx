export function InputField({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        className="input input-bordered input-primary w-full max-w-xs"
      />
      {/* 여기에 필드 유효성 검사 메시지 추가 */}
    </div>
  );
}
