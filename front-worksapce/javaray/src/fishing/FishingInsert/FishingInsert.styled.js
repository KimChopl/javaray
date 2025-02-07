import styled from "styled-components";

// 게시물 등록
// 전체를 감싸는것 / 제목/ input/ label / textarea/ fileInput / 작성완료 버튼 / form태그
export const InsertWrap = styled.div`
  width: 1200px;
  height: auto;
  margin: auto;
  background-color: #ffffff;
  border: 1px solid rgb(204, 201, 201);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
  width: 100%; /* 너비 전체 */
  height: 300px; /* 높이 키우기 */
  text-align: center;
  color: white; /* 글자색을 흰색으로 변경 */
  font-weight: bold;
  font-size: 50px; /* 글자 크기 키우기 */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* 배경 오버레이를 위한 상대 위치 */
  overflow: hidden; /* 배경 이미지 넘칠 경우 숨기기 */

  /* 배경 이미지 설정 */
  background-image: url(data:image/jpeg;base64,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);
  background-size: cover; /* 배경 이미지가 박스를 가득 채우도록 설정 */
  background-position: center; /* 이미지를 중앙 정렬 */
  background-repeat: no-repeat;

  /* 배경 투명도 효과를 위한 오버레이 */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2); /* 검은색 투명도 (0.5) */
    z-index: 1;
  }

  /* 제목 텍스트를 위에 표시 */
  span {
    position: relative;
    z-index: 2;
  }
`;

export const Input = styled.input`
  padding: 10px 18px;
  margin-top: 15px;
  margin-bottom: 15px;
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
  font-size: 20px;
`;

export const TextArea = styled.textarea`
  padding: 12px 15px;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  font-size: 16px;
  width: 500px;
  box-sizing: border-box;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  resize: none;

  &:focus {
    border-color: #33bfe8;
    box-shadow: 0 0 5pxrgb (42, 152, 185);
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 15px 80px;
  background-color: #33bfe8;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  font-size: 20px;
  cursor: pointer;
  align-self: flex-end;
  transition: background-color 0.3s ease, transform 0.2s ease;
  align-items: center;

  /* 화면 중앙 정렬 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto; /* 가로 가운데 정렬 */
  margin-bottom: 25px;

  &:hover {
    background-color: rgb(48, 162, 197);
    transform: translateY(-2px);
  }

  &:active {
    background-color: rgb(43, 153, 187);
    transform: translateY(0);
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Label과 Input을 왼쪽 정렬 */
  width: 80%; /* 부모 요소 크기 조정 */
  max-width: 600px; /* 최대 너비 설정 */
  margin-bottom: 10px; /* 아래 간격 */
`;

export const AmenitiesImg = styled.img`
  width: 60px;
  height: 60px;
  margin: auto;
`;

export const AmenitiesText = styled.label`
  font-size: 15px;
  font-weight: bold;
`;

export const AmenitiesDiv = styled.div`
  width: 100px;
  height: 90px;
  margin: auto;
  border: 1px solid rgb(225, 218, 203);
  text-align: center;
  float: left;
  border-radius: 3px;

  &:hover {
    outline: 2px solid skyblue;
    background-color: #e0f7ff;
  }
`;

export const AmenitiesImgDiv = styled.div`
  width: 100%;
  height: 75%;
`;

export const AmenitiesTextDiv = styled.div`
  width: 100%;
  height: 25%;

  margin-bottom: 2px;
`;

export const AmenitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄바꿈 허용 */
  gap: 10px; /* 간격 조정 */

  margin-bottom: 20px;
`;

export const FishText = styled.label`
  font-size: 20px;
  font-weight: bold;
  border: 1px solid rgb(225, 218, 203);
  text-align: center;
  border-radius: 3px;

  &:hover {
    width: auto;
    height: 30px;
    outline: 2px solid skyblue;
    background-color: #e0f7ff;
  }
`;
