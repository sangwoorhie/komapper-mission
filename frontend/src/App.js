import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Routes,
} from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Header />
      <SideBar />
      <Routes>
        <Route path="/" exact element={<UserPage />} />
        <Route path="/user" exact element={<UserPage />} />
        <Route path="/log" exact element={<LogPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
