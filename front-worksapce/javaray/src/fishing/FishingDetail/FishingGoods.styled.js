import styled from "styled-components";

export const Content = styled.div`
  width: 1200px;
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
  height: 65%; //auto
  border: 1px solid orange; //지우기
`;

export const InnerTextDiv = styled.div`
  width: 100%;
  height: auto;
`;

export const GoodsTitleDiv = styled.div`
  width: 50%;
  height: 30px;
  border: 1px solid brown;
  float: left;
`;

export const GoodsTitle = styled.p`
  font-weight: bold;
  font-size: 20px;

  margin-left: 15px;
`;

export const GoodsExDiv = styled.div`
  width: 100%;
  height: 60%;
  border: 1px solid yellow;
`;

export const GoodsEx = styled.li`
  font-weight: bold;
  font-size: 15px;
  color: gray;

  margin-left: 15px;
`;

export const GoodsPriceDiv = styled.div`
  width: 50px;
  height: 30px;
  border: 1px solid pink;
  align-items: flex-start;
`;

export const PriceTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: blue;

  margin-left: 15px;
`;
