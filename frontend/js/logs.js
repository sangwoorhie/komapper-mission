// ＊ 로그 Total 수 조회
document.addEventListener("DOMContentLoaded", function () {
  fetchTotalLogCount();
});

function fetchTotalLogCount() {
  fetch("http://localhost:3000/log/count")
    .then((response) => response.json())
    .then((data) => {
      const totalLogsElement = document.getElementById("total-logs");
      const totalLogsText = totalLogsElement.textContent;
      const totalLogsValue = data;

      const styledText = `<span style="color: inherit;">${totalLogsText}</span> <span style="color: #DD7012; font-weight: bold;">${totalLogsValue}</span>`;
      totalLogsElement.innerHTML = styledText;
    })
    .catch((error) => console.error("에러가 발생했습니다:", error));
}

// * 로그 단일조회
document
  .getElementById("search-button")
  .addEventListener("click", async function () {
    const searchInput = document.getElementById("searchInput").value.trim(); // 입력된 값 가져오기

    // 아무 입력값이 없으면 유저 전체 보여줌.
    if (searchInput == "") {
      // 로그 전체 보여주는 함수
      await fetchAndDisplayLogs();
      return;
    }

    if (searchInput !== "") {
      try {
        const response = await fetch(
          `http://localhost:3000/log/${searchInput}`
        );
        if (!response.ok) {
          throw new Error(
            `로그 아이디: ${searchInput}이(가) 존재하지 않습니다.`
          );
        }
        const log = await response.json();
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
        alert(error.message);
        console.error("에러 발생:", error.message);
      }
    }
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

async function onPageChange(page) {
  currentPage = page;
  await displayLogData(page);
  updatePagination(page);
}

// 초기 페이지 로드 시 첫 번째 페이지 데이터 표시
document.addEventListener("DOMContentLoaded", async () => {
  await onPageChange(currentPage);
});

// 페이지네이션 버튼 클릭 이벤트 처리
const prevPageBtn = document.querySelector(".pagination .fa-angle-left");
const nextPageBtn = document.querySelector(".pagination .fa-angle-right");

prevPageBtn.addEventListener("click", async () => {
  if (currentPage > 1) {
    await onPageChange(currentPage - 1);
  }
});

nextPageBtn.addEventListener("click", async () => {
  if (currentPage < totalPages) {
    await onPageChange(currentPage + 1);
  }
});

// 페이지네이션 업데이트 함수
function updatePagination(currentPage) {
  const numbers = document.querySelector("#numbers");
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
    a.addEventListener("click", async () => {
      await onPageChange(i);
    });
  }

  // 현재 페이지에 'active' 클래스 추가
  const pageLinks = document.querySelectorAll("#numbers li a");
  pageLinks.forEach((link) => {
    if (parseInt(link.textContent) === currentPage) {
      link.classList.add("active");
    }
  });
}

// 가장 첫 페이지로 이동하는 버튼 클릭 이벤트 처리
const firstPageBtn = document.querySelector(".pagination .fa-angles-left");
firstPageBtn.addEventListener("click", async () => {
  if (currentPage > 1) {
    await onPageChange(1); // 첫 페이지로 이동
  }
});

// 가장 마지막 페이지로 이동하는 버튼 클릭 이벤트 처리
const lastPageBtn = document.querySelector(".pagination .fa-angles-right");
lastPageBtn.addEventListener("click", async () => {
  if (currentPage < totalPages) {
    await onPageChange(totalPages); // 마지막 페이지로 이동
  }
});

// * 로그 목록조회 (페이지네이션X)
// document.addEventListener("DOMContentLoaded", async function () {
//   const logTableBody = document.getElementById("log-table-body");

//   async function fetchAndDisplayLogs() {
//     try {
//       const response = await fetch("http://localhost:3000/log");
//       const logs = await response.json();
//       logTableBody.innerHTML = "";

//       logs.forEach((log) => {
//         const date = new Date(log.date);
//         const formattedDate = date.toISOString().split("T")[0];

//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td>${log.id}</td>
//             <td>${formattedDate}</td>
//             <td>${log.user_ip}</td>
//             <td>${log.user_agent}</td>
//           `;
//         logTableBody.appendChild(row);
//       });
//     } catch (error) {
//       console.log("로그목록 조회중 에러가 발생했습니다.", error);
//     }
//   }
//   fetchAndDisplayLogs();
// });
