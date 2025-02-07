import styled from "styled-components";

export const ModalWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 40%;
  width: 400px;
  height: 600px;
  padding: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 1px 2px 5px 0 rgba(34, 36, 38, 0.15);
  transform: translateY(-50%);
`;

export const ModalHeader = styled.div`
  width: 100%;
  height: 50px;
  text-align: center;
`;

export const CloseDiv = styled.div`
  width: 25px;
  height: 25px;
  margin-left: 355px;
  &:hover {
    cursor: pointer;
  }
`;

export const ReportTitle = styled.div`
  width: 100%;
  height: 25px;
`;

export const CloseImg = styled.img`
  width: 100%;
  height: 100%;
`;
