import styled from "styled-components";

export const Content = styled.div`
  width: 1000px;
  height: auto;
  background-color: white;
  margin: auto;
  margin-top: 30px;
  margin-bottom: auto;
  border: 1px solid black;
  border-radius: 5px;
`;

export const TitleDiv = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid rgba(84, 84, 87, 0.68);
`;

export const TextDiv = styled.div`
  width: 100%;
  height: auto; //auto
  border: 1px solid orange; //지우기
  margin-bottom: 15px;
`;

export const InnerTextDiv = styled.div`
  width: 100%;
  height: 30px;
`;

export const GoodsTitleDiv = styled.div`
  width: 50%;
  height: 30px;
  border: 1px solid green;
  float: left;
`;

export const GoodsTitle = styled.p`
  font-weight: bold;
  font-size: 20px;

  margin-left: 15px;
  margin-bottom: 0px;
`;

export const GoodsExDiv = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid yellow;
`;

export const GoodsEx = styled.li`
  font-weight: bold;
  font-size: 15px;
  color: gray;
  margin-left: 15px;
  padding: 0px;
`;

export const GoodsPriceDiv = styled.div`
  width: 50%;
  height: 30px;
  border: 1px solid pink;
  align-items: flex-start;
  float: right;
  text-align: right;
`;

export const PriceTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: blue;

  margin-left: 15px;
`;
