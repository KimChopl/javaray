import styled from "styled-components";

export const SearchWrap = styled.div`
  width: 100%;
  height: 550px;
`;

export const SearchHeader = styled.div`
  width: 100%;
  height: 50px;
  text-align: center;
`;

export const SearchFish = styled.div`
  width: 375px;
  height: 400px;
  margin: 0 2.5px 0 2.5px;
`;

export const FishDiv = styled.div`
  width: 125px;
  height: 20px;
  display: inline-block;
  margin: 7px 0 7px 0;
`;

export const FishLabel = styled.label`
  width: 110px;
  height: 100%;
  margin: 0;
  padding: 0 4px 0 4px;
  font-size: 14px;
`;

export const CheckBox = styled.input.attrs({ type: "checkbox" })`
  width: 15px;
  height: 15px;
  margin: 5px 0 5px 0;
`;
