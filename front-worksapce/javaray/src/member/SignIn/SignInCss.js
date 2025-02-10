import styled from "styled-components";

export const SignInWarp = styled.div`
  width: 500px;
  height: 300px;
  background-color: white;
  margin: auto;
  margin-top: 15%;
  border-radius: 15px;
  padding: 15px;
`;

export const CloseDiv = styled.div`
  width: 100%;
  height: 25px;
`;

export const TitleCover = styled.div`
  width: 100%;
  height: 35px;
  text-align: center;
`;

export const CloseBtn = styled.div`
  width: 25px;
  height: 25px;
  margin-left: 445px;
`;

export const IdCover = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 20px;
`;

export const ContentDiv = styled.div`
  width: 20%;
  height: 30px;
  margin-left: 10%;
  display: inline-block;
  text-align: center;
`;

export const InputCover = styled.div`
  width: 60%;
  height: 30px;
  padding-left: 10px;
  display: inline-block;
`;

export const ContentP = styled.p`
  font-size: 18px;
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border: 1px solid #47d3fc;
  &:hover {
    border: 1px solid #33bfe8;
    box-shadow: 1px 3px 4px rgba(21, 161, 202, 0.5);
  }
  &:focus {
    border: 1px solid #33bfe8;
    box-shadow: 1px 3px 4px rgba(21, 161, 202, 0.5);
    outline: none;
  }
`;

export const BtnCover = styled.div`
  width: 70%;
  height: 45px;
  margin: 15px 15% 0 15%;
`;

export const SignInBtn = styled.button`
  display: inline-block;
  background-color: #33bfe8;
  border: none;
  width: 125px;
  height: 45px;
  border-radius: 8px;
  margin-left: 24%;
  &:hover {
    background-color: #47d3fc;
  }
`;

export const CloseModalBtn = styled.button`
  display: inline-block;
  background-color: #ff3366;
  border: none;
  width: 125px;
  height: 45px;
  border-radius: 8px;
  &:hover {
    background-color: #ff4d77;
  }
`;
