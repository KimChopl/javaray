import styled from "styled-components";

export const CalTable = styled.table`
  width: 350px;
  height: 350px;
  text-align: center;
  margin: auto;
  border: 1px solid #eaeaea;
`;

export const CalMonth = styled.th`
  text-align: center;
`;

export const CalDay = styled.th`
  border: 1px solid gray;
`;

export const CalDayWeekend = styled.th`
  text-align: center;
  color: red;
  border: 1px solid gray;
`;

export const CalWeekend = styled.div`
  text-align: center;
  color: red;
`;

export const CalWeekday = styled.div`
  text-align: center;
`;

export const CalTd = styled.td`
  border: 1px solid gray;
`;

export const GrayTd = styled.td`
  border: 1px solid gray;
  background-color: lightgray;
`;

export const CalPreOrNext = styled.button`
  margin: 0;
  padding: 0;
  background-color: white;
  border: 0;
`;

export const GrayWeekEnd = styled.div`
  text-align: center;
  color: darkred;
`;

export const GrayWeekday = styled.div`
  text-align: center;
  color: gray;
`;
