// ＊ 로그 Total 수 조회
document.addEventListener("DOMContentLoaded", function () {
  fetchLogCount();
});

function fetchLogCount() {
  fetch("http://localhost:3000/log/count")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("total-logs").textContent += ` ${data}`;
    })
    .catch((error) => console.error("에러가 발생했습니다:", error));
}

// * 로그 목록조회 (페이지네이션X)
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
    } catch (error) {
      console.log("로그목록 조회중 에러가 발생했습니다.", error);
    }
  }
  fetchAndDisplayLogs();
});

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
