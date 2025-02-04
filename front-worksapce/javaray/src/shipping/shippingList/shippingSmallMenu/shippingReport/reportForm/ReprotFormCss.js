import styled from "styled-components";

export const ReportTitle = styled.div`
  width: 100%;
  height: 25px;
`;

export const CloseImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const ReportBody = styled.div`
  width: 100%;
  height: 575px;
`;

export const ReportSelectCover = styled.div`
  width: 320px;
  height: 25px;
  position: relative;
  margin-left: 40px;
  margin-top: 20px;
`;

export const ReportSelect = styled.select`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const ReportTextareaCover = styled.div`
  width: 320px;
  height: 400px;
  position: relative;
  padding-left: 40px;
  padding-top: 10px;
`;

export const ReportTextarea = styled.textarea`
  width: 308px;
  height: 388px;
  padding: 5px;
`;

export const BtnCover = styled.div`
  width: 320px;
  height: 60px;
  padding-top: 15px;
  padding-left: 40px;
  position: relative;
`;

export const ReportBtnCover = styled.div`
  width: 130px;
  height: 60px;
  padding-left: 15px;
  padding-right: 15px;
  display: inline-block;
`;

export const ReportButton = styled.button`
  width: 130px;
  height: 60px;
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
  height: 60px;
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
