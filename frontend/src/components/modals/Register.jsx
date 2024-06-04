import React, { useState } from "react";
import styled from "styled-components";

// RegisterModal 컴포넌트 정의, show, onClose를 props로 받음
const RegisterModal = ({ show, onClose }) => {
  // 폼 데이터를 관리하는 state
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    organization: "",
  });

  // input 값이 변경될 때 호출되는 함수
  const handleInputChange = (e) => {
    // 이벤트가 발생한 input 요소에서 id와 value 추출
    const { id, value } = e.target;
    // setFormData = formData 상태 업데이트
    setFormData((prevData) => ({
      ...prevData, // 스프레드 연산자 : 기존 상태 객체의 모든 키-값 쌍을 새로운 객체에 복사
      [id]: value, // 동적 키 할당 : 현재 입력 필드의 id를 키로 하고 value를 값으로 하는 새로운 키-값 쌍을 상태 객체에 추가하거나 업데이트
    }));
  };

  // ID 중복 확인 요청 함수
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
      // 서버 응답 성공시 메시지 반환
      if (response.ok) {
        const result = await response.text();
        alert(result);
      } else {
        // 서버 응답 실패시 메시지 반환
        const responseData = await response.json();
        throw new Error(responseData.message);
      }
    } catch (error) {
      alert(error.message);
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

  // 사용자 등록 요청 서버로 보내는 함수
  const handleRegister = async () => {
    const { userId, password, name, email, phone, organization } = formData;
    try {
      const createUserDto = {
        id: userId,
        password: password,
        name: name,
        email: email,
        phone: phone,
        organization: organization,
      };

      // 회원가입 API
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createUserDto),
      });

      // 서버 응답 메시지 반환
      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message);
      } else if (response.ok) {
        const result = await response.text();
        alert(result);
        onClose();
        // window.location.reload();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // 모달을 닫을 때 폼 데이터 초기화
  const handleClose = () => {
    setFormData({
      id: "",
      password: "",
      name: "",
      email: "",
      phone: "",
      organization: "",
    }); // 폼 데이터 초기화
    onClose(); // 기존 onClose 호출
  };

  // show가 false면 모달을 렌더링하지 않음
  if (!show) return null;

  return (
    <Modal>
      <ModalContent>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <h2>사용자 등록</h2>
        <br />
        <br />
        <InputContainer>
          <label htmlFor="userId">ID</label>
          <input
            type="text"
            id="userId"
            value={formData.userId}
            onChange={handleInputChange}
            placeholder="ID를 입력해 주세요."
          />
          <CheckButton onClick={handleCheckDuplicate}>중복확인</CheckButton>
        </InputContainer>
        <InputContainer>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            placeholder="이름을 입력해 주세요."
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="E-mail 형식에 맞게 입력해 주세요."
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="핸드폰 번호를 입력해 주세요."
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="organization">Organization</label>
          <input
            type="text"
            id="organization"
            value={formData.organization}
            onChange={handleInputChange}
            placeholder="소속을 입력해 주세요."
          />
        </InputContainer>
        <p>※ ID 및 E-mail은 회원가입 후 변경할 수 없습니다.</p>
        <ModalButtons>
          <CancelButton onClick={handleClose}>Cancel</CancelButton>
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
  padding: 4px 14px;
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
