import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Logs");
  }

  // localhost:3000/log => section에 동적으로 들어가는 부분
  async getHtml() {
    return `
    <div id="log-first-breadcrumb">Logs</div>
    <div id="log-second-breadcrumb">Mission > Logs</div>
    <hr />

    <!-- 컨테이너 박스 -->
    <div id="log-container-box">
      <div id="log-inner-box">

        <!-- 로그 수 -->
        <div id="total-logs" class="total-logs">Total:</div>

        <!-- 검색창 -->
        <div id="log-search-container">
          <div id="log-search-box">
            <input
              type="text"
              id="log-searchInput"
              placeholder=" 조회할 로그 ID를 입력하세요."
            />
            <div id="log-magnifier">
              <i class="fa-solid fa-search" id="log-search-button"></i>
            </div>
          </div>
        </div>
        <br />

        <!-- 테이블 -->
        <table id="log-my-table">
          <colgroup>
            <col class="log-col1" />
            <col class="log-col2" />
            <col class="log-col3" />
            <col class="log-col4" />
          </colgroup>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>User IP</th>
              <th>User Agent</th>
            </tr>
          </thead>
          <!-- 로그 목록이 들어가는 부분 -->
          <tbody id="log-table-body">
          </tbody>
        </table>

        <!-- 페이지네이션 -->
        <div id="log-bottom-controls">
          <div class="log-pagination" id="log-pagination">
            <i class="fa-solid fa-angles-left"></i>
            <i class="fa-solid fa-angle-left"></i>
            <ol id="log-numbers"></ol>
            <i class="fa-solid fa-angle-right"></i>
            <i class="fa-solid fa-angles-right"></i>
          </div>
        </div>
      </div>
    </div>
        `;
  }
}
