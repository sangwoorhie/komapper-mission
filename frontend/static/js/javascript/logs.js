document.addEventListener("DOMContentLoaded", function () {
  fetchTotalLogCount(); // 로그 Total수 조회
  setupLogEventListeners(); // 로그목록 조회
});

// 로그 전체 수
async function fetchTotalLogCount() {
  try {
    const response = await fetch("http://localhost:3000/log/count");
    const data = await response.json();
    const totalLogsElement = document.getElementById("total-logs");
    const totalLogsText = totalLogsElement.textContent;
    const totalLogsValue = data;
    const styledText = `
      <span style="color: inherit;">${totalLogsText}</span> <span style="color: #DD7012; font-weight: bold;">${totalLogsValue}</span>
      `;
    totalLogsElement.innerHTML = styledText;
  } catch (error) {
    console.error("에러가 발생했습니다:", error);
  }
}

// * 로그 단일조회 (search 창)
async function searchLog() {
  const searchInput = document.getElementById("log-searchInput").value.trim(); // 입력된 값 가져오기
  console.log("searchInput", searchInput);
  if (searchInput !== "") {
    try {
      await fetchLog(searchInput);
    } catch (error) {
      alert(error.message);
      console.error("에러 발생:", error.message);
    }
  }
}

async function fetchLog(searchInput) {
  try {
    const response = await fetch(`http://localhost:3000/log/${searchInput}`);
    const log = await response.json();

    if (!response.ok) {
      console.log("log.message", log.message);
      throw new Error(log.message); // 백엔드 에러메시지
    }

    const logTableBody = document.getElementById("log-table-body");
    logTableBody.innerHTML = ""; // 기존 데이터 삭제

    const date = new Date(log.date);
    const formattedDate = date.toISOString().split("T")[0];

    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${log.id}</td>
          <td>${formattedDate}</td>
          <td>${log.user_ip}</td>
          <td>${log.user_agent}</td>
        `;
    logTableBody.appendChild(row);
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

function setupLogEventListeners() {
  // 클릭시
  document
    .getElementById("log-search-button")
    .addEventListener("click", searchLog);

  // 엔터시
  document
    .getElementById("log-searchInput")
    .addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // 기본 엔터 행동 방지
        searchLog();
      }
    });

  // 페이지네이션 버튼 클릭 이벤트 처리
  const prevPageBtn = document.querySelector(".log-pagination .fa-angle-left");
  const nextPageBtn = document.querySelector(".log-pagination .fa-angle-right");

  prevPageBtn.addEventListener("click", async () => {
    if (currentPage > 1) {
      await onPageChangeLog(currentPage - 1);
    }
  });

  nextPageBtn.addEventListener("click", async () => {
    if (currentPage < totalPages) {
      await onPageChangeLog(currentPage + 1);
    }
  });

  // 가장 첫 페이지로 이동하는 버튼 클릭 이벤트 처리
  const firstPageBtn = document.querySelector(
    ".log-pagination .fa-angles-left"
  );
  firstPageBtn.addEventListener("click", async () => {
    if (currentPage > 1) {
      await onPageChangeLog(1); // 첫 페이지로 이동
    }
  });

  // 가장 마지막 페이지로 이동하는 버튼 클릭 이벤트 처리
  const lastPageBtn = document.querySelector(
    ".log-pagination .fa-angles-right"
  );
  lastPageBtn.addEventListener("click", async () => {
    if (currentPage < totalPages) {
      await onPageChangeLog(totalPages); // 마지막 페이지로 이동
    }
  });
}

////////////////////////////////////////////

// 초기 페이지 로드 시 첫 번째 페이지 데이터 표시
document.addEventListener("DOMContentLoaded", async () => {
  await onPageChangeLog(currentPage);
});

// 로그목록 전체조회 (페이지네이션)
const rowsPerPage = 10;
let currentPage = 1;
let totalPages = 1; // 초기값 설정
const maxPageNum = 10; // 한 화면에 표시될 최대 페이지 숫자

async function fetchLogData(page) {
  try {
    const response = await fetch(
      `http://localhost:3000/log?page=${page}&pageSize=${rowsPerPage}`
    );
    const data = await response.json();
    totalPages = data.totalPages; // 전체 페이지 수 업데이트
    return data.paginationTotalLogs;
  } catch (error) {
    console.error("로그목록 조회 중 에러가 발생했습니다:", error);
  }
}

async function displayLogData(page) {
  const logData = await fetchLogData(page);
  const tbody = document.getElementById("log-table-body");
  tbody.innerHTML = ""; // 기존 테이블 내용 비우기

  logData.forEach((log) => {
    const date = new Date(log.date);
    const formattedDate = date.toISOString().split("T")[0]; // 날짜 0000-00-00 형태로 변환

    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${log.id}</td>
          <td>${formattedDate}</td>
          <td>${log.user_ip}</td>
          <td>${log.user_agent}</td>
        `;
    tbody.appendChild(row);
  });
}

async function onPageChangeLog(page) {
  currentPage = page;
  await displayLogData(page);
  updatePaginationLog(page);
}

// 페이지네이션 업데이트 함수
function updatePaginationLog(currentPage) {
  const numbers = document.querySelector("#log-numbers");
  numbers.innerHTML = ""; // 이전 페이지 번호 삭제

  const start = Math.max(1, currentPage - Math.floor(maxPageNum / 2));
  const end = Math.min(totalPages, start + maxPageNum - 1);

  for (let i = start; i <= end; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = i;
    li.appendChild(a);
    numbers.appendChild(li);

    // 페이지 숫자를 클릭할 때 해당 페이지로 이동하는 이벤트 추가
    a.addEventListener("click", async (e) => {
      e.preventDefault(); // 기본 동작 방지
      await onPageChangeLog(i);
    });
  }

  // 현재 페이지에 'active' 클래스 추가
  const pageLinks = document.querySelectorAll("#log-numbers li a");
  pageLinks.forEach((link) => {
    if (parseInt(link.textContent) === currentPage) {
      link.classList.add("active");
    }
  });
}
