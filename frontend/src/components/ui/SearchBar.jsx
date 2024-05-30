import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const location = useLocation();

  useEffect(() => {
    const logSearchInput = document.getElementById("log-searchInput");
    const userSearchInput = document.getElementById("user-searchInput");

    if (location.pathname === "/log") {
      if (userSearchInput) userSearchInput.style.display = "none";
      if (logSearchInput) logSearchInput.style.display = "block";
    } else {
      if (logSearchInput) logSearchInput.style.display = "none";
      if (userSearchInput) userSearchInput.style.display = "block";
    }
  }, [location]);

  const handleSearch = () => {
    const searchInput =
      location.pathname === "/log"
        ? document.getElementById("log-searchInput").value.trim()
        : document.getElementById("user-searchInput").value.trim();

    if (searchInput !== "") {
      if (location.pathname === "/log") {
        searchLog(searchInput);
      } else {
        searchUser(searchInput);
      }
    } else {
      alert("ID를 입력하세요.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const searchLog = async (searchInput) => {
    try {
      const response = await fetch(`http://localhost:3000/log/${searchInput}`);
      const log = await response.json();

      if (!response.ok) {
        console.log("log.message", log.message);
        throw new Error(log.message);
      }

      if (typeof log === "string") {
        alert(log);
        return;
      }

      const logTableBody = document.getElementById("log-table-body");
      logTableBody.innerHTML = "";

      const date = new Date(log.date);
      const formattedDate = date.toISOString().split("T")[0];

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${log.id}</td>
        <td>${formattedDate}</td>
        <td>${log.user_ip}</td>
        <td>${log.user_agent}</td>
      `;
      logTableBody.appendChild(row);
    } catch (error) {
      console.error("에러 발생:", error);
      alert(`에러 발생: ${error.message}`);
    }
  };

  const searchUser = async (searchInput) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${searchInput}`);
      const user = await response.json();

      if (!response.ok) {
        console.log("user.message", user.message);
        throw new Error(user.message);
      }

      const userTableBody = document.getElementById("user-table-body");
      userTableBody.innerHTML = "";

      const row = document.createElement("tr");
      row.innerHTML = `
        <td><input type="checkbox" /></td>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.organization}</td>
      `;
      userTableBody.appendChild(row);
    } catch (error) {
      console.log("에러 발생:", error);
      alert(`에러 발생: ${error.message}`);
    }
  };

  return (
    <SearchBarContainer>
      <SearchBox>
        <Input
          id="log-searchInput"
          type="text"
          placeholder="조회할 로그 ID를 입력하세요."
          onKeyDown={handleKeyPress}
        />
        <Input
          id="user-searchInput"
          type="text"
          placeholder="조회할 유저 ID를 입력하세요."
          onKeyDown={handleKeyPress}
          style={{ display: "none" }} // 초기에는 user-searchInput 숨김
        />
        <SearchButton onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </SearchButton>
      </SearchBox>
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div`
  height: 20px;
  float: right;
  margin-top: 30px;
  margin-bottom: 30px;
  box-sizing: border-box;
`;

const SearchBox = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: -30px;
`;

const SearchButton = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  right: 0;
  left: 280px;
  font-size: 1.5em;
  cursor: pointer;
`;

const Input = styled.input`
  width: 300px;
  height: 30px;
  font-size: 16px;
  margin-left: 0;
  border: solid 1px rgba(0, 0, 0, 0.8);
  padding: 6px;
`;

export default SearchBar;
