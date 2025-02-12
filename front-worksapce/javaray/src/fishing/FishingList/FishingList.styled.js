import styled from "styled-components";

export const FullContainer = styled.div`
  width: 100%;
  height: auto;
  border: 6px dotted purple;
`;
// 전체를 감싸는 요소 / 낚시터 하나당 블럭 / 사진/ 낚시터 이름 / 낚시터 주소 / 어종 / 가격 / 지역 필터
export const Container = styled.div`
  width: 1200px;
  min-height: 1800px;
  max-height: auto; /* 나중에 auto로 바꾸기 */
  margin: auto;
  background-color: rgb(246, 245, 245);
  border: 6px solid rgb(43, 183, 122); // 스타일 확인하고 지우기
`;

export const TitleLine = styled.div`
  width: 100%;
  height: 60px;
  background-color: white;
  text-align: center;

  border: 1px solid rgb(189, 185, 185);
`;

export const TitleText = styled.p`
  font-weight: bold;
  font-size: 25px;
  color: rgb(75, 74, 74);
  margin-top: 8px;
`;

export const Block1 = styled.div`
  width: 60%;
  min-height: 1700px;
  border: 1px solid blue;
  display: inline-block;
`;

export const Block2 = styled.div`
  width: 40%;
  height: 1500px;
  margin: auto;
  border: 1px solid red;
  float: right;
`;

export const FishingListBox = styled.div`
  width: 600px;
  height: 250px;
  padding: 10px 15px;
  border: 1px solid rgb(57, 56, 56);
  border-radius: 5px;
  margin-top: 25px;
  margin-left: 35px;
  margin-bottom: 20px;
  background-color: white;
`;

export const FishingAreaFilterBox = styled.div`
  width: 250px;
  height: 60px;
  border: 1px solid rgb(57, 56, 56);
  border-radius: 5px;
  margin-left: 40px;
  margin-top: 25px;
  background-color: white;

  display: flex; /* Flexbox 활성화 */
  justify-content: flex-end; /* 버튼을 오른쪽 정렬 */
  align-items: center; /* 버튼을 세로 가운데 정렬 */
`;

export const FishingFilterBox = styled.div`
  width: 120px;
  height: 60px;
  border: 1px solid rgb(57, 56, 56);
  border-radius: 5px;
  margin-left: 40px;
  margin-top: 10px;

  background-color: white;
`;

export const FilterButtom = styled.button`
  padding: 5px 8px;
  color: #33bfe8;
  border: 2px solid #33bfe8;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
  align-self: flex-end;
  transition: background-color 0.3s ease, transform 0.2s ease;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
  margin-right: 5px;
  background-color: whiten;

  margin-left: auto; /* 버튼을 오른쪽 끝으로 정렬 */

  &:hover {
    background-color: #33bfe8;
    color: white;
  }
`;

export const TitleP = styled.p`
  color: black;
  font-size: 25px;
  font-weight: bold;
  margin-top: 2px;
  margin-left: 2px;
`;

export const AddressP = styled.p`
  color: rgb(112, 120, 123);
  font-size: 13px;
  font-weight: bold;
  margin-top: 2px;
  margin-left: 2px;
`;

export const ImageDiv = styled.div`
  width: 45%;
  height: 100%;
  float: left;
  border: 1px solid blue;
`;

export const TextDiv = styled.div`
  width: 55%;
  height: 100%;
  float: left;
  border: 1px solid purple;
`;

export const InnerTextDiv = styled.div`
  width: 250px;
  height: 40px;
  border: 1px solid red;
  margin-top: 3px;
  margin-left: 8px;
`;

export const FishP = styled.p`
  color: blue;
  font-size: 12px;
  margin-top: 5px;
  margin-left: 1px;
  font-weight: bold;
  float: left;
`;

export const PriceDiv = styled.div`
  width: 100px;
  height: 40px;
  border: 1px solid red;
  margin-top: 50px;
  margin-left: 200px;
`;

export const FilterP = styled.p`
  width: 50%;
  height: 70%;
  border: 1px solid pink;
  margin-top: 10px;
  margin-left: 15px;
  font-size: 25px;
  font-weight: bold;
`;

export const moreButton = styled.button`
  padding: 5px 8px;
  color: #33bfe8;
  border: 2px solid #33bfe8;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
  align-self: flex-end;
  transition: background-color 0.3s ease, transform 0.2s ease;
  align-items: center;
  font-weight: bold;
  margin: auto;
  background-color: whiten;

  margin-left: auto; /* 버튼을 오른쪽 끝으로 정렬 */

  &:hover {
    background-color: #33bfe8;
    color: white;
  }
`;
