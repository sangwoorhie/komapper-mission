import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      Copyright &copy; {new Date().getFullYear()} ㈜KO-MAPPER Co.,Ltd rights
      reserved.
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  width: 100%;
  height: 80px;
  background-color: #efefef;
  box-sizing: border-box;
  border: 1px solid #d6d6d6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-top: auto;
  z-index: 1000;
`;

export default Footer;
