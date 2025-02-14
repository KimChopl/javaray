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
    outline: solid 4px rgb(226, 223, 223);
    border-radius: 10px;
    cursor: pointer;
  }
`;

export const FundingIcon = styled.img`
  width: 40px;
  height: 40px;
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

export const GoodsInsert = styled.span`
  border: solid 1px #33bfe8;
  background-color: #33bfe8;
  color: white;
  border-radius: 5px;
  padding: 5px;

  &:hover {
    box-shadow: 2px 2px 0px 0px black;
    cursor: pointer;
  }
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
  &:hover {
    background-image: url("hu.wiki/i/pNmqGhmQWMeYWsRW7hTEnMrArDksFnC_0b31GBjW5cuy0cWxrkHRj-CStWqt3PXN48g6fO4oC_kXqMlumaJEJw.gif");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: bottom;
  }
`;

export const PostItem = styled.li`
  padding: 15px;
  align-items: center;
  display: inline-block;
  height: 300px;
  width: 300px;

  &:hover {
    box-shadow: 2px 1px 1px 3px rgba(0, 179, 40, 0.2),
      3px 2px 2px 2px rgba(0, 179, 80, 0.4),
      4px 3px 3px 1px rgba(0, 179, 120, 0.6),
      5px 4px 4px 0px rgba(0, 179, 160, 0.8),
      6px 5px 5px 0px rgba(0, 179, 200, 1);
    border-radius: 5px;
    cursor: url("https://mblogthumb-phinf.pstatic.net/20110919_190/minarigirl_1316419836624mhgQK_PNG/Nemo_%282%29.png?type=w420"),
      auto;
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

export const GoodsContent = styled.div`
  padding-top: 10px;
  text-align: left;
  font-weight: 700;
  font-size: 20px;
  color: lightcoral;
`;

export const GoodsContent1 = styled.div`
  padding-top: 10px;
  text-align: left;
  font-weight: 400;
`;

export const GoodsContent2 = styled.span`
  padding-left: 5px;
  padding-right: 5px;
  margin-right: 5px;
  border: solid 1px lightgrey;
  background-color: lightgrey;
  border-radius: 5px;
`;

export const GoodsContent3 = styled.span`
  font-weight: 700;
  color: lightcoral;

  &:hover {
    color: red;
  }
`;
