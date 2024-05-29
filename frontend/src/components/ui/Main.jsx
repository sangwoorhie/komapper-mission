import React from "react";
import styled from "styled-components";

const Main = ({ children }) => {
  return <MainContainer>{children}</MainContainer>;
};

const MainContainer = styled.main`
  flex: 1;
  display: flex;
`;

export default Main;
