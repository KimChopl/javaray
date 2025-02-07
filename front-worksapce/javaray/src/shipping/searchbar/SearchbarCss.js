import styled from "styled-components";

export const SearchCover = styled.div`
  width: 1200px;
  height: 150px;
  align: center;
`;
export const SearchMainCover = styled.div`
  width: 700px;
  height: 50px;
  margin-left: 300px;
`;

export const SearchInnerCover = styled.div`
  width: 100px;
  height: 50px;
  display: inline-block;
  position: relative;
`;

export const SearchSelect = styled.select`
  width: 100px;
  height: 50px;
  position: absolute;
`;

export const SearchBtn = styled.button`
  width: 100px;
  height: 100%;
  background-color: #87ceeb;
  border: none;
  position: absolute;
  cursor: pointer;
  &:hover {
    background-color: #73bad7;
  }
`;

export const SearchInputCover = styled.div`
  width: 500px;
  height: 50px;
  display: inline-block;
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 25px;
  padding: 0;
  position: absolute;
  padding-left: 30px;
`;
