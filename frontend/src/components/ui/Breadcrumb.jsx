import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

// Breadcrumb 컴포넌트 정의
const Breadcrumb = () => {
  const location = useLocation(); // 현재 경로를 가져오는 Hook
  const path = location.pathname; // 현재 경로를 변수에 저장

  // 첫번째와 두번째 브래드크럼 초기화
  let firstBreadcrumb = "";
  let secondBreadcrumb = "";

  // 경로가 "/" 또는 "/user"일 경우
  if (path === "/" || path === "/user") {
    firstBreadcrumb = "Users";
    secondBreadcrumb = "Mission ＞ Users";
    // 경로가 "log"일 경우
  } else if (path === "/log") {
    firstBreadcrumb = "Logs";
    secondBreadcrumb = "Mission ＞ Logs";
  }

  return (
    <Container>
      <div className="breadcrumb">
        <div className="first-breadcrumb">{firstBreadcrumb}</div>
        <div className="second-breadcrumb">{secondBreadcrumb}</div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .breadcrumb {
    margin-top: 30px;
  }

  .first-breadcrumb {
    margin-left: 75px;
    font-size: 32px;
    font-weight: bold;
    margin-right: 15px;
  }

  .second-breadcrumb {
    font-size: 14px;
    color: gray;
  }

  .first-breadcrumb,
  .second-breadcrumb {
    display: inline;
  }
`;

export default Breadcrumb;
