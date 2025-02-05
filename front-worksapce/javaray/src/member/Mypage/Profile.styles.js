import styled from "styled-components";

export const ProfileCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Nickname = styled.h3`
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #e5e7eb;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d1d5db;
  }
`;
