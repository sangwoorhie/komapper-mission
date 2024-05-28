import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Footer,
  Header,
  SideBar,
  Delete,
  Inquiry,
  Modify,
  Register,
  Breadcrumb,
  Button,
  SearchBar,
  TextInput,
  Pagination,
  Table,
} from "./components";
import { LogPage, UserPage } from "./pages";
import styled from "styled-components";

function App() {
  return (
    <Router>
      <Header />
      <Main>
        <SideBar />
        <Routes>
          <Route path="/" exact element={<UserPage />} />
          <Route path="/user" exact element={<UserPage />} />
          <Route path="/log" exact element={<LogPage />} />
        </Routes>
      </Main>
      <Footer />
    </Router>
  );
}

const Main = styled.main`
  display: flex;
  flex: 1;
`;

export default App;
