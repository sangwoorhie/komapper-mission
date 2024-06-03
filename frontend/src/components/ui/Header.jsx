import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/kmplogo_fit.png";
import LoginModal from "../modals/Login";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [userId, setUserId] = useState(""); // 사용자 ID 저장

  const loginModal = () => {
    setShowModal(!showModal);
  };

  const handleLoginSuccess = (id, accessToken) => {
    localStorage.setItem("accessToken", accessToken); // 로그인 성공 시 accessToken 저장
    setIsLoggedIn(true);
    setUserId(id);
    setShowModal(false); // 로그인 성공 시 모달 닫기
  };

  const handleLogout = () => {
    alert("로그아웃 되었습니다"); // 사용자에게 로그아웃 알림 표시
    localStorage.removeItem("accessToken"); // accessToken 삭제
    setIsLoggedIn(false);
    setUserId("");
  };

  return (
    <HeaderContainer>
      <header className="nav-center">
        <img src={logo} alt="logo" />
      </header>
      <AuthContainer>
        {isLoggedIn && <span>반갑습니다, {userId}님!</span>}
        {isLoggedIn ? (
          <LoginButton onClick={handleLogout}>Logout</LoginButton>
        ) : (
          <LoginButton onClick={loginModal}>Login</LoginButton>
        )}
      </AuthContainer>
      <LoginModal
        show={showModal}
        onClose={loginModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.nav`
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 자식 요소 간의 공간을 균등하게 배분 */
  box-sizing: border-box;
  border: 0.5px solid #d6d6d6;
  z-index: 1000;
  padding: 0 30px; /* 좌우 패딩 추가 */

  img {
    margin-top: 5px;
    max-width: 20%;
    max-height: 20%;
  }
`;

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px; /* 로그인 상태와 버튼 사이의 거리 */
`;

const LoginButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  font-weight: bold;
  font-size: 1rem;
  color: black;
  transition:
    color 0.3s ease,
    text-decoration 0.3s ease; /* 부드러운 전환 효과 */

  &:hover {
    color: blue;
    text-decoration: underline;
  }
`;

export default Header;
