"use client";

import { AppContext } from "@/contexts/AppContext";
import Link from "next/link";
import { useContext } from "react";

export function MainNav() {
  const isLoggedIn = useContext(AppContext).isLoggedIn;

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0} // 햄버거 버튼 메뉴 부분
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/books/make" className="py-4">
                책 만들기
              </Link>
            </li>
            <li>
              <Link href="/books" className="py-4">
                모든 책장
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link href="/logout" className="py-4">
                    로그아웃
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login" className="py-4">
                  로그인
                </Link>
              </li>
            )}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl text-primary">
          STORIFY
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/books/make" className="py-4">
              책 만들기
            </Link>
          </li>
          <li>
            <Link href="/books" className="py-4">
              모든 책장
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1">
          {isLoggedIn ? (
            <>
              <li>
                <Link href="/mypage">마이페이지</Link>
              </li>
              <li>
                <Link href="/logout">로그아웃</Link>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">로그인</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
