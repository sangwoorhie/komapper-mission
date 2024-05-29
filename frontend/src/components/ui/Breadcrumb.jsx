import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Breadcrumb = () => {
  const location = useLocation();
  const path = location.pathname;

  let firstBreadcrumb = "";
  let secondBreadcrumb = "";

  if (path === "/" || path === "/user") {
    firstBreadcrumb = "Users";
    secondBreadcrumb = "Mission ＞ Users";
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
