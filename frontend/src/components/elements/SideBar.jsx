import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faDoorOpen } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  const location = useLocation(); // 현재 경로를 가져오는 Hook
  const [activePath, setActivePath] = useState(location.pathname); // 현재 경로를 상태로 관리

  // 경로가 변경될 때마다 activePath 상태를 업데이트
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  return (
    <SideBarContainer>
      <nav>
        <ul>
          <li className="first-sidebar">Mission</li>{" "}
          {/* 고정된 첫 번째 사이드바 항목 */}
          <Link to="/user" onClick={() => setActivePath("/user")}>
            <li
              className={`sidebar-item ${activePath === "/user" ? "active" : ""}`}
            >
              <Icon icon={faUsers} />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/log" onClick={() => setActivePath("/log")}>
            <li
              className={`sidebar-item ${activePath === "/log" ? "active" : ""}`}
            >
              <Icon icon={faDoorOpen} />
              <span>Logs</span>
            </li>
          </Link>
        </ul>
      </nav>
    </SideBarContainer>
  );
};

// 스타일드 컴포넌트를 사용하여 스타일 정의
const SideBarContainer = styled.div`
  nav {
    width: 250px;
    background-color: #3c4b64;
    height: calc(100vh - 160px);
    position: absolute;
    top: 80px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .first-sidebar {
    width: 250px;
    height: 100px;
    background-color: #303c54;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 30px;
    font-weight: bold;
  }

  .sidebar-item {
    width: 250px;
    height: 54px;
    background-color: #3c4b64;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 16px;
    box-sizing: border-box;
    padding: 10px;
    cursor: pointer;
    flex-direction: row;
  }

  .sidebar-item:hover,
  .sidebar-item.active {
    background-color: #798291;
  }

  a:link,
  a:visited,
  a:active {
    color: white;
    text-decoration: none;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

export default SideBar;
