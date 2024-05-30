import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { RegisterButton, DeleteButton } from "./Buttons";
import DeleteModal from "../modals/Delete";
import RegisterModal from "../modals/Register";
import UserDetailModal from "../modals/UderDetail";

const ContainerBox = () => {
  const [totalCount, setTotalCount] = useState(0); // 총 개수 (유저 또는 로그)
  const location = useLocation(); // 현재 경로 가져오기
  const [userData, setUserData] = useState([]); // 유저 데이터 상태
  const [logData, setLogData] = useState([]); // 로그 데이터 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 (페이지네이션)
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수 (페이지네이션)
  const rowsPerPage = 10; // 한 페이지당 행 수
  const maxPageNum = 10; // 페이지네이션에서 보여줄 최대 페이지 번호 수
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부 상태
  const [selectedUsers, setSelectedUsers] = useState([]); // 삭제 시 유저 배열형태로 복수선택
  const [showRegisterModal, setShowRegisterModal] = useState(false); // RegisterModal 표시 여부 상태
  const [selectedUser, setSelectedUser] = useState(null); // 사용자 조회모달

  // 모달 관련 함수들
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openRegisterModal = () => setShowRegisterModal(true); // RegisterModal 열기
  const closeRegisterModal = () => setShowRegisterModal(false); // RegisterModal 닫기

  // Total Count : 현재 경로에 따라 유저 또는 로그의 총 개수를 가져옴
  useEffect(() => {
    const fetchData = async () => {
      let url = "";
      if (location.pathname === "/" || location.pathname === "/user") {
        url = "http://localhost:3000/user/count";
      } else if (location.pathname === "/log") {
        url = "http://localhost:3000/log/count";
      }

      if (url) {
        try {
          const response = await axios.get(url);
          setTotalCount(response.data); // 총 개수 설정
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [location.pathname]);

  // 전체목록 가져오기 (페이지네이션)
  // 1. 현재 경로가 "/" 또는 "/user"일 때 유저 데이터를 가져옴
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/user") {
      const fetchUserData = async (page) => {
        try {
          const response = await axios.get(
            `http://localhost:3000/user?page=${page}&pageSize=${rowsPerPage}`
          );
          setUserData(response.data.paginationTotalUsers); // 유저 데이터 설정
          setTotalPages(response.data.totalPages); // 총 페이지 수 설정
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData(currentPage);
    }
  }, [currentPage, location.pathname]);

  // 2. 현재 경로가 "/log"일 때 로그 데이터를 가져옴
  useEffect(() => {
    if (location.pathname === "/log") {
      const fetchLogData = async (page) => {
        try {
          const response = await axios.get(
            `http://localhost:3000/log?page=${page}&pageSize=${rowsPerPage}`
          );
          setLogData(response.data.paginationTotalLogs); // 로그 데이터 설정
          setTotalPages(response.data.totalPages); // 총 페이지 수 설정
        } catch (error) {
          console.error("Error fetching log data:", error);
        }
      };

      fetchLogData(currentPage);
    }
  }, [currentPage, location.pathname]);

  // 페이지네이션 페이지 변경 핸들러
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // 현재 페이지 설정
    }
  };

  // 유저 삭제 함수
  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete("http://localhost:3000/user", {
        data: { ids: selectedUsers },
      });
      console.log(response);
      alert("선택된 사용자가 삭제되었습니다.");
      closeModal();
      setSelectedUsers([]);
      location.reload();
    } catch (error) {
      alert("삭제 중 오류가 발생했습니다: " + error);
    }
  };

  // 유저 정보조회
  const handleRowClick = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/user/${userId}`);
      const user = response.data;
      setSelectedUser(user); // 선택된 사용자 업데이트
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // const handleOpenModal = () => {
  //   if (selectedUsers.length === 0) {
  //     alert("선택된 사용자가 없습니다.");
  //   } else {
  //     openModal();
  //   }
  // };

  return (
    <Container>
      <SearchBarWrapper>
        <TotalCount>
          Total :<Count> {totalCount}</Count>
        </TotalCount>
        <SearchBar>{/* 검색 기능 구현 */}</SearchBar>
      </SearchBarWrapper>
      <StyledTable>
        {location.pathname === "/" || location.pathname === "/user" ? (
          <>
            <colgroup>
              <col className="user-col1" />
              <col className="user-col2" />
              <col className="user-col3" />
              <col className="user-col3" />
              <col className="user-col3" />
              <col className="user-col3" />
            </colgroup>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    id="selectAll"
                    onChange={(e) => {
                      const checkboxes = document.querySelectorAll(
                        "#user-table-body input[type='checkbox']"
                      );
                      checkboxes.forEach((checkbox) => {
                        checkbox.checked = e.target.checked;
                      });
                    }}
                  />
                </th>
                <th>ID</th>
                <th>Name</th>
                <th>E-mail</th>
                <th>Phone</th>
                <th>Organization</th>
              </tr>
            </thead>
            <tbody id="user-table-body">
              {userData.map((user) => (
                <tr
                  key={user.id}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleRowClick(user.id)}
                >
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.organization}</td>
                </tr>
              ))}
            </tbody>
          </>
        ) : null}

        {location.pathname === "/log" ? (
          <>
            <colgroup>
              <col className="log-col1" />
              <col className="log-col2" />
              <col className="log-col3" />
              <col className="log-col4" />
            </colgroup>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>User IP</th>
                <th>User Agent</th>
              </tr>
            </thead>
            <tbody id="log-table-body">
              {logData.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{new Date(log.date).toISOString().split("T")[0]}</td>
                  <td>{log.user_ip}</td>
                  <td>{log.user_agent}</td>
                </tr>
              ))}
            </tbody>
          </>
        ) : null}
      </StyledTable>
      <PaginationWrapper center={location.pathname === "/log"}>
        <>
          {/* 삭제 버튼 */}
          {(location.pathname === "/" || location.pathname === "/user") && (
            <>
              <DeleteButton
                name="Delete"
                id="deleteUserBtn"
                onClick={openModal}
                // onClick={handleOpenModal}
              />
            </>
          )}
          {/* 삭제 모달 */}
          <DeleteModal
            show={showModal}
            onClose={closeModal}
            onDelete={handleDeleteConfirm}
            selectedUsers={selectedUsers}
          />
        </>
        <Pagination>
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {Array.from(
            { length: Math.min(maxPageNum, totalPages) },
            (_, i) => i + Math.max(1, currentPage - Math.floor(maxPageNum / 2))
          )
            .filter((page) => page <= totalPages)
            .map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? "active" : ""}
              >
                {page}
              </button>
            ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </button>
        </Pagination>
        {/* 회원가입 버튼 */}
        {(location.pathname === "/" || location.pathname === "/user") && (
          <RegisterButton name="Register" onClick={openRegisterModal} />
        )}
        {/* 회원가입 모달 */}
        <RegisterModal show={showRegisterModal} onClose={closeRegisterModal} />
      </PaginationWrapper>
      {/* 유저 상세정보 모달 */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </Container>
  );
};
const Container = styled.article`
  box-sizing: border-box;
  padding: 20px 5%;
  margin: 40px 0;
  border: 2px solid #d6d6d6;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  width: 1520px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-left: 75px;
  min-height: 800px;
`;

const TotalCount = styled.div`
  display: inline;
  float: left;
  width: 10%;
  height: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Count = styled.span`
  color: #dd7012;
  font-weight: bold;
`;

const SearchBarWrapper = styled.div`
  display: inline;
  float: right;
`;

const StyledTable = styled.table`
  box-sizing: border-box;
  clear: both;
  width: 100%;
  height: 550px;
  border-collapse: collapse;
  font-family: Arial, sans-serif;

  thead th {
    background-color: #efefef;
    font-weight: bold;
    text-align: left;
  }

  td,
  th {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #d6d6d6;
  }

  tbody tr {
    /* cursor: pointer; */
    background-color: #fff;
    height: 30px;
    text-align: left;
    border-bottom: 1px solid #d6d6d6; /* 추가: 테이블 행 간의 경계 */
  }

  tbody tr:nth-child(odd) {
    background-color: #ccc;
  }

  th {
    background-color: #efefef;
    color: black;
  }

  #user-table-body tr:hover {
    background-color: #f5f5f5;
  }

  #user-table-body td {
    text-align: left;
    height: 14px;
    padding: 15px 0;
    align-items: center;
    justify-content: center;
  }

  .user-col1 {
    width: 10%;
  }
  .user-col2 {
    width: 10%;
  }
  .user-col3 {
    width: 20%;
  }

  /* 로그 테이블 */
  #log-table-body tr:hover {
    background-color: #f5f5f5;
  }

  #log-table-body td {
    text-align: left;
    height: 14px;
    padding: 10px 0;
  }

  .log-col1 {
    width: 10%;
  }
  .log-col2 {
    width: 15%;
  }
  .log-col3 {
    width: 20%;
  }
  .log-col4 {
    width: 55%;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: ${(props) => (props.center ? "center" : "space-between")};
  align-items: center;
  margin-top: 20px;
  ${(props) => props.center && "margin-left: auto; margin-right: auto;"}
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #ffffff;
  margin: 20px 0;

  button {
    cursor: pointer;
    margin: 0 1rem;
    padding: 0.5rem 1rem;
    background: none;
    border: none;
    font-size: 1.2em;
    color: black;
    text-decoration: none;
    opacity: 0.7;
  }

  button.active {
    opacity: 1;
    background: #2387e5;
    color: white;
  }

  button:hover {
    opacity: 1;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ol {
    padding: 0;
    margin: 0 2rem;
    list-style-type: none;
    display: flex;
  }
`;

export default ContainerBox;
