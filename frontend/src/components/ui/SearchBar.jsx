import React from "react";
import styled from "styled-components";

const SearchBar = ({ onSearch }) => {
  const handleSearch = () => {
    const searchInput = document.getElementById("log-searchInput").value.trim();
    if (searchInput !== "") {
      onSearch(searchInput);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <SearchBarContainer>
      <SearchBox>
        <Input
          id="log-searchInput"
          type="text"
          placeholder="조회할 로그 ID를 입력하세요."
          onKeyPress={handleKeyPress}
        />
        <SearchButton onClick={handleSearch}>
          <i className="fa-solid fa-search"></i>
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
`;

const SearchButton = styled.div`
  display: flex;
  position: absolute;
  top: 5px;
  right: 0;
  left: 20px;
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
