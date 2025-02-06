import styled from "styled-components";

export const DownWrap = styled.div`
  width: 100%;
  height: 78%;
  margin: auto;
  border: 1px solid blue;
  background-color: rgb(250, 243, 243);
`;

export const AddressDiv = styled.div`
  border: 1px solid white;
  background-color: white;
  background-image: url("https://www.shutterstock.com/image-vector/abstract-city-plan-generic-map-260nw-710093665.jpg");
  width: 1000px;
  height: 130px;
  margin: auto;
  margin-top: 50px;
  font-weight: bold;
  display: flex;
  background-size: cover;
  background-position: center;
  border-radius: 5px;

  position: relative;
  overflow: hidden; /* 부모 영역을 벗어나지 않도록 설정 */

  /* 흐린 배경 레이어 */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: inherit; /* 기존 배경과 동일한 이미지 */
    background-size: inherit;
    background-position: inherit;
    filter: blur(3px); /* 흐림 효과 적용 */
    z-index: 0; /* 흐린 배경이 뒤로 가도록 설정 */
  }

  /* 내부 요소는 흐려지지 않도록 설정 */
  * {
    position: relative;
    z-index: 1;
  }
`;

export const DownAddressH2 = styled.h2`
  font-size: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 40px;
  font-weight: bold;
`;

export const MessageDiv = styled.div`
  width: 1000px;
  height: auto; // auto
  background-color: white;
  border: 1px solid white;
  margin: auto;
  margin-top: 50px;
  border-radius: 5px;
`;

export const MessageDiv1 = styled.div`
  width: 1000px;
  height: 35%;
  border-bottom: 1px solid rgba(84, 84, 87, 0.68);
  border-radius: 5px;
`;

export const MessageDiv2 = styled.div`
  width: 1000px;
  height: 65%;
`;

export const MessageTitle = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 20px;
`;

export const MessageText = styled.p`
  font-size: 18px;
  margin-top: 10px;
  margin-left: 20px;
`;
