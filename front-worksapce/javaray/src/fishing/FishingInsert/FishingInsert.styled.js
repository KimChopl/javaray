import styled from "styled-components";

// 게시물 등록
// 전체를 감싸는것 / 제목/ input/ label / textarea/ fileInput / 작성완료 버튼 / form태그
export const InsertWrap = styled.div`
  width: 1200px;
  height: 1600px;
  margin: auto;
  background-color: #ffffff;
  border: 1px solid rgb(204, 201, 201);
  board-radius: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
    text-align:center;
    color:black:
    margin-bottom:20px;
`;

export const Input = styled.input`
  padding: 15px 18px;
  margin-bottom: 20px;
  margin-left: 20px;
  border: 2px solid #dddddd;
  border-radius: 10px;
  font-size: 18px;
  width: 500px;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &::placeholder {
    color: #aaa;
    font-style: italic;
  }

  &:focus {
    border-color: rgb(60, 124, 168);
    box-shadow: 0 0 8px rgba(52, 152, 219, 0.5);
    outline: none;
  }
`;

export const Label = styled.label`
  margin-bottom: 5px;
  color: black;
  font-weight: bold;
  font-size: 25px;
`;

export const TextArea = styled.textarea`
  padding: 12px 15px;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  resize: none;

  &:focus {
    border-color: rgb(31, 78, 109);
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color:rgb(38, 63, 127);
  color: #ffffff;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  align-self: flex-end;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color::rgb(56, 87, 166);
    transform: translateY(-2px);
  }

  &:active {
    background-color::rgb(33, 52, 99);
    transform: translateY(0);
  }
`;
