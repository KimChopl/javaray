import styled from "styled-components";

export const AddressInputDiv = styled.div`
  width: 100%;
  height: 45px;
  margin-top: 5px;
  text-align: center;
`;

export const AddressSelect = styled.select`
  width: 15%;
  height: 100%;
  margin-left: 5%;
`;

export const AddressInput = styled.input`
  width: 50%;
  height: 100%;
  margin-left: 3%;
  padding: 0 10px 0 10px;
  display: inline-block;
`;

export const AddressBtn = styled.button`
  width: 20%;
  height: 100%;
  background-color: rgb(83, 185, 216);
  border: none;
  display: inline-block;
  &:hover {
    background-color: rgb(46, 159, 194);
    cursor: pointer;
  }
`;

export const ResultDiv = styled.div`
  width: 100%;
  height: 370px;
  overflow: auto;
`;

export const ResultPort = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  text-align: center;
  border-bottom: 1px solid gray;
`;

export const RegistBtn = styled.button`
  width: 50%;
  height: 60px;
  margin-top: 15px;
`;

export const Prot = styled.div`
  width: 25%;
  height: 25px;
  margin-left: 5%;
  display: inline-block;
`;

export const ProtAddress = styled.div`
  width: 60%;
  min-height: 25px;
  height: auto;
  margin-left: 10px;
  display: inline-block;
  font-size: 12px;
`;
