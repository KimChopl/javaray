import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");

  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/members/login", {
        userId: userId,
        userPwd: userPwd,
      })
      .then((response) => {
        //console.log(response);
        const { username, tokens } = response.data;
        login(username, tokens.accessToken, tokens.refreshToken);
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          onChange={(e) => setUserId(e.target.value)}
          value={userId}
          placeholder="사용자명"
          required
        />
        <input
          type="password"
          onChange={(e) => setUserPwd(e.target.value)}
          value={userPwd}
          placeholder="비밀번호"
          required
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
