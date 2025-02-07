import styled from "styled-components";

export const ReportTitle = styled.div`
  width: 100%;
  height: 25px;
  text-align: center;
`;

export const ReportBody = styled.div`
  width: 324px;
  height: 504px;
  margin-left: 30px;
  margin-top: 20px;
`;

export const ReportSelectCover = styled.div`
  width: 320px;
  height: 25px;
  position: relative;
`;

export const ReportSelect = styled.select`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const ReportTextareaCover = styled.div`
  width: 320px;
  height: 380px;
  position: relative;
  margin-top: 10px;
`;

export const ReportTextarea = styled.textarea`
  width: 320px;
  height: 388px;
  padding: 5px;
`;

export const BtnCover = styled.div`
  width: 320px;
  height: 60px;
  margin-top: 15px;
  position: relative;
`;

export const ReportBtnCover = styled.div`
  width: 130px;
  height: 55px;
  margin-left: 15px;
  margin-right: 15px;
  display: inline-block;
`;

export const ReportButton = styled.button`
  width: 130px;
  height: 55px;
  border: none;
  position: absolute;
  background-color: red;
  font-size: 25px;
  color: white;
  &:hover {
    background-color: #d32f2f;
    cursor: pointer;
  }
`;

export const CancelButton = styled.button`
  width: 130px;
  height: 55px;
  border: none;
  position: absolute;
  background-color: blue;
  font-size: 25px;
  color: white;
  &:hover {
    background-color: darkblue;
    cursor: pointer;
  }
`;

export const Hr = styled.hr`
  margin: 0;
  margin-top: 5px;
`;
