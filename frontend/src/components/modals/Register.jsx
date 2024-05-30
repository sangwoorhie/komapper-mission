import React, { useState } from "react";
import styled from "styled-components";

const RegisterModal = ({ show, onClose, onRegister }) => {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    organization: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCheckDuplicate = async () => {
    const { userId } = formData;
    try {
      const response = await fetch("http://localhost:3000/user/idcheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });
      if (response.ok) {
        const result = await response.text();
        alert(result);
      } else {
        const responseData = await response.json();
        throw new Error(responseData.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleTogglePassword = () => {
    const passwordInput = document.getElementById("password");
    const toggleButton = document.getElementById("togglePassword");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleButton.textContent = "Hide";
    } else {
      passwordInput.type = "password";
      toggleButton.textContent = "Show";
    }
  };

  const handleRegister = async () => {
    try {
      const createUserDto = {
        id: formData.userId,
        password: formData.password,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
      };

      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createUserDto),
      });

      if (response.ok) {
        const result = await response.text();
        alert(result);
        onClose();
        window.location.reload();
      } else {
        const responseData = await response.json();
        throw new Error(responseData.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (!show) return null;

  return (
    <Modal>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>사용자 등록</h2>
        <InputContainer>
          <label htmlFor="userId">ID</label>
          <input
            type="text"
            id="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="ID를 입력해 주세요."
          />
          <CheckButton onClick={handleCheckDuplicate}>중복 확인</CheckButton>
        </InputContainer>
        <InputContainer>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해 주세요."
          />
          <ToggleButton id="togglePassword" onClick={handleTogglePassword}>
            Show
          </ToggleButton>
        </InputContainer>
        <InputContainer>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="이름을 입력해 주세요."
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail 형식에 맞게 입력해 주세요."
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="핸드폰 번호를 입력해 주세요."
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="organization">Organization</label>
          <input
            type="text"
            id="organization"
            value={formData.organization}
            onChange={handleChange}
            placeholder="소속을 입력해 주세요."
          />
        </InputContainer>
        <p>※ ID 및 E-mail은 회원가입 후 변경할 수 없습니다.</p>
        <ModalButtons>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <RegisterButton onClick={handleRegister}>Register</RegisterButton>
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

const CheckButton = styled.button`
  padding: 3px 5px;
  cursor: pointer;
`;

const ToggleButton = styled.button`
  padding: 3px 5px;
  cursor: pointer;
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

const RegisterButton = styled.button`
  background-color: #002b49;
  color: white;
  cursor: pointer;
`;

export default RegisterModal;
