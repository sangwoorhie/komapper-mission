// ＊ 회원 Total 수 조회
document.addEventListener("DOMContentLoaded", function () {
  fetchTotalUserCount();
});

function fetchTotalUserCount() {
  fetch("http://localhost:3000/user/count")
    .then((response) => response.json())
    .then((data) => {
      const totalUsersElement = document.getElementById("total-users");
      const totalUsersText = totalUsersElement.textContent; // "Total:"의 텍스트
      const totalUsersValue = data; // 데이터의 값

      // "Total:" 텍스트와 데이터의 값에 각각 스타일을 적용한 HTML을 생성
      const styledText = `<span style="color: inherit;">${totalUsersText}</span> <span style="color: #DD7012; font-weight: bold;">${totalUsersValue}</span>`;
      totalUsersElement.innerHTML = styledText;
    })
    .catch((error) => console.error("에러가 발생했습니다:", error));
}

// ＊ 유저 단일조회 (search 창)
async function searchUser() {
  const searchInput = document.getElementById("user-searchInput").value.trim(); // 입력된 값 가져오기
  if (searchInput !== "") {
    try {
      const response = await fetch(`http://localhost:3000/user/${searchInput}`);
      const user = await response.json();
      if (!response.ok) {
        throw new Error(user.message); // 백엔드 에러메시지
      }
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
      alert(error.message);
      console.error("에러 발생:", error.message);
    }
  }
}

// 클릭시
document
  .getElementById("user-search-button")
  .addEventListener("click", searchUser);
// 엔터시
document
  .getElementById("user-searchInput")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 엔터 행동 방지
      searchUser();
    }
  });

// 회원가입 (모달)
const modal = document.getElementById("createModal");
const btn = document.getElementById("register-button");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
  resetModalInputs(); // 모달 열릴 때 입력 초기화
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    resetModalInputs(); // 모달 외부 클릭시 입력 초기화
  }
};

// 회원가입 비밀번호 숨기기/ 보여주기
document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("userPassword");
  const toggleButton = document.getElementById("togglePassword");

  toggleButton.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleButton.textContent = "Hide";
    } else {
      passwordInput.type = "password";
      toggleButton.textContent = "Show";
    }
  });
});

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
        const responseData = await response.json();
        throw new Error(responseData.message); // 백엔드 에러메시지
      }
    } catch (error) {
      alert(error.message);
    }
  });

// 회원가입
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
        const responseData = await response.json();
        throw new Error(responseData.message); // 백엔드 에러메시지
      }
    } catch (error) {
      alert(error.message);
    }
  });

document.getElementById("registercancelBtn").onclick = function () {
  modal.style.display = "none";
  resetModalInputs(); // 취소 버튼 클릭시 입력 초기화
};

function resetModalInputs() {
  // (취소버튼 클릭시) 모달 내의 입력란 초기화
  document.getElementById("userId").value = "";
  document.getElementById("userPassword").value = "";
  document.getElementById("userName").value = "";
  document.getElementById("userEmail").value = "";
  document.getElementById("userPhone").value = "";
  document.getElementById("userOrganization").value = "";
}

// 회원 삭제
$(document).ready(function () {
  $("#delete-button").click(function () {
    const selectedUsers = [];

    $("tbody input[type='checkbox']:checked").each(function () {
      selectedUsers.push($(this).closest("tr").find("td:eq(1)").text());
    });

    if (selectedUsers.length === 0) {
      alert("삭제할 사용자를 선택하세요.");
      return;
    }

    // 모달 열기
    $("#deleteModal").css("display", "block");
  });

  // 모달 닫기
  $(".close, #cancelDeleteBtn").click(function () {
    $("#deleteModal").css("display", "none");
  });

  // 삭제 확인 버튼 클릭 시
  $("#confirmDeleteBtn").click(function () {
    const selectedUsers = [];

    $("tbody input[type='checkbox']:checked").each(function () {
      selectedUsers.push($(this).closest("tr").find("td:eq(1)").text());
    });

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

    // 모달 닫기
    $("#deleteModal").css("display", "none");
  });
});

// * 유저목록 전체조회 (페이지네이션)
const rowsPerPage = 10;
let currentPage = 1;
let totalPages = 1; // 초기값 설정
const maxPageNum = 10; // 한 화면에 표시될 최대 페이지 숫자

async function fetchUserData(page) {
  try {
    const response = await fetch(
      `http://localhost:3000/user?page=${page}&pageSize=${rowsPerPage}`
    );
    const data = await response.json();
    totalPages = data.totalPages; // 전체 페이지 수 업데이트
    return data.paginationTotalUsers;
  } catch (error) {
    console.error("유저목록 조회 중 에러가 발생했습니다:", error);
  }
}

async function displayUserData(page) {
  const userData = await fetchUserData(page);
  const tbody = document.getElementById("user-table-body");
  tbody.innerHTML = ""; // 기존 테이블 내용 비우기

  userData.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><input type="checkbox" /></td>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.organization}</td>
      `;
    tbody.appendChild(row);
  });
}

async function onPageChange(page) {
  currentPage = page;
  await displayUserData(page);
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

// * 전체 선택 체크박스
const selectAllCheckbox = document.getElementById("selectAll");

// 전체 선택 체크박스에 이벤트 리스너 추가
selectAllCheckbox.addEventListener("change", function () {
  const checkboxes = document.querySelectorAll(
    "#user-table-body input[type='checkbox']"
  );

  // 전체 선택 체크박스의 상태에 따라 하단 체크박스들의 상태 변경
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = selectAllCheckbox.checked;
  });
});

// 유저 단일조회 (Modal)
const userDetailModal = document.getElementById("userDetailModal");
const userDetailClose = document.querySelector("#userDetailModal .close");

// 테이블 행 클릭 시 상세 정보 모달 열기
document
  .getElementById("user-table-body")
  .addEventListener("click", function (event) {
    const target = event.target;
    if (target.tagName === "TD") {
      const row = target.parentNode;
      const userId = row.querySelector("td:nth-child(2)").textContent; // 유저 ID 가져오기

      // 해당 유저의 상세 정보를 가져와 모달에 표시
      fetch(`http://localhost:3000/user/${userId}`)
        .then((response) => response.json())
        .then((user) => {
          document.getElementById("detailUserId").value = user.id;
          document.getElementById("detailUserName").value = user.name;
          document.getElementById("detailUserEmail").value = user.email;
          document.getElementById("detailUserPhone").value = user.phone;
          document.getElementById("detailUserOrganization").value =
            user.organization;

          // 모달 열기
          userDetailModal.style.display = "block";
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  });

// 유저 상세 정보 모달 닫기
document.getElementById("modifycancelBtn").onclick = function () {
  userDetailModal.style.display = "none";
};

userDetailClose.onclick = function () {
  userDetailModal.style.display = "none";
};

// 정보수정 모달 관련 이벤트 리스너들
document.addEventListener("DOMContentLoaded", function () {
  const modifyModal = document.getElementById("modifyModal");
  const modifyBtn = document.getElementById("modifyBtn");
  const modifyCancelBtn = document.getElementById("modifyCancelBtn");
  const modifyBtnConfirm = document.getElementById("modifyBtnConfirm");
  const toggleOriginalPasswordBtn = document.getElementById(
    "toggleOriginalPassword"
  );
  const toggleModifyPasswordBtn = document.getElementById(
    "toggleModifyPassword"
  );
  const originalPasswordInput = document.getElementById("originalPassword");
  const newPasswordInput = document.getElementById("newPassword");

  // 정보수정 모달 닫기 이벤트 처리
  modifyCancelBtn.addEventListener("click", function () {
    modifyModal.style.display = "none";
  });

  // Modify 버튼 클릭 시 정보수정 모달 띄우기
  modifyBtn.addEventListener("click", function () {
    // 모달 열기
    modifyModal.style.display = "block";

    // 기존 유저정보 가져오기
    const originalName = document.getElementById("detailUserName").value;
    const originalPhone = document.getElementById("detailUserPhone").value;
    const originalOrganization = document.getElementById(
      "detailUserOrganization"
    ).value;

    // 입력 필드 초기화
    document.getElementById("originalPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("newName").value = `${originalName}`;
    document.getElementById("newPhone").value = `${originalPhone}`;
    document.getElementById("newOrganization").value =
      `${originalOrganization}`;

    // 비밀번호 숨김/보임 토글 버튼 초기화
    originalPasswordInput.type = "password";
    toggleOriginalPasswordBtn.textContent = "Show";
    newPasswordInput.type = "password";
    toggleModifyPasswordBtn.textContent = "Show";
  });

  // 비밀번호 숨김/보임 토글 버튼 이벤트 처리
  toggleOriginalPasswordBtn.addEventListener("click", function () {
    if (originalPasswordInput.type === "password") {
      originalPasswordInput.type = "text";
      toggleOriginalPasswordBtn.textContent = "Hide";
    } else {
      originalPasswordInput.type = "password";
      toggleOriginalPasswordBtn.textContent = "Show";
    }
  });

  toggleModifyPasswordBtn.addEventListener("click", function () {
    if (newPasswordInput.type === "password") {
      newPasswordInput.type = "text";
      toggleModifyPasswordBtn.textContent = "Hide";
    } else {
      newPasswordInput.type = "password";
      toggleModifyPasswordBtn.textContent = "Show";
    }
  });

  // 정보 수정 확인 버튼 클릭 시
  modifyBtnConfirm.addEventListener("click", async function () {
    try {
      const userId = document.getElementById("detailUserId").value;
      const password = originalPasswordInput.value;
      const newPassword = newPasswordInput.value;
      const name = document.getElementById("newName").value;
      const phone = document.getElementById("newPhone").value;
      const organization = document.getElementById("newOrganization").value;

      console.log("userId", userId);

      // 정보 수정 요청 보내기
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          newPassword: newPassword,
          name: name,
          phone: phone,
          organization: organization,
        }),
      });

      if (response.ok) {
        const result = await response.text();
        alert(result);
        modifyModal.style.display = "none";
        window.location.reload();
      } else {
        const responseData = await response.json();
        throw new Error(responseData.message); // 백엔드 에러메시지
      }
    } catch (error) {
      alert(error.message);
    }
  });
});
