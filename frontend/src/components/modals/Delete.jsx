import React from "react";
import styled from "styled-components";

const DeleteModal = ({ show, onClose, onDelete, selectedUsers }) => {
  const handleDelete = () => {
    onDelete(selectedUsers); // 선택된 사용자 목록을 onDelete 함수에 전달하여 삭제
  };

  return (
    <ModalWrapper show={show}>
      <ModalContent>
        <CloseSpan onClick={onClose}>&times;</CloseSpan>
        <h2>사용자 삭제</h2>
        <br />
        <br />
        <ModalParagraph>
          정말 삭제하시겠습니까? 한 번 삭제하면 복구할 수 없습니다.
        </ModalParagraph>
        <ModalButtons>
          <CancelButton onClick={onClose} id="cancelDeleteBtn">
            Cancel
          </CancelButton>
          <DeleteButton onClick={handleDelete} id="confirmDeleteBtn">
            Delete
          </DeleteButton>
        </ModalButtons>
      </ModalContent>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
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
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 15%;
  position: relative;
  line-height: 1.5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
`;

const CloseSpan = styled.span`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5em;
`;

const ModalParagraph = styled.p`
  font-size: 0.9em;
  margin-bottom: 10px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 40px;
`;

const Button = styled.button`
  cursor: pointer;
  width: 60px;
  height: 25px;
`;

const CancelButton = styled(Button)``;

const DeleteButton = styled(Button)`
  background-color: #b81414;
  color: white;
`;

export default DeleteModal;
