import React, { useState } from "react";
import styled from "styled-components";

const LoginModal = ({ show, onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: formData.id,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful", data);
        alert("로그인에 성공하였습니다");
        onLoginSuccess(formData.id); // 로그인 성공 시 처리
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  if (!show) return null;

  return (
    <Modal>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>로그인</h2>
        <br />
        <br />
        <InputContainer>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            value={formData.id}
            onChange={handleInputChange}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </InputContainer>
        <ModalButtons>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <LoginButton onClick={handleLogin}>Login</LoginButton>
        </ModalButtons>
      </ModalContent>
    </Modal>
  );
};

const Modal = styled.div`
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
  p {
    font-size: 12px;
  }
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  label {
    margin-right: 10px;
    flex: 0 0 100px;
    text-align: right;
    font-size: 0.9em;
  }
  input {
    padding: 8px;
    margin-right: 10px;
    flex: 3;
  }
  input::placeholder {
    font-size: 0.75em;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 40px;
`;

const CancelButton = styled.button`
  cursor: pointer;
`;

const LoginButton = styled.button`
  background-color: #002b49;
  color: white;
  cursor: pointer;
`;

export default LoginModal;
