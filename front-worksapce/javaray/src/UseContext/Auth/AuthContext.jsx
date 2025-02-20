import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navi = useNavigate();
  const [auth, setAuth] = useState({
    nickname: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: undefined,
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const nickname = localStorage.getItem("nickname");

    if (accessToken && refreshToken && nickname) {
      setAuth({
        nickname: nickname,
        accessToken: accessToken,
        refreshToken: refreshToken,
        isAuthenticated: true,
      });
    } else {
      setAuth({
        nickname: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      });
    }
  }, []);
  const signin = (nickname, accessToken, refreshToken) => {
    setAuth({
      nickname,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };
  const signout = () => {
    setAuth({
      nickanme: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("nickname");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navi("/");
  };

  return (
    <AuthContext.Provider value={{ auth, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
