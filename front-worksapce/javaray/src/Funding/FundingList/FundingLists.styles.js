import styled from "styled-components";

export const Container = styled.div`
  max-width: 1000px;
  border-radius: 12px;
  margin: auto;
`;

export const FundingTitle = styled.h1`
  font-weight: 700;
  margin-left: 20px;
  margin-top: 20px;
  color: #33bfe8;
`;

export const FundingCategory = styled.ul`
  height: 100px;
  width: 700px;
  padding: 0px;
  list-style: none;
  margin: auto;
  text-align: center;
`;

export const CategoryItem = styled.li`
  align-items: center;
  display: inline-block;
  //border: solid 1px red;
  width: 80px;
  height: 80px;

  &:hover {
    border: solid rgb(226, 223, 223) 4px;
    border-radius: 10px;
    cursor: pointer;
  }
`;

export const FundingIcon = styled.img`
  width: 30px;
  height: 30px;
  text-align: center;
  margin-top: 13px;
`;

export const FundingIconContent = styled.div`
  text-align: center;
  padding-top: 10px;
  font-size: 10px;
`;

export const Insert = styled.div`
  text-align: right;
`;

export const FundingHr = styled.hr`
  border: solid 4px grey;
`;

export const FundingGoods = styled.div`
  border: solid rgb(226, 223, 223) 1px;
  max-width: 1000px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 4px 12px black;
  border-radius: 12px;
`;

export const PostList = styled.ul`
  list-style: none;
  padding: 0;
  margin: auto;
  text-align: center;
`;

export const PostItem = styled.li`
  padding: 15px;
  align-items: center;
  display: inline-block;
  height: 300px;
  width: 300px;

  &:hover {
    box-shadow: 2px 2px 0px 0px black;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const GoodsDiv = styled.div`
  text-align: center;
`;

export const GoodsImg = styled.img`
  width: 150px;
  height: 150px;
  text-align: center;
  margin: auto;
`;

export const GoodsContent1 = styled.div`
  padding-top: 5px;
  text-align: left;
`;

export const GoodsContent2 = styled.span`
  padding-right: 5px;
`;

export const GoodsContent3 = styled.span`
  font-weight: 700px;
  color: red;
`;
