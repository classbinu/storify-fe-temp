import { useState } from "react";

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // 로그인 로직 구현
    // 예: API 요청 후, setUser로 상태 업데이트
  };

  const logout = () => {
    // 로그아웃 로직 구현
    setUser(null);
  };

  const isAuthenticated = () => {
    return user != null;
  };

  return {
    user,
    login,
    logout,
    isAuthenticated,
  };
};

export default useProvideAuth;
