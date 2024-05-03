// 유저 페이지네이션
// totalPages, paginationTotalUsers

// 유저 전체조회
document.addEventListener("DOMContentLoaded", async function () {
  const userTableBody = document.getElementById("user-table-body");

  async function fetchAndDisplayUsers(page = 1, pageSize = 10) {
    try {
      const response = await fetch(
        `http://localhost:3000/user?page=${page}&pageSize=${pageSize}`
      );
      const users = await response.json();
      userTableBody.innerHTML = "";

      users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="checkbox" /></td>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.organization}</td>
          `;
        userTableBody.appendChild(row);
      });

      // tbody에 추가한 체크박스들을 선택하는 이벤트 리스너 등록
      const checkboxes = document.querySelectorAll(
        'tbody input[type="checkbox"]'
      );
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
          checkSelectAll();
        });
      });
      paginateUsers();
    } catch (error) {
      console.error("유저목록 조회중 에러가 발생했습니다:", error);
    }
  }

  await fetchAndDisplayUsers();

  // 전체 선택 체크박스 이벤트 리스너 등록
  const selectAllCheckbox = document.getElementById("selectAll");
  selectAllCheckbox.addEventListener("change", function () {
    const checkboxes = document.querySelectorAll(
      'tbody input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAllCheckbox.checked;
    });
  });

  // 전체 체크박스 체크 여부 확인 및 처리
  function checkSelectAll() {
    const checkboxes = document.querySelectorAll(
      'tbody input[type="checkbox"]'
    );
    const allChecked = Array.from(checkboxes).every(
      (checkbox) => checkbox.checked
    );
    selectAllCheckbox.checked = allChecked;
  }
});

// 단일 유저조회
document
  .getElementById("searchButton")
  .addEventListener("click", async function () {
    const searchInput = document.getElementById("searchInput").value.trim(); // 입력된 값 가져오기

    // 아무 입력값이 없으면 유저 전체 보여줌.
    if (searchInput == "") {
      await fetchAndDisplayUsers();
      return;
    }

    if (searchInput !== "") {
      try {
        const response = await fetch(
          `http://localhost:3000/user/${searchInput}`
        );
        if (!response.ok) {
          throw new Error(`서버에서 오류 응답: ${response.status}`);
        }
        const user = await response.json();

        // 결과를 테이블에 표시
        const userTableBody = document.getElementById("user-table-body");
        userTableBody.innerHTML = ""; // 기존 데이터 삭제

        const row = document.createElement("tr");
        row.innerHTML = `
        <td><input type="checkbox" /></td>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.organization}</td>
      `;
        userTableBody.appendChild(row);
      } catch (error) {
        console.error("에러 발생:", error.message);
      }
    }
  });

// 회원가입 모달
const modal = document.getElementById("createModal");
const btn = document.getElementById("registerButton");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// 중복ID 체크로직
document
  .getElementById("checkDuplicate")
  .addEventListener("click", async function () {
    const userId = document.getElementById("userId").value;
    try {
      const response = await fetch("http://localhost:3000/user/idcheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });
      if (response.ok) {
        const result = await response.text();
        alert(result);
      } else {
        throw new Error(`${userId}는 이미 존재하는 ID입니다.`);
      }
    } catch (error) {
      alert(error.message);
    }
  });

// 모달 내에서 register btn눌렀을 때 실제 유저 생성로직
document
  .getElementById("registerBtn")
  .addEventListener("click", async function () {
    const userId = document.getElementById("userId").value;
    const password = document.getElementById("userPassword").value;
    const name = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;
    const phone = document.getElementById("userPhone").value;
    const organization = document.getElementById("userOrganization").value;

    const userData = {
      id: userId,
      password: password,
      name: name,
      email: email,
      phone: phone,
      organization: organization,
    };

    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const result = await response.text();
        alert(result);
        window.location.reload();
      } else {
        throw new Error("회원가입에 실패했습니다.");
      }
    } catch (error) {
      alert(error.message);
    }
  });

document.getElementById("cancelBtn").onclick = function () {
  modal.style.display = "none";
};

// 회원삭제
$(document).ready(function () {
  $("#deleteButton").click(function () {
    const selectedUsers = [];

    $("tbody input[type='checkbox']:checked").each(function () {
      selectedUsers.push($(this).closest("tr").find("td:eq(1)").text());
    });

    if (selectedUsers.length === 0) {
      alert("삭제할 사용자를 선택하세요.");
      return;
    }

    $.ajax({
      type: "DELETE",
      url: "http://localhost:3000/user",
      contentType: "application/json",
      data: JSON.stringify({ ids: selectedUsers }),
      success: function (response) {
        console.log(response);
        alert("선택된 사용자가 삭제되었습니다.");
        location.reload();
      },
      error: function (xhr, status, error) {
        alert("삭제 중 오류가 발생했습니다: " + error);
      },
    });
  });
});

// 회원 Total 수
document.addEventListener("DOMContentLoaded", function () {
  fetchTotalUserCount();
});

function fetchTotalUserCount() {
  fetch("http://localhost:3000/user/count")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("totalUsers").textContent += ` ${data}`;
    })
    .catch((error) => console.error("에러가 발생했습니다:", error));
}

// 사용자 목록을 가져오고 화면에 표시하는 함수
async function fetchAndDisplayUsers() {
  const userTableBody = document.getElementById("user-table-body");
  try {
    const response = await fetch("http://localhost:3000/user");
    const users = await response.json();
    userTableBody.innerHTML = "";

    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><input type="checkbox" /></td>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.organization}</td>
      `;
      userTableBody.appendChild(row);
    });

    // tbody에 추가한 체크박스들을 선택하는 이벤트 리스너 등록
    const checkboxes = document.querySelectorAll(
      'tbody input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        checkSelectAll();
      });
    });
  } catch (error) {
    console.error("유저목록 조회중 에러가 발생했습니다:", error);
  }
}

// 전체 선택 체크박스 이벤트 리스너 등록
const selectAllCheckbox = document.getElementById("selectAll");
selectAllCheckbox.addEventListener("change", function () {
  const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAllCheckbox.checked;
  });
});

// 전체 체크박스 체크 여부 확인 및 처리
function checkSelectAll() {
  const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
  const allChecked = Array.from(checkboxes).every(
    (checkbox) => checkbox.checked
  );
  selectAllCheckbox.checked = allChecked;
}

// 페이지 로드 시 사용자 목록 가져오고 표시
fetchAndDisplayUsers();

// 테이블 하단 페이지네이션
async function paginateUsers() {
  const rowsPerPage = 10;
  const rows = document.querySelectorAll("#my-table tbody tr");
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
  // await fetchAndDisplayUsers()
}
