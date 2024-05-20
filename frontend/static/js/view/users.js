import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Users");
  }

  async getHtml() {
    return `
      <div id="first-breadcrumb">Users</div>
      <div id="second-breadcrumb">Mission > Users</div>

      <article id="container-box">
        <div id="inner-box">
          <div id="total-users" class="total-users">Total:</div>
          <div id="search-container">
            <div id="search-box">
              <input type="text" id="searchInput" placeholder=" 조회할 유저 ID를 입력하세요." />
              <div id="magnifier">
                <i class="fa-solid fa-search" id="search-button"></i>
              </div>
            </div>
          </div>
          <br />
          <table id="my-table">
            <colgroup>
              <col class="col1" />
              <col class="col2" />
              <col class="col3" />
              <col class="col3" />
              <col class="col3" />
              <col class="col3" />
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
            <tbody id="user-table-body">
            </tbody>
          </table>
          <div id="bottom-controls">
            <div id="delete-area">
              <button id="delete-button">Delete</button>
            </div>
            <div class="pagination" id="pagination">
              <i class="fa-solid fa-angles-left"></i>
              <i class="fa-solid fa-angle-left"></i>
              <ol id="numbers"></ol>
              <i class="fa-solid fa-angle-right"></i>
              <i class="fa-solid fa-angles-right"></i>
            </div>
            <div id="register-area">
              <button id="register-button">Register</button>
            </div>
          </div>
        </div>
      </article>

      <!-- Modals for user registration and details -->
      <div id="createModal" class="modal">
        <!-- Modal content here -->
      </div>

      <div id="userDetailModal" class="modal">
        <!-- Modal content here -->
      </div>
    `;
  }

  async init() {
    // Fetch total user count
    fetchTotalUserCount();

    // Fetch and display user data
    await onPageChange(1);

    // Set up event listeners
    document
      .getElementById("search-button")
      .addEventListener("click", searchUser);
    document
      .getElementById("searchInput")
      .addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          searchUser();
        }
      });
    document
      .getElementById("selectAll")
      .addEventListener("change", toggleSelectAll);
    document
      .getElementById("delete-button")
      .addEventListener("click", confirmDelete);
    document
      .querySelector(".pagination .fa-angle-left")
      .addEventListener("click", prevPage);
    document
      .querySelector(".pagination .fa-angle-right")
      .addEventListener("click", nextPage);
    document
      .querySelector(".pagination .fa-angles-left")
      .addEventListener("click", firstPage);
    document
      .querySelector(".pagination .fa-angles-right")
      .addEventListener("click", lastPage);

    // Initialize modals
    initModals();
  }
}

function fetchTotalUserCount() {
  fetch("http://localhost:3000/user/count")
    .then((response) => response.json())
    .then((data) => {
      const totalUsersElement = document.getElementById("total-users");
      totalUsersElement.innerHTML = `<span>Total:</span> <span style="color: #DD7012; font-weight: bold;">${data}</span>`;
    })
    .catch((error) => console.error("Error fetching total user count:", error));
}

async function searchUser() {
  const searchInput = document.getElementById("searchInput").value.trim();
  if (searchInput !== "") {
    try {
      const response = await fetch(`http://localhost:3000/user/${searchInput}`);
      const user = await response.json();
      if (!response.ok) throw new Error(user.message);

      const userTableBody = document.getElementById("user-table-body");
      userTableBody.innerHTML = `
        <tr>
          <td><input type="checkbox" /></td>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>${user.organization}</td>
        </tr>
      `;
    } catch (error) {
      alert(error.message);
      console.error("Error searching user:", error);
    }
  }
}

function toggleSelectAll() {
  const checkboxes = document.querySelectorAll(
    "#user-table-body input[type='checkbox']"
  );
  const selectAllCheckbox = document.getElementById("selectAll");
  checkboxes.forEach(
    (checkbox) => (checkbox.checked = selectAllCheckbox.checked)
  );
}

function confirmDelete() {
  const selectedUsers = Array.from(
    document.querySelectorAll("#user-table-body input[type='checkbox']:checked")
  ).map(
    (checkbox) =>
      checkbox.closest("tr").querySelector("td:nth-child(2)").textContent
  );

  if (selectedUsers.length === 0) {
    alert("삭제할 사용자를 선택하세요.");
    return;
  }

  // Show confirmation modal (implementation of modal is not shown here)
  document.getElementById("deleteModal").style.display = "block";
}

async function fetchUserData(page) {
  try {
    const response = await fetch(
      `http://localhost:3000/user?page=${page}&pageSize=10`
    );
    const data = await response.json();
    return { users: data.paginationTotalUsers, totalPages: data.totalPages };
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

async function displayUserData(page) {
  const { users, totalPages } = await fetchUserData(page);
  const tbody = document.getElementById("user-table-body");
  tbody.innerHTML = users
    .map(
      (user) => `
    <tr>
      <td><input type="checkbox" /></td>
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.organization}</td>
    </tr>
  `
    )
    .join("");
}

async function onPageChange(page) {
  await displayUserData(page);
  updatePagination(page);
}

function updatePagination(currentPage) {
  const numbers = document.getElementById("numbers");
  numbers.innerHTML = "";

  const totalPages = 10; // This should be set based on your data
  const maxPageNum = 10;
  const start = Math.max(1, currentPage - Math.floor(maxPageNum / 2));
  const end = Math.min(totalPages, start + maxPageNum - 1);

  for (let i = start; i <= end; i++) {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" ${i === currentPage ? 'class="active"' : ""}>${i}</a>`;
    li.querySelector("a").addEventListener("click", () => onPageChange(i));
    numbers.appendChild(li);
  }
}

function prevPage() {
  if (currentPage > 1) onPageChange(currentPage - 1);
}

function nextPage() {
  if (currentPage < totalPages) onPageChange(currentPage + 1);
}

function firstPage() {
  onPageChange(1);
}

function lastPage() {
  onPageChange(totalPages);
}

function initModals() {
  // Initialize modals here
}
