import styled from "styled-components";

export const ExplainBody = styled.div`
  width: 320px;
  height: 535px;
  margin-left: 30px;
  margin-top: 20px;
`;

export const ImageCover = styled.div`
  width: 310px;
  height: 250px;
  margin: 5px;
  background-color: #333333;
`;

export const FishImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
`;

export const FishTable = styled.table`
  width: 310px;
  height: 30px;
  margin: 5px;
  text-align: center;
  font-size: 11px;
`;

export const FishThBorder = styled.th`
  border-left: 1px solid gray;
`;

export const FishTdBorder = styled.td`
  border-left: 1px solid gray;
`;

export const ExplainContentCover = styled.div`
  width: 100%;
  height: 124px;
  padding: 5px;
  border-top: 1px solid gray;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 7px; /* 스크롤바 너비 */
  }

  &::-webkit-scrollbar-track {
    background-color: #ffffff; /* 스크롤바 트랙 배경 */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cdcdcd; /* 스크롤바 핸들 색상 */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* 핸들에 마우스 오버 시 색상 */
  }
`;
