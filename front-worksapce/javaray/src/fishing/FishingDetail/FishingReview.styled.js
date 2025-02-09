import styled from "styled-components";

export const ReviewWrap = styled.div`
  width: 1000px;
  height: auto;
  border: 1px solid purple; // 최종 - 지우기

  margin: auto;

  display: flex;
  flex-wrap: wrap; // 한 줄에 3개씩 배치
  justify-content: center; // 중앙 정렬
  gap: 25px; // 요소 간 간격 추가

  padding-bottom: 20px; // 버튼과 간격 확보
`;

export const ReviewDiv = styled.div`
  width: 280px;
  height: 260px;
  border: 1px solid black;
  float: left;
  margin: auto;
  margin-left: 25px;
  margin-top: 35px;
  background-color: white;
`;

export const ReviewDivTop = styled.div`
  width: 100%;
  height: 15%;
  border: 1px solid red;
`;

export const ReviewDivTopP = styled.p`
  font-size: 20px;
  margin-left: 15px;
  margin-top: 5px;
`;

export const ReviewDivMiddel = styled.div`
  width: 100%;
  height: 60%;
  border: 1px solid blue;
`;

export const ReviewDivBottom = styled.div`
  width: 100%;
  height: 25%;
  border: 1px solid orange;
`;

export const ReviewTitle = styled.div`
  width: 100%;
  height: 50%;
  border: 1px solid yellow;
`;

export const ReviewTitleP = styled.p`
  font-size: 15px;
  margin-left: 15px;
  margin-top: 3px;
  font-weight: bold;
`;

export const ReviewDate = styled.div`
  width: 100%;
  height: 48%;
  border: 1px solid green;
`;

export const ReivewDateP = styled.p`
  font-size: 12px;
  color: gray;
  margin-left: 15px;
  margin-top: 8px;
`;

export const ReviewButton = styled.button`
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
  margin-top: 15px;
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

// 버튼을 아래에 고정하기 위해 flex 적용
export const ReviewButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
