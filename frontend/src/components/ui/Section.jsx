import React from "react";
import styled from "styled-components";

const Section = ({ children }) => {
  return <SectionContainer>{children}</SectionContainer>;
};

const SectionContainer = styled.section`
  margin-left: 250px;
  overflow-y: auto;
  flex: 1;
`;

export default Section;
