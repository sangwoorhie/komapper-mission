import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Users");
  }

  async getHtml() {
    return `
    <div class="breadcrumb">
    <div id="first-breadcrumb">Users</div>
    <div id="second-breadcrumb">Mission > Users</div>
  </div>
  <hr />
  <div id="inner-box">
        <div class="search-nav">
          <div id="total-users" class="total-users">Total:</div>
          <div id="search-container">
            <div id="search-box">
              <input
                type="text"
                id="searchInput"
                placeholder=" 조회할 유저 ID를 입력하세요."
              />
              <div id="magnifier">
                <i class="fa-solid fa-search" id="search-button"></i>
              </div>
            </div>
          </div>
        </div>
        <br />
        <table id="my-table">
          <colgroup>
            <col class="col1" />
            <col class="col2" />
            <col class="col3" />
            <col class="col3" />
            <col class="col3" />
            <col class="col3" />
          </colgroup>
          <thead>
            <tr>
              <th><input type="checkbox" id="selectAll" /></th>
              <th>ID</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Phone</th>
              <th>Organization</th>
            </tr>
          </thead>
          <tbody id="user-table-body"></tbody>
        </table>
        <div id="bottom-controls">
          <div id="delete-area">
            <button id="delete-button">Delete</button>
          </div>
          <div class="pagination" id="pagination">
            <i class="fa-solid fa-angles-left"></i>
            <i class="fa-solid fa-angle-left"></i>
            <ol id="numbers"></ol>
            <i class="fa-solid fa-angle-right"></i>
            <i class="fa-solid fa-angles-right"></i>
          </div>
          <div id="register-area">
            <button id="register-button">Register</button>
          </div>
        </div>
      </div>
    `;
  }

  // async fetchUserData(page) {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/user?page=${page}&pageSize=10`
  //     );
  //     const data = await response.json();
  //     return data.paginationTotalUsers;
  //   } catch (error) {
  //     console.error("유저목록 조회 중 에러가 발생했습니다:", error);
  //   }
  // }
  // async displayUserData(page) {
  //   const userData = await this.fetchUserData(page);
  //   const tbody = document.getElementById("user-table-body");
  //   tbody.innerHTML = ""; // 기존 테이블 내용 비우기

  //   userData.forEach((user) => {
  //     const row = document.createElement("tr");
  //     row.innerHTML = `
  //           <td><input type="checkbox" /></td>
  //           <td>${user.id}</td>
  //           <td>${user.name}</td>
  //           <td>${user.email}</td>
  //           <td>${user.phone}</td>
  //           <td>${user.organization}</td>
  //       `;
  //     tbody.appendChild(row);
  //   });
  // }

  // async afterRender() {
  //   await this.displayUserData(1);

  //   document
  //     .getElementById("search-button")
  //     .addEventListener("click", this.searchUser);
  //   document
  //     .getElementById("searchInput")
  //     .addEventListener("keyup", (event) => {
  //       if (event.key === "Enter") {
  //         event.preventDefault(); // 기본 엔터 행동 방지
  //         this.searchUser();
  //       }
  //     });
  // }

  // async searchUser() {
  //   const searchInput = document.getElementById("searchInput").value.trim(); // 입력된 값 가져오기
  //   if (searchInput !== "") {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3000/user/${searchInput}`
  //       );
  //       const user = await response.json();
  //       if (!response.ok) {
  //         throw new Error(user.message); // 백엔드 에러메시지
  //       }
  //       // 결과를 테이블에 표시
  //       const userTableBody = document.getElementById("user-table-body");
  //       userTableBody.innerHTML = ""; // 기존 데이터 삭제

  //       const row = document.createElement("tr");
  //       row.innerHTML = `
  //               <td><input type="checkbox" /></td>
  //               <td>${user.id}</td>
  //               <td>${user.name}</td>
  //               <td>${user.email}</td>
  //               <td>${user.phone}</td>
  //               <td>${user.organization}</td>
  //           `;
  //       userTableBody.appendChild(row);
  //     } catch (error) {
  //       alert(error.message);
  //       console.error("에러 발생:", error.message);
  //     }
  //   }
  // }
}
