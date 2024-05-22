document.addEventListener("DOMContentLoaded", function () {
  fetchTotalUserCount();
  setupUserEventListeners();
});

async function fetchTotalUserCount() {
  try {
    const response = await fetch("http://localhost:3000/user/count");
    const data = await response.json();
    const totalUsersElement = document.getElementById("total-users");
    const totalUsersText = totalUsersElement.textContent;
    const totalUsersValue = data;
    const styledText = `
        <span style="color: inherit;">${totalUsersText}</span> <span style="color: #DD7012; font-weight: bold;">${totalUsersValue}</span>
      `;
    totalUsersElement.innerHTML = styledText;
  } catch (error) {
    console.log("에러가 발생했습니다:", error);
  }
}

async function searchUser() {
  const searchInput = document.getElementById("user-searchInput").value.trim();
  if (searchInput !== "") {
    try {
      await fetchUser(searchInput);
    } catch (error) {
      alert(error.message);
      console.error("에러 발생", error.message);
    }
  }
}

async function fetchUser(searchInput) {
  try {
    const response = await fetch(`http://localhost:3000/user/${searchInput}`);
    const user = await response.json();
    if (!response.ok) {
      throw new Error(user.message);
    }

    const userTableBody = document.getElementById("user-table-body");
    userTableBody.innerHTML = "";

    const row = document.createElement("tr");
    row.innerHTML = `
        <td><input type="checkbox" /></td>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.organization}</td>
      `;

    row.addEventListener("click", function (event) {
      if (event.target.tagName.toLowerCase() === "td") {
        displayUserDetailModal(user);
      }
    });

    userTableBody.appendChild(row);
  } catch (error) {
    throw new Error("사용자를 찾을 수 없습니다.");
  }
}

function setupUserEventListeners() {
  const searchButton = document.getElementById("user-search-button");
  searchButton.addEventListener("click", searchUser);

  const searchInput = document.getElementById("user-searchInput");
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchUser();
    }
  });
}

function displayUserDetailModal(user) {
  const detailUserId = document.getElementById("detailUserId");
  const detailUserName = document.getElementById("detailUserName");
  const detailUserEmail = document.getElementById("detailUserEmail");
  const detailUserPhone = document.getElementById("detailUserPhone");
  const detailUserOrganization = document.getElementById(
    "detailUserOrganization"
  );

  detailUserId.value = user.id;
  detailUserName.value = user.name;
  detailUserEmail.value = user.email;
  detailUserPhone.value = user.phone;
  detailUserOrganization.value = user.organization;

  const userDetailModal = document.getElementById("userDetailModal");
  const span = userDetailModal.querySelector(".close");

  userDetailModal.style.display = "block";

  span.addEventListener("click", function () {
    userDetailModal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === userDetailModal) {
      userDetailModal.style.display = "none";
    }
  });

  const modifyBtn = document.getElementById("modifyBtn");
  modifyBtn.addEventListener("click", function () {
    userDetailModal.style.display = "none";
    openModifyModal(user);
  });

  const cancelBtn = document.getElementById("modifycancelBtn");
  cancelBtn.addEventListener("click", function () {
    userDetailModal.style.display = "none";
  });
}

function openModifyModal(user) {
  const modifyModal = document.getElementById("modifyModal");

  const originalPasswordInput = document.getElementById("originalPassword");
  const newPasswordInput = document.getElementById("newPassword");
  const newNameInput = document.getElementById("newName");
  const newPhoneInput = document.getElementById("newPhone");
  const newOrganizationInput = document.getElementById("newOrganization");

  newNameInput.value = user.name;
  newPhoneInput.value = user.phone;
  newOrganizationInput.value = user.organization;

  modifyModal.style.display = "block";

  const modifyCancelBtn = document.getElementById("modifyCancelBtn");
  modifyCancelBtn.addEventListener("click", function () {
    modifyModal.style.display = "none";
  });

  const modifyBtnConfirm = document.getElementById("modifyBtnConfirm");
  modifyBtnConfirm.addEventListener("click", async function () {
    const originalPassword = originalPasswordInput.value.trim();
    const newPassword = newPasswordInput.value.trim();
    const newName = newNameInput.value.trim();
    const newPhone = newPhoneInput.value.trim();
    const newOrganization = newOrganizationInput.value.trim();

    if (!originalPassword) {
      alert("기존 비밀번호를 입력해 주세요.");
      return;
    }

    const updatedUser = {
      originalPassword,
      newPassword,
      name: newName,
      phone: newPhone,
      organization: newOrganization,
    };

    try {
      const response = await fetch(`http://localhost:3000/user/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message);
      }

      alert("사용자 정보가 성공적으로 수정되었습니다.");
      modifyModal.style.display = "none";
    } catch (error) {
      alert(error.message);
      console.error("사용자 정보 수정 에러", error.message);
    }
  });
}
