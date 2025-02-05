import styled from "styled-components";

export const Sidebar = styled.div`
  width: 20%;
  background-color: #33bfe8;
  color: white;
  padding: 20px;
`;

export const SbTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #33bfe8;
`;

export const SbTitleMenu = styled.ul`
  margin-top: 20px;
  list-style: none;
  padding: 0;
`;

export const SbTitleMenuItem = styled.li`
  padding: 10px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #33bfe8;
    border-radius: 5px;
  }
`;
