import React, { useState } from "react";
import styled from "styled-components";

const ModifyModal = ({ user, onClose }) => {
  const [originalPasswordVisible, setOriginalPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    originalPassword: "",
    newPassword: "",
    newName: user.name,
    newPhone: user.phone,
    newOrganization: user.organization,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleToggleOriginalPassword = () => {
    setOriginalPasswordVisible(!originalPasswordVisible);
  };

  const handleToggleNewPassword = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

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

      if (response.ok) {
        const result = await response.text();
        alert(result);
        onClose();
        window.location.reload();
      } else {
        const responseData = await response.json();
        throw new Error(responseData.message); // 백엔드 에러메시지
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
