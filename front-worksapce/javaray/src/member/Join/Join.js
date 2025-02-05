import { useState, useContext } from "react";
import axios from "axios";

const Join = () => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // 오류메시지 상태 저장
  const [nameMessage, setNameMessage] = useState("");
  const [idMessage, setIdMessage] = useState("");
  const [userPwdMessage, setUserPwdMessage] = useState("");
  const [pwdConfirmMessage, setPwdConfirmMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/members", {
        userName: userName,
        userId: userId,
        userPwd: userPwd,
        email: email,
        nickName: nickName,
        phone: phone,
      })
      .then((response) => {
        console.log(response);
        alert(response.data);
        setIdMessage("");
        setPwdMessage("");
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          setIdMessage(error.response.data.userId || "");
          setUserPwdMessage(error.response.data.userPwd || "");
          setNameMessage(error.response.data.userName || "");
          setEmailMessage(error.response.data.email || "");
          setPhoneMessage(error.response.data.phone || "");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="이름"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        placeholder="아이디"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={pwd}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={pwdConfirm}
        onChange={(e) => setPwdConfirm(e.target.value)}
      />
      <input
        type="text"
        placeholder="닉네임"
        value={nickName}
        onChange={(e) => setNickName(e.target.value)}
      />
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="전화번호"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button type="submit">가입하기</button>
    </form>
  );
};

export default Join;
