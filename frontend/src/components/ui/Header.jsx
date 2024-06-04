import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../../assets/kmplogo_fit.png";
import LoginModal from "../modals/Login";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [userId, setUserId] = useState(""); // 사용자 ID 저장

  useEffect(() => {
    // 컴포넌트가 마운트 될 때 localStorage에서 accessToken을 확인
    const accessToken = localStorage.getItem("accessToken");

    // accessToken이 존재하면 로그인 상태를 true로 설정하고 userId를 설정
    if (accessToken) {
      fetchUserId(accessToken).then((id) => {
        setIsLoggedIn(true);
        setUserId(id);
      });
    }
  }, []);

  const loginModal = () => {
    setShowModal(!showModal);
  };

  // 로그인
  const handleLoginSuccess = (accessToken) => {
    // id 매개변수 제거
    localStorage.setItem("accessToken", accessToken); // 로그인 성공 시 accessToken 저장

    // 서버로부터 userId를 가져오는 함수 호출
    fetchUserId(accessToken).then((userId) => {
      // 여기서 받는 변수를 id에서 userId로 변경
      setIsLoggedIn(true);
      setUserId(userId); // 함수 호출 결과로 받은 userId 사용
      setShowModal(false); // 로그인 성공 시 모달 닫기
    });
  };

  // 로그아웃
  const handleLogout = () => {
    alert("로그아웃 되었습니다."); // 사용자에게 로그아웃 알림 표시
    localStorage.removeItem("accessToken"); // accessToken 삭제
    setIsLoggedIn(false);
    setUserId("");
    window.location.reload();
  };

  // 서버로부터 userId를 가져오는 함수
  const fetchUserId = async (accessToken) => {
    try {
      const response = await fetch("http://localhost:3000/user/status", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user ID");
      }

      const data = await response.json();
      const userId = data.userId;
      console.log("userId", userId);
      return userId;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      return "";
    }
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
