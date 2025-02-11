import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userNo: null,
    username: null,
    nickanme: null,
    role: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userNo = localStorage.getItem("userNo");
    const username = localStorage.getItem("username");
    const nickname = localStorage.getItem("nickname");
    const role = localStorage.getItem("role");

    if (accessToken && refreshToken && userNo && username && nickname) {
      setAuth({
        userNo: userNo,
        username: username,
        nickname: nickname,
        role: role,
        accessToken: accessToken,
        refreshToken: refreshToken,
        isAuthenticated: true,
      });
    }
  }, []);
  const signin = (
    userNo,
    username,
    nickname,
    role,
    accessToken,
    refreshToken
  ) => {
    setAuth({
      userNo,
      username,
      nickname,
      role,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
    localStorage.setItem("userNo", userNo);
    localStorage.setItem("username", username);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("role", role);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };
  const signout = () => {
    setAuth({
      userNo: null,
      username: null,
      nickanme: null,
      role: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("userNo");
    localStorage.removeItem("username");
    localStorage.removeItem("nickname");
    localStorage.removeItem("role");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };
  return (
    <AuthContext.Provider value={{ auth, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
