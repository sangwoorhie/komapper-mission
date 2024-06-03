import React, { useState } from "react";
import styled from "styled-components";

// ModifyModal 컴포넌트 정의, user, onClose를 props로 받음
const ModifyModal = ({ user, onClose }) => {
  // 비밀번호 숨김/보이기 상태를 관리하는 state
  const [originalPasswordVisible, setOriginalPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  // 폼데이터를 관리하는 state (초기 state)
  const [formData, setFormData] = useState({
    originalPassword: "",
    newPassword: "",
    newName: user.name,
    newPhone: user.phone,
    newOrganization: user.organization,
  });

  // input 값이 변경될 때 호출되는 함수
  const handleInputChange = (e) => {
    // 이벤트가 발생한 input 요소에서 name과 value 추출
    const { name, value } = e.target;
    // setFormData = formData 상태 업데이트
    setFormData((prevData) => ({
      ...prevData, // 스프레드 연산자 : 기존 상태 객체의 모든 키-값 쌍을 새로운 객체에 복사
      [name]: value, // 동적 키 할당 : 현재 입력 필드의 name을 키로 하고 value를 값으로 하는 새로운 키-값 쌍을 상태 객체에 추가하거나 업데이트
    }));
  };

  // 기존 비밀번호 가시성을 토글하는 함수
  const handleToggleOriginalPassword = () => {
    setOriginalPasswordVisible(!originalPasswordVisible);
  };

  // 새 비밀번호 가시성을 토글하는 함수
  const handleToggleNewPassword = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  // 사용자 정보 수정 시 호출되는 함수
  const handleSubmit = async () => {
    try {
      const {
        originalPassword,
        newPassword,
        newName,
        newPhone,
        newOrganization,
      } = formData;
      // 정보 수정 요청 보내기
      const response = await fetch(`http://localhost:3000/user/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: originalPassword,
          newPassword: newPassword,
          name: newName,
          phone: newPhone,
          organization: newOrganization,
        }),
      });

      // 서버 응답 성공시 메시지 반환
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

  return (
    <ModalBackdrop>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>사용자 정보 수정</h2>
        <br />
        <br />
        <InputContainer>
          <Label htmlFor="originalPassword">Password</Label>
          <Input
            type={originalPasswordVisible ? "text" : "password"}
            id="originalPassword"
            name="originalPassword"
            placeholder="기존 비밀번호를 입력해 주세요."
            value={formData.originalPassword}
            onChange={handleInputChange}
          />
          <ToggleButton onClick={handleToggleOriginalPassword}>
            {originalPasswordVisible ? "Hide" : "Show"}
          </ToggleButton>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            type={newPasswordVisible ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            placeholder="변경할 비밀번호를 입력해 주세요."
            value={formData.newPassword}
            onChange={handleInputChange}
          />
          <ToggleButton onClick={handleToggleNewPassword}>
            {newPasswordVisible ? "Hide" : "Show"}
          </ToggleButton>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="newName">Name</Label>
          <Input
            type="text"
            id="newName"
            name="newName"
            placeholder="변경할 이름을 입력해 주세요."
            value={formData.newName}
            onChange={handleInputChange}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="newPhone">Phone</Label>
          <Input
            type="tel"
            id="newPhone"
            name="newPhone"
            placeholder="핸드폰 번호를 입력해 주세요."
            value={formData.newPhone}
            onChange={handleInputChange}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="newOrganization">Organization</Label>
          <Input
            type="text"
            id="newOrganization"
            name="newOrganization"
            placeholder="변경할 소속을 입력해 주세요."
            value={formData.newOrganization}
            onChange={handleInputChange}
          />
        </InputContainer>
        <ModalButtons>
          <Button onClick={onClose}>Back</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </ModalButtons>
      </ModalContent>
    </ModalBackdrop>
  );
};

const ModalBackdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0);
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
`;

const Label = styled.label`
  margin-right: 10px;
  flex: 0 0 100px;
  text-align: right;
  font-size: 0.9em;
`;

const Input = styled.input`
  padding: 8px;
  margin-right: 10px;
  flex: 3;
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

const Button = styled.button`
  flex-grow: 0;
  cursor: pointer;
  width: 60px;
  height: 25px;
  &:first-child {
    background-color: transparent;
    color: black;
  }
  &:last-child {
    margin-left: auto;
    color: white;
    background-color: #002b49;
  }
`;

export default ModifyModal;
