import styled from "styled-components";

export const DetailWrap = styled.div`
  width: 100%;
  height: 2000px;
  margin: auto;
  border: 1px solid rgb(204, 201, 201);
`;

export const TopWrap = styled.div`
  width: 100%;
  height: 22%;
  margin: auto;
  border: 1px solid red;
`;

export const TopBlock = styled.div`
  width: 1000px;
  height: 300px;
  margin: auto;
  border: 1px solid black;
  margin-top: 50px;
`;

export const TopImageBlock = styled.div`
  width: 60%;
  height: 100%;
  border: 1px solid red;
  float: left;
`;

export const TopTextBlock = styled.div`
  width: 40%;
  height: 100%;
  border: 1px solid blue;
  float: left;
`;

export const TopMenuBlock = styled.div`
  width: 1001px;
  height: 70px;
  border: 1px solid pink;
  margin: auto;
  margin-top: 15px;
`;

export const TopMenuInnerBlock = styled.div`
  width: 333px;
  height: 100%;
  border: 1px solid orange;
  float: left;

  cursor: pointer;

  &:hover {
    border-bottom: 3px solid skyblue;
  }

  &:active {
    border-bottom: 3px solid skyblue;
  }
`;

export const MenuText = styled.p`
  margin: auto;
  font-size: 25px;
  font-weight: bold;
  color: rgb(98, 97, 97);
  text-align: center;
  margin-top: 15px;

  cursor: pointer;

  &:hover {
    color: skyblue;
  }

  &:active {
    color: skyblue;
  }
`;

export const DetailTitleBlock = styled.div`
  width: auto;
  height: 60px;
  border: 1px solid red;
  margin-top: 30px;
  margin-left: 20px;
`;

export const DetailTitle = styled.h2`
  font-weight: bold;
  margin: auto;
  color: rgb(43, 42, 42);
`;

export const DetailAddressBlock = styled.div`
  width: 250px;
  height: 40px;
  margin-left: 20px;
  margin-top: 3px;
  border: 1px solid green;
`;

export const DetailAddress = styled.p`
  font-size: 17px;
  color: rgb(89, 86, 86);
  font-weight: 400px;
`;

export const PhoneBlock = styled.div`
  border-radius: 50px;
  background-color: skyblue;
  border: 1px solid skyblue;
  width: 80px;
  height: 80px;

  margin-left: 300px;
  margin-top: 75px;
`;
