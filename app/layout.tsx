import "../styles/globals.css";
import "animate.css";

import { AppProvider } from "@/contexts/AppProvider";
import { Footer } from "@/components/navigation/footer";
import { Inter } from "next/font/google";
import { MainNav } from "@/components/navigation/navbar/mainNav";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "스토리파이",
  description: "당신의 일상이 동화책이 됩니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} whitespace-pre-wrap`}>
        <div className="container mx-auto min-h-screen">
          <AppProvider>
            <MainNav />
            {children}
          </AppProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
