import Link from "next/link";
import topics from "@/data/topics";

export default function Home() {
  return (
    <main className="min-h-screen container mx-auto pt-40 px-5">
      <h1 className="text-4xl md:text-6xl font-semibold mb-5 md:mb-10 animate__animated animate__fadeInUp">
        여러분의 평범한 일상을
      </h1>
      <h1
        className="text-4xl md:text-6xl font-bold mb-5 md:mb-10 text-primary animate__animated animate__fadeInUp"
        style={{ animationDelay: "0.5s" }}
      >
        동화책으로 만들어 드려요
      </h1>
      <p
        className="text-lg md:text-3xl text-primary mb-1 animate__animated animate__fadeInUp"
        style={{ animationDelay: "1s" }}
      >
        저희에게 평범한 일상을 공유해 주세요
      </p>
      <p
        className="text-lg md:text-3xl text-primary animate__animated animate__fadeInUp"
        style={{ animationDelay: "1s" }}
      >
        AI가 글과 그림을 만들어 줄 거에요
      </p>
      <div
        className="animate__animated animate__fadeInUp"
        style={{ animationDelay: "1.5s" }}
      >
        <Link
          href="/books/make"
          className="btn btn-wide btn-primary mt-5 text-white"
        >
          동화책 제작 시작하기🧚‍♀️
        </Link>
      </div>
    </main>
  );
}
