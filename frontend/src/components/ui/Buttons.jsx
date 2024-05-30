import React from "react";
import styled from "styled-components";

// 삭제 버튼
const DeleteButton = ({ onClick }) => {
  return (
    <DeleteButtonWrapper>
      <button onClick={onClick} id="delete-button">
        Delete
      </button>
    </DeleteButtonWrapper>
  );
};

// 회원가입 버튼
const RegisterButton = ({ onClick }) => {
  return (
    <RegisterButtonWrapper>
      <button onClick={onClick} id="register-button">
        Register
      </button>
    </RegisterButtonWrapper>
  );
};

// 회원정보 수정 버튼
const ModifyButton = ({ onClick }) => {
  return (
    <ModifyButtonWrapper>
      <button onClick={onClick} id="modify-button">
        Modify
      </button>
    </ModifyButtonWrapper>
  );
};

const DeleteButtonWrapper = styled.div`
  width: 5%;
  height: 50px;
  float: left;
  margin-top: 25px;

  button {
    cursor: pointer;
  }
`;

const RegisterButtonWrapper = styled.div`
  width: 5%;
  height: 50px;
  float: right;
  margin-top: 25px;

  button {
    cursor: pointer;
    background-color: #002b49;
    color: white;
  }
`;

const ModifyButtonWrapper = styled.div`
  width: 5%;
  height: 50px;
  float: left;
  margin-top: 25px;

  button {
    cursor: pointer;
  }
`;

export { RegisterButton, DeleteButton, ModifyButton };
