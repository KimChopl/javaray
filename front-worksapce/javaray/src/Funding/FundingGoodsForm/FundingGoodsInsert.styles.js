import styled from "styled-components";

export const ContainerDiv = styled.div`
  width: 1200px;
  height: 100%;
  margin: 0px 5px;
`;

export const Container = styled.div`
  width: 600px;
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: inline-block;
  @media (max-width: 768px) {
    margin: 20px;
    padding: 20px;
  }
`;

export const Title = styled.h2`
  text-align: center;
  color: #333333;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  color: #555555;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 12px 15px;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background: rgba(255, 255, 255, 0);

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
    outline: none;
  }
`;

export const FileInput = styled.input`
  margin-bottom: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #33bfe8;
  color: #ffffff;
  border: none;
  border-radius: 7px;
  font-size: 16px;
  cursor: pointer;
  align-self: flex-end;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: rgb(38, 126, 153);
    transform: translateY(-2px);
  }

  &:active {
    background-color: rgb(37, 122, 148);
    transform: translateY(0);
  }
`;

export const TextArea = styled.textarea`
  padding: 12px 15px;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  resize: none;
  background: rgba(255, 255, 255, 0);

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
    outline: none;
  }
`;
