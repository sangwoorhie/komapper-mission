import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// SearchBar (검색창) 컴포넌트 정의
const SearchBar = () => {
  const location = useLocation(); // 현재 경로를 가져오는 Hook

  useEffect(() => {
    // 로그 검색 입력란과 유저 검색 입력란 가져오기
    const logSearchInput = document.getElementById("log-searchInput");
    const userSearchInput = document.getElementById("user-searchInput");

    // 현재 경로에 따라 검색 입력란의 표시 여부 설정
    // 경로가 "/log"인 경우
    if (location.pathname === "/log") {
      if (userSearchInput) userSearchInput.style.display = "none";
      if (logSearchInput) logSearchInput.style.display = "block";
      // 경로가 "/" 또는 "/user"인 경우
    } else if (location.pathname === "/" || location.pathname === "/user") {
      if (logSearchInput) logSearchInput.style.display = "none";
      if (userSearchInput) userSearchInput.style.display = "block";
    }
    // location이 변경될 때마다 (경로가 변경될 때마다) 실행
  }, [location]);

  // 검색버튼 클릭 시 실행되는 함수
  const handleSearch = () => {
    const searchInput =
      location.pathname === "/log"
        ? document.getElementById("log-searchInput").value.trim() // 로그 검색 입력란의 값을 가져오기
        : document.getElementById("user-searchInput").value.trim(); // 유저 검색 입력란의 값을 가져오기

    // 검색어가 비어있지 않은 경우 해당 경로에 따라 검색 함수 노출
    if (searchInput !== "") {
      if (location.pathname === "/log") {
        searchLog(searchInput); // 로그 검색함수 호출
      } else if (location.pathname === "/" || location.pathname === "/user") {
        searchUser(searchInput); // 유저 검색함수 호출
      }
    } else {
      alert("ID를 입력하세요.");
    }
  };

  // Enter 키 입력시 검색 실행되는 함수
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(); // 검색함수 호출
    }
  };

  // 로그 검색 시 호출되는 함수
  const searchLog = async (searchInput) => {
    try {
      const response = await fetch(`http://localhost:3000/log/${searchInput}`);
      const log = await response.json();

      if (!response.ok) {
        console.log("log.message", log.message);
        throw new Error(log.message);
      }

      // 검색 결과 테이블에 검색된 로그 추가
      const logTableBody = document.getElementById("log-table-body");
      logTableBody.innerHTML = "";

      // 검색된 로그의 정보를 테이블에 추가
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

  // 유저 검색 시 호출되는 함수
  const searchUser = async (searchInput) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${searchInput}`);
      const user = await response.json();

      if (!response.ok) {
        console.log("user.message", user.message);
        throw new Error(user.message);
      }

      // 검색 결과 테이블에 검색된 유저 추가
      const userTableBody = document.getElementById("user-table-body");
      userTableBody.innerHTML = "";

      // 검색된 유저의 정보를 테이블에 추가
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
        {/* 검색 버튼 */}
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
