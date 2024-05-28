import React from "react";
import styled from "styled-components";
import logo from "../../assets/kmplogo_fit.png";

const Header = () => {
  return (
    <HeaderContainer>
      <header className="nav-center">
        <img src={logo} alt="logo" />
      </header>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.nav`
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 0.5px solid #d6d6d6;
  z-index: 1000;

  img {
    margin-top: 5px;
    margin-left: 20px;
    max-width: 40%;
    max-height: 40%;
  }
`;

export default Header;
