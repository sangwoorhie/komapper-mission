import React, { useState } from "react";
import styled from "styled-components";

// LoginModal 컴포넌트 정의, show, onClose, onLoginSuccess를 props로 받음
const LoginModal = ({ show, onClose, onLoginSuccess }) => {
  // 폼 데이터를 관리하는 state
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  // input 값이 변경될 때 호출되는 함수
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // setFormData = formData 상태 업데이트
    setFormData((prevData) => ({
      ...prevData, // 스프레드 연산자 : 기존 상태 객체의 모든 키-값 쌍을 새로운 객체에 복사
      [id]: value, // 동적 키 할당 : 현재 입력 필드의 id를 키로 하고 value를 값으로 하는 새로운 키-값 쌍을 상태 객체에 추가하거나 업데이트
    }));
  };

  // 로그인 요청
  const handleLogin = async () => {
    const { id, password } = formData;
    try {
      const loginDto = {
        id: id,
        password: password,
      };

      // 로그인 API
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDto),
      });

      // 서버 응답 메시지 반환
      if (response.ok) {
        onLoginSuccess(formData.id);
        const result = await response.text();
        alert("로그인에 성공하였습니다.", result);
        onClose();
      } else {
        const responseData = await response.json();
        alert("로그인에 실패하였습니다.", responseData);
        throw new Error(responseData.message);
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  // 비밀번호 입력 필드 가시성 토글
  const handleTogglePassword = () => {
    const passwordInput = document.getElementById("password");
    const toggleButton = document.getElementById("togglePassword");

    // 비밀번호 입력 필드를 text로 변경하여 비밀번호를 보이게 함
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleButton.textContent = "Hide";
    } else {
      passwordInput.type = "password";
      toggleButton.textContent = "Show";
    }
  };

  // 모달을 닫을 때 폼 데이터 초기화
  const handleClose = () => {
    setFormData({ id: "", password: "" }); // 폼 데이터 초기화
    onClose(); // 기존 onClose 호출
  };

  // show가 false면 모달을 렌더링하지 않음
  if (!show) return null;

  return (
    <Modal>
      <ModalContent>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
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
          <ToggleButton id="togglePassword" onClick={handleTogglePassword}>
            Show
          </ToggleButton>
        </InputContainer>
        <ModalButtons>
          <CancelButton onClick={handleClose}>Cancel</CancelButton>
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

const ToggleButton = styled.button`
  padding: 4px 10px;
  cursor: pointer;
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
