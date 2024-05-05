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

// ＊ 유저 단일조회
document
  .getElementById("search-button")
  .addEventListener("click", async function () {
    const searchInput = document.getElementById("searchInput").value.trim(); // 입력된 값 가져오기

    // 아무 입력값이 없으면 유저 전체 보여줌.
    if (searchInput == "") {
      // 유저 전체 보여주는 함수
      await fetchAndDisplayUsers();
      return;
    }

    if (searchInput !== "") {
      try {
        const response = await fetch(
          `http://localhost:3000/user/${searchInput}`
        );
        if (!response.ok) {
          throw new Error(
            `유저 아이디: ${searchInput}이(가) 존재하지 않습니다.`
          );
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
        <td><i class="fa-solid fa-pen"></i></td>
      `;
        userTableBody.appendChild(row);
      } catch (error) {
        alert(error.message);
        console.error("에러 발생:", error.message);
      }
    }
  });

// 회원가입 (모달)
const modal = document.getElementById("createModal");
const btn = document.getElementById("register-button");
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
        throw new Error("회원가입에 실패했습니다.");
      }
    } catch (error) {
      alert(error.message);
    }
  });

document.getElementById("cancelBtn").onclick = function () {
  modal.style.display = "none";
};

// 회원삭제 (모달)
// 회원삭제
// document.addEventListener("DOMContentLoaded", function () {
//   const deleteButton = document.getElementById("deleteButton");
//   const modal = document.getElementById("deleteModal");
//   const cancelButton = document.getElementById("cancelButton");
//   const confirmDeleteButton = document.getElementById("confirmDeleteButton");
//   const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');

//   deleteButton.addEventListener("click", function () {
//     modal.style.display = "block";
//   });

//   cancelButton.addEventListener("click", function () {
//     modal.style.display = "none";
//   });

//   confirmDeleteButton.addEventListener("click", async function () {
//     modal.style.display = "none";
//     const checkedUserIds = Array.from(checkboxes)
//       .filter((checkbox) => checkbox.checked)
//       .map((checkbox) => checkbox.parentNode.nextElementSibling.textContent);

//     try {
//       const response = await fetch("http://localhost:3000/user", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ids: checkedUserIds }),
//       });

//       if (!response.ok) {
//         throw new Error("삭제 요청 실패");
//       }
//       console.log("response", response);
//       alert("사용자가 성공적으로 삭제되었습니다.");
//       await fetchAndDisplayUsers();
//     } catch (error) {
//       console.error("삭제 요청 중 에러가 발생했습니다:", error);
//     }
//   });
// });

// 삭제버튼 클릭시
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
      <td><i class="fa-solid fa-pen"></i></td>
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
const prevPageBtn = document.querySelector(".pagination .fa-arrow-left");
const nextPageBtn = document.querySelector(".pagination .fa-arrow-right");

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

// 정보수정
document.addEventListener("DOMContentLoaded", function () {
  const userTableBody = document.getElementById("user-table-body");

  // 정보수정 모달
  const modifyModal = document.getElementById("modifyModal");
  const modifyBtn = document.getElementById("modifyBtn");
  const modifySpan = document.querySelector("#modifyModal .close");

  modifyBtn.onclick = function () {
    modifyModal.style.display = "block";
  };

  modifySpan.onclick = function () {
    modifyModal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modifyModal) {
      modifyModal.style.display = "none";
    }
  };

  // 정보 수정 모달 채우기
  userTableBody.addEventListener("click", function (event) {
    const target = event.target;
    if (
      target &&
      target.tagName === "I" &&
      target.classList.contains("fa-pen")
    ) {
      const row = target.closest("tr");
      const userId = row.querySelector("td:nth-child(2)").textContent.trim(); // 사용자 ID 가져오기

      // Modify 버튼 클릭 시 해당 유저 정보를 모달에 채워 넣기
      document.getElementById("userId").value = userId;

      modifyModal.style.display = "block";
    }
  });

  // 정보 수정 Submit
  document
    .getElementById("modifySubmitBtn")
    .addEventListener("click", async function () {
      const userId = document.getElementById("userId").value;
      const originalPassword =
        document.getElementById("originalPassword").value;
      const newPassword = document.getElementById("newPassword").value;
      const newPhone = document.getElementById("newPhone").value;
      const newName = document.getElementById("newName").value;
      const newOrganization = document.getElementById("newOrganization").value;

      try {
        const response = await fetch(`http://localhost:3000/user/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: originalPassword,
            newPassword: newPassword,
            name: newName,
            phone: newPhone,
            organization: newOrganization,
          }),
        });

        if (!response.ok) {
          throw new Error("회원 정보 수정에 실패했습니다.");
        }

        const data = await response.json();
        alert("회원 정보가 성공적으로 수정되었습니다.");
        modifyModal.style.display = "none";
        // 필요에 따라 페이지 새로고침 또는 다른 작업 수행
      } catch (error) {
        alert(error.message);
      }
    });
  document.getElementById("modifyCancelBtn").onclick = function () {
    modal.style.display = "none";
  };
});

// ＊ 유저 목록조회 (페이지네이션X)
// document.addEventListener("DOMContentLoaded", async function () {
//   const userTableBody = document.getElementById("user-table-body");

//   async function fetchAndDisplayUsers() {
//     try {
//       const response = await fetch("http://localhost:3000/user");
//       const users = await response.json();
//       userTableBody.innerHTML = "";

//       users.forEach((user) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td><input type="checkbox" /></td>
//             <td>${user.id}</td>
//             <td>${user.name}</td>
//             <td>${user.email}</td>
//             <td>${user.phone}</td>
//             <td>${user.organization}</td>
//             <td><i class="fa-solid fa-pen"></i></td>
//           `;
//         userTableBody.appendChild(row);
//       });
//       // tbody에 추가한 체크박스들을 선택하는 이벤트 리스너 등록
// const checkboxes = document.querySelectorAll(
//   'tbody input[type="checkbox"]'
// );
// checkboxes.forEach((checkbox) => {
//   checkbox.addEventListener("change", function () {
//     checkSelectAll();
//   });
// });
//     } catch (error) {
//       console.error("유저목록 조회중 에러가 발생했습니다:", error);
//     }
//   }

//   await fetchAndDisplayUsers();

//   // 전체 선택 체크박스 이벤트 리스너 등록
//   const selectAllCheckbox = document.getElementById("selectAll");
//   selectAllCheckbox.addEventListener("change", function () {
//     const checkboxes = document.querySelectorAll(
//       'tbody input[type="checkbox"]'
//     );
//     checkboxes.forEach((checkbox) => {
//       checkbox.checked = selectAllCheckbox.checked;
//     });
//   });

//   // 전체 체크박스 체크 여부 확인 및 처리
//   function checkSelectAll() {
//     const checkboxes = document.querySelectorAll(
//       'tbody input[type="checkbox"]'
//     );
//     const allChecked = Array.from(checkboxes).every(
//       (checkbox) => checkbox.checked
//     );
//     selectAllCheckbox.checked = allChecked;
//   }
// });
