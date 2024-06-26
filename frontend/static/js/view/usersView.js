import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Users");
  }

  // localhost:3000/user => section에 동적으로 들어가는 부분
  async getHtml() {
    return `
    <!-- 컨테이너 박스 -->
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
        <div id="user-bottom-controls">
          <div id="delete-area">
            <button id="delete-button">Delete</button>
          </div>
          <!-- 페이지네이션 -->
          <div class="user-pagination" id="user-pagination">
            <i class="fa-solid fa-angles-left"></i>
            <i class="fa-solid fa-angle-left"></i>
            <ol id="user-numbers"></ol>
            <i class="fa-solid fa-angle-right"></i>
            <i class="fa-solid fa-angles-right"></i>
          </div>
          <!-- 신규 회원생성 -->
          <div id="register-area">
            <button id="register-button">Register</button>
          </div>
        </div>
      </div>

    <!-- 모달 -->

    <!-- 회원가입 모달 -->
    <div id="createModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>사용자 등록</h2>
        <br />
        <br />
        <div class="input-container">
          <label for="userId">ID</label>
          <input
            type="text"
            id="userId"
            class="userId"
            placeholder="ID를 입력해 주세요."
          />
          <button id="checkDuplicate">중복 확인</button>
        </div>
        <div class="input-container">
          <label for="userPassword">Password</label>
          <input
            type="password"
            id="userPassword"
            placeholder="비밀번호를 입력해 주세요."
          />
          <button id="togglePassword">Show</button>
        </div>
        <div class="input-container">
          <label for="userName">Name</label>
          <input
            type="text"
            id="userName"
            placeholder="이름을 입력해 주세요."
          />
        </div>
        <div class="input-container">
          <label for="userEmail">E-mail</label>
          <input
            type="email"
            id="userEmail"
            placeholder="E-mail 형식에 맞게 입력해 주세요."
          />
        </div>
        <div class="input-container">
          <label for="userPhone">Phone</label>
          <input
            type="tel"
            id="userPhone"
            placeholder="핸드폰 번호를 입력해 주세요."
          />
        </div>
        <div class="input-container">
          <label for="userOrganization">Organization</label>
          <input
            type="text"
            id="userOrganization"
            placeholder="소속을 입력해 주세요."
          />
        </div>
        <br />
        <p>※ ID 및 E-mail은 회원가입 후 변경할 수 없습니다.</p>
        <div class="modal-buttons">
          <br />
          <button id="registercancelBtn">Cancel</button>
          <button id="registerBtn">Register</button>
        </div>
      </div>
    </div>

    <!-- 유저 정보조회 모달 -->
    <div id="userDetailModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>사용자 정보 조회</h2>
        <br />
        <br />
        <div class="input-container">
          <label for="detailUserId">ID</label>
          <input type="text" id="detailUserId" readonly />
        </div>
        <div class="input-container">
          <label for="detailUserName">Name</label>
          <input type="text" id="detailUserName" readonly />
        </div>
        <div class="input-container">
          <label for="detailUserEmail">E-mail</label>
          <input type="email" id="detailUserEmail" readonly />
        </div>
        <div class="input-container">
          <label for="detailUserPhone">Phone</label>
          <input type="tel" id="detailUserPhone" readonly />
        </div>
        <div class="input-container">
          <label for="detailUserOrganization">Organization</label>
          <input type="text" id="detailUserOrganization" readonly />
        </div>
        <div class="modal-buttons">
          <br />
          <button id="modifycancelBtn">Cancel</button>
          <button id="modifyBtn">Modify</button>
        </div>
      </div>
    </div>

    <!-- 정보수정 모달 -->
    <div id="modifyModal" class="modifyModal">
      <div class="modal-content">
        <h2>사용자 정보 수정</h2>
        <br />
        <br />
        <div class="input-container">
          <label for="originalPassword">Password</label>
          <input
            type="password"
            id="originalPassword"
            placeholder="기존 비밀번호를 입력해 주세요."
          />
          <button id="toggleOriginalPassword">Show</button>
        </div>
        <div class="input-container">
          <label for="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            placeholder="변경할 비밀번호를 입력해 주세요."
          />
          <button id="toggleModifyPassword">Show</button>
        </div>
        <div class="input-container">
          <label for="userName">Name</label>
          <input
            type="text"
            id="newName"
            placeholder="변경할 이름을 입력해 주세요."
          />
        </div>
        <div class="input-container">
          <label for="userPhone">Phone</label>
          <input
            type="tel"
            id="newPhone"
            placeholder="핸드폰 번호를 입력해 주세요."
          />
        </div>
        <div class="input-container">
          <label for="userOrganization">Organization</label>
          <input
            type="text"
            id="newOrganization"
            placeholder="변경할 소속을 입력해 주세요."
          />
        </div>
        <div class="modal-buttons">
          <br />
          <button id="modifyCancelBtn">Back</button>
          <button id="modifyBtnConfirm">submit</button>
        </div>
      </div>
    </div>

    <!-- 삭제확인 모달 -->
    <div id="deleteModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>사용자 삭제</h2>
        <br />
        <br />
        <p>정말 삭제하시겠습니까? 한 번 삭제하면 복구할 수 없습니다.</p>
        <div class="modal-buttons">
          <button id="cancelDeleteBtn">Cancel</button>
          <button id="confirmDeleteBtn">Delete</button>
        </div>
      </div>
    </div>
    `;
  }
}
