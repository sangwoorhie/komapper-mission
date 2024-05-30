import React, { useState } from "react";
import styled from "styled-components";
import ModifyModal from "./Modify";

const UserDetailModal = ({ user, onClose }) => {
  const [showModifyModal, setShowModifyModal] = useState(false); // 수정 모달 표시 상태

  // 수정 모달을 표시하는 함수
  const handleModifyClick = () => {
    setShowModifyModal(true);
  };

  return (
    <ModalBackdrop>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>사용자 정보 조회</h2>
        <br />
        <br />
        <InputContainer>
          <Label htmlFor="detailUserId">ID</Label>
          <Input type="text" id="detailUserId" value={user.id} readOnly />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="detailUserName">Name</Label>
          <Input type="text" id="detailUserName" value={user.name} readOnly />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="detailUserEmail">E-mail</Label>
          <Input
            type="email"
            id="detailUserEmail"
            value={user.email}
            readOnly
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="detailUserPhone">Phone</Label>
          <Input type="tel" id="detailUserPhone" value={user.phone} readOnly />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="detailUserOrganization">Organization</Label>
          <Input
            type="text"
            id="detailUserOrganization"
            value={user.organization}
            readOnly
          />
        </InputContainer>
        <ModalButtons>
          <Button id="modifycancelBtn" onClick={onClose}>
            Cancel
          </Button>
          <Button id="modifyBtn" onClick={handleModifyClick}>
            Modify
          </Button>
        </ModalButtons>
        {showModifyModal && (
          <ModifyModal user={user} onClose={() => setShowModifyModal(false)} />
        )}
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
  background-color: rgba(0, 0, 0, 0.8);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
  max-width: 400px;
  height: auto; /* 높이를 auto로 조정하여 내용에 맞게 조절 */
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

export default UserDetailModal;
