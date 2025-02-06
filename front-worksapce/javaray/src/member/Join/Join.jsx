import { useState, useContext } from "react";
import axios from "axios";

import React from "react";
import {
  JoinContainer,
  JoinButton,
  JoinInput,
  JoinLabel,
  JoinWrapper,
  JoinMessage,
} from "./Join.styles";

const Join = ({ messages, onChange, onSubmit }) => {
  return (
    <JoinContainer>
      <h2>회원가입</h2>
      <JoinWrapper onSubmit={onSubmit}>
        <JoinLabel>이름*</JoinLabel>
        <JoinInput
          type="text"
          //value={userName}
          //onChange={(e) => setUserName(e.target.value)}
          placeholder="이름을 입력하세요."
        />
        <JoinMessage>{messages?.userName}</JoinMessage>
        <JoinLabel>아이디*</JoinLabel>
        <JoinInput
          type="text"
          //value={userId}
          //onChange={(e) => setUserId(e.target.value)}
          placeholder="아이디를 입력하세요."
        />
        <JoinMessage>{messages?.userId}</JoinMessage>
        <JoinLabel>비밀번호*</JoinLabel>
        <JoinInput
          type="password"
          //value={userPwd}
          //onChange={(e) => setUserPwd(e.target.value)}
          placeholder="비밀번호를 입력하세요."
        />
        <JoinMessage>{messages?.userPwd}</JoinMessage>
        <JoinLabel>비밀번호 확인*</JoinLabel>
        <JoinInput
          type="password"
          //value={pwdConfirm}
          // onChange={(e) => setPwdConfirm(e.target.value)}
          placeholder="비밀번호를 입력하세요"
        />
        {/*} <JoinMessage>{pwdConfirm}</JoinMessage>*/}
        <JoinLabel>닉네임*</JoinLabel>
        <JoinInput
          type="text"
          //value={nickName}
          //onChange={(e) => setNickName(e.target.value)}
          placeholder="닉네임을 입력하세요."
        />
        <JoinLabel>이메일*</JoinLabel>
        <JoinInput
          type="email"
          //value={email}
          //onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요."
        />
        <JoinMessage>{messages?.email}</JoinMessage>
        <JoinLabel>전화번호*</JoinLabel>
        <JoinInput
          type="text"
          //value={phone}
          //onChange={(e) => setPhone(e.target.value)}
          placeholder="전화번호를 입력하세요."
        />
        <JoinMessage>{messages?.phone}</JoinMessage>
        <JoinButton type="submit">가입하기</JoinButton>
      </JoinWrapper>
    </JoinContainer>
  );
};

export default Join;
