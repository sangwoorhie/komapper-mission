// 사이드바 이동
// const second_sidebar = document.querySelector(".second-sidebar");

// second_sidebar.addEventListener("click", function () {
//   window.location.href = "users.html";
// });

// const third_sidebar = document.querySelector(".third-sidebar");

// third_sidebar.addEventListener("click", function () {
//   window.location.href = "logs.html";
// });

//  로그 전체조회
document.addEventListener("DOMContentLoaded", async function () {
  const logTableBody = document.getElementById("log-table-body");

  async function fetchAndDisplayLogs() {
    try {
      const response = await fetch("http://localhost:3000/log");
      const logs = await response.json();
      logTableBody.innerHTML = "";

      logs.forEach((log) => {
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
      });
      paginateLogs();
    } catch (error) {
      console.log("로그목록 조회중 에러가 발생했습니다", error);
    }
  }
  await fetchAndDisplayLogs();
});

// 단일 로그조회
document
  .getElementById("searchButton")
  .addEventListener("click", async function () {
    const searchInput = document.getElementById("searchInput").value.trim();

    // 아무 입력값이 없으면 로그 전체 보여줌.
    if (searchInput == "") {
      await fetchAndDisplayLogs();
      return;
    }

    if (searchInput !== "") {
      try {
        const response = await fetch(
          `http://localhost:3000/log/${searchInput}`
        );
        if (!response.ok) {
          throw new Error(`서버에서 오류 응답: ${response.status}`);
        }
        const log = await response.json();

        // 결과를 테이블에 표시
        const logTableBody = document.getElementById("log-table-body");
        logTableBody.innerHTML = "";

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
        console.log("에러 발생", error.message);
      }
    }
  });

// 로그 Total 수
document.addEventListener("DOMContentLoaded", function () {
  fetchTotalLogCount();
});

function fetchTotalLogCount() {
  fetch("http://localhost:3000/log/count")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("totalLogs").textContent += ` ${data}`;
    })
    .catch((error) => console.error("에러가 발생했습니다:", error));
}

// 테이블 하단 페이지네이션
async function paginateLogs() {
  const rowsPerPage = 10;
  const rows = document.querySelectorAll("#my-table tbody tr");
  console.log("rows", rows);
  const rowsCount = rows.length;
  const pageCount = Math.ceil(rowsCount / rowsPerPage);
  const numbers = document.querySelector("#numbers");

  const prevPageBtn = document.querySelector(".pagination .fa-arrow-left");
  const nextPageBtn = document.querySelector(".pagination .fa-arrow-right");

  let pageActiveIndex = 0; // 현재 보고있는 페이지그룹 번호
  let currentPageNum = 0; // 현재 보고있는 페이지네이션 번호
  let maxPageNum = 10; // 페이지그룹 최대 갯수

  for (let i = 1; i <= pageCount; i++) {
    numbers.innerHTML += `<li><a href="">${i}</a></li>`;
  }
  const numberBtn = numbers.querySelectorAll("a");

  // 페이지네이션 번호 감추기
  for (nb of numberBtn) {
    nb.style.display = "none";
  }

  numberBtn.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      displayRow(index);
    });
  });

  function displayRow(index) {
    let start = index * rowsPerPage;
    let end = start + rowsPerPage;
    let rowsArray = [...rows];
    for (ra of rowsArray) {
      ra.style.display = "none";
    }
    let newRows = rowsArray.slice(start, end);
    for (nr of newRows) {
      nr.style.display = "";
    }
    for (let nb of numberBtn) {
      nb.classList.remove("active");
    }
    numberBtn[index].classList.add("active");
  } // displayRow

  displayRow(0);

  // 페이지네이션 그룹 표시 함수
  function displayPage(num) {
    for (nb of numberBtn) {
      nb.style.display = "none";
    }
    let totalPageCount = Math.ceil(pageCount / maxPageNum);

    let pageArr = [...numberBtn];
    let start = num * maxPageNum;
    let end = start + maxPageNum;
    let pageListArr = pageArr.slice(start, end);

    for (let item of pageListArr) {
      item.style.display = "block";
    }
    // 첫 페이지그룹시, prevPageBtn이 안 보이도록.
    if (pageActiveIndex == 0) {
      prevPageBtn.style.display = "none";
    } else {
      prevPageBtn.style.display = "block";
    }

    // 마지막 페이지그룹시, nextPageBtn이 안 보이도록.
    if (pageActiveIndex == totalPageCount - 1) {
      nextPageBtn.style.display = "none";
    } else {
      nextPageBtn.style.display = "block";
    }
  }

  displayPage(0);

  // prevPageBtn 클릭시
  prevPageBtn.addEventListener("click", () => {
    let prevPageNum = pageActiveIndex * maxPageNum - maxPageNum;
    displayRow(prevPageNum);
    --pageActiveIndex;
    displayPage(pageActiveIndex);
  });

  // nextPageBtn 클릭시
  nextPageBtn.addEventListener("click", () => {
    let nextPageNum = pageActiveIndex * maxPageNum + maxPageNum;
    displayRow(nextPageNum);
    ++pageActiveIndex;
    displayPage(pageActiveIndex);
  });

  // await fetchAndDisplayLogs();
}
