import styled from "styled-components";

export const DetailWarp = styled.div`
  width: 1200px;
  height: auto;
  margin: auto;
  min-height: 800px;
  text-align: center;
`;

export const DetailHeader = styled.div`
  width: 100%;
  height: 120px;
  padding-top: 30px;
  text-align: center;
`;

export const DetailBody = styled.div`
  width: 100%;
  min-height: 802px;
  height: auto;
`;
export const DetailBase = styled.div`
  width: 1100px;
  height: 502px;
  padding-left: 50px;
`;

export const ImageCover = styled.div`
  width: 650px;
  height: 452px;
  padding: 25px;
  display: inline-block;
  position: relative;
  text-align: left;
`;

export const BaseCover = styled.div`
  width: 375px;
  height: 452px;
  padding: 25px 25px 25px 0;
  display: inline-block;
`;

export const ImageBox = styled.img`
  width: 650px;
  height: auto;
  max-height: 100%;
  object-fit: contain;
  position: absolute;
`;

export const BaseBar = styled.div`
  width: 325px;
  height: 65px;
  padding: 12.5px 25px 12.5px 25px;
  position: relative;
`;

export const WeatherCover = styled.div`
  width: 1100px;
  height: 120px;
  padding: 10px 25px 10px 25px;
`;

export const ShippingContent = styled.div`
  width: 1100px;
  height: auto;
  min-height: 350px;
  padding: 10px 25px 10px 25px;
  text-align: left;
  margin-top : 120px;
`;

export const ReviewCover = styled.div`
  width: 1100px;
  height: auto;
  min-height: 90px;
  padding: 10px 25px 10px 25px;
`;

export const LocationDiv = styled.div`
  width: 305px;
  height: 40px;
  padding: 5px 10px 5px 10px;
  position: absolute;
  text-align: left;
`;

export const PriceDiv = styled.div`
  width: 150px;
  height: 40px;
  display: inline-block;
  position: absolute;
  padding: 5px 5px 5px 10px;
  text-align: left;
  margin-left: -150px;
`;

export const AllowNumberDiv = styled.div`
  width: 155px;
  height: 40px;
  position: absolute;
  padding: 5px 10px 5px 165px;
`;

export const ContentLabel = styled.label`
  position: absolute;
  width: 100%;
  height: 100%;
`;
export const FishTable = styled.table`
  text-align: center;
  width: 150%;
`;

export const Td = styled.td`
  padding: 3px 5px 3px 5px;
  border-right: 1px solid #a4a4a4;
  border-left: 1px solid #a4a4a4;
  font-size: 1em;
  &:hover {
    cursor: pointer;
  }
`;

export const BookBtnCover = styled.div`
  width: 180px;
  height: 100%;
  padding: 3px;
  float: left;
  border-right: 1px solid gray;
  box-sizing: border-box;
  position: relative;
`;

export const BookBtn = styled.button`
  width: 80px;
  height: 34px;
  position: absolute;
  border: none;
  background-color: skyblue;
  display: block;
  position: absolute;
  &:hover {
    background-color: #5a9bd5;
  }
`;

export const OtherInfo = styled.div`
  width: 90px;
  height: 100%;
  text-align: center;
  border-right: 1px solid gray;
  box-sizing: border-box;
  float: left;
  &:hover {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
  }
`;

export const RatingInfo = styled.div`
  width: 95px;
  height: 100%;
  text-align: center;
  float: left;
`;

export const AttentionInfo = styled.div`
  width: 95px;
  height: 100%;
  text-align: center;
  float: left;
  &:hover {
    cursor: pointer;
  }
`;

export const Load = styled.div`
  width: 100%;
  height: 1200px;
  background-color: white;
`;
