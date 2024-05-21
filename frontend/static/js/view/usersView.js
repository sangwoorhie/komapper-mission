import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Users");
  }

  // localhost:3000/user => section에 동적으로 들어가는 부분
  async getHtml() {
    return `
    <div id="user-first-breadcrumb">Users</div>
    <div id="user-second-breadcrumb">Mission > Users</div>
    <hr />

    <!-- 컨테이너 박스 -->
    <article id="user-container-box">
      <div id="user-inner-box">

        <!-- 회원 수 -->
        <div id="total-users" class="total-users">Total:</div>

        <!-- 검색창 -->
        <div id="user-search-container">
          <div id="user-search-box">
            <input
              type="text"
              id="user-searchInput"
              placeholder=" 조회할 유저 ID를 입력하세요."
            />
            <div id="user-magnifier">
              <i class="fa-solid fa-search" id="user-search-button"></i>
            </div>
          </div>
        </div>
        <br />

        <!-- 테이블 -->
        <table id="user-my-table">
          <colgroup>
            <col class="user-col1" />
            <col class="user-col2" />
            <col class="user-col3" />
            <col class="user-col3" />
            <col class="user-col3" />
            <col class="user-col3" />
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
          <!-- 유저 목록이 들어가는 부분 -->
          <tbody id="user-table-body">
          </tbody>
        </table>

        <!-- 삭제 -->
        <div id="bottom-controls">
          <div id="delete-area">
            <button id="delete-button">Delete</button>
          </div>
          <!-- 페이지네이션 -->
          <div class="pagination" id="pagination">
            <i class="fa-solid fa-angles-left"></i>
            <i class="fa-solid fa-angle-left"></i>
            <ol id="numbers"></ol>
            <i class="fa-solid fa-angle-right"></i>
            <i class="fa-solid fa-angles-right"></i>
          </div>
          <!-- 신규 회원생성 -->
          <div id="register-area">
            <button id="register-button">Register</button>
          </div>
        </div>
      </div>
    </article>
    `;
  }
}
