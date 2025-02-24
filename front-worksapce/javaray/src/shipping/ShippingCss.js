import styled from "styled-components";

export const ListCover = styled.div`
  width : 1200px;
  height : auto;
  min-hieght : 400px
`

export const StyledShipWarp = styled.div`
  width: 1200px;
  height: auto;
  margin: auto;
  min-height: 800px;
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: block;
`;

export const InsertDiv = styled.div`
  width: 100%;
  height: 50px;
  align-items: right;
  text-align: right;
`;

export const InsertBtn = styled.button`
  width: 80px;
  height: 50px;
  margin: 0;
  padding: 0;
  background-color: rgb(83, 185, 216);
  border: none;
  &:hover {
    background-color: rgb(46, 159, 194);
    cursor: pointer;
  }
`;
