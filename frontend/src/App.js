import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Reset } from "styled-reset";
import {
  Footer,
  Header,
  SideBar,
  Main,
  Breadcrumb,
  ContainerBox,
  Section,
} from "./components";
// import { LogPage, UserPage } from "./pages";
import styled from "styled-components";

function App() {
  return (
    <Router>
      <Reset />
      <AppContainer>
        <Header />
        <MainStyled>
          <SideBar />
          {/* <Routes>
            <Route path="/" exact element={<UserPage />} />
            <Route path="/user" exact element={<UserPage />} />
            <Route path="/log" exact element={<LogPage />} />
          </Routes> */}
          <Section>
            <Breadcrumb></Breadcrumb>
            <Hr />
            <ContainerBox></ContainerBox>
          </Section>
        </MainStyled>
        <Footer />
      </AppContainer>
    </Router>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainStyled = styled(Main)`
  display: flex;
  flex: 1;
`;

const Hr = styled.hr`
  margin-left: 75px;
  margin-top: 20px;
  margin-bottom: -20px;
  border: 0.5px solid #d6d6d6;
  width: 1520px;
`;

export default App;
