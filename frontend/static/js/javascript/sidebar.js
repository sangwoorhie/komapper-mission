document.addEventListener("DOMContentLoaded", function () {
  // URL 경로를 기반으로 활성화할 사이드바 항목 결정
  const path = window.location.pathname;
  const userSidebar = document.getElementById("second-sidebar");
  const logSidebar = document.getElementById("third-sidebar");
  const firstBreadcrumb = document.querySelector(".first-breadcrumb");
  const secondBreadcrumb = document.querySelector(".second-breadcrumb");

  // 사이드바에 따라서 사이드바 색상과 breadcrumb text를 변경시킴
  if (path === "/user") {
    userSidebar.classList.add("active-sidebar");
    firstBreadcrumb.textContent = "Users";
    secondBreadcrumb.textContent = "Mission > Users";
  } else if (path === "/log") {
    logSidebar.classList.add("active-sidebar");
    firstBreadcrumb.textContent = "Logs";
    secondBreadcrumb.textContent = "Mission > Logs";
  }

  // 사이드바 클릭 이벤트 리스너
  userSidebar.addEventListener("click", function () {
    this.classList.add("active-sidebar");
    logSidebar.classList.remove("active-sidebar");
    firstBreadcrumb.textContent = "Users";
    secondBreadcrumb.textContent = "Mission > Users";
  });

  logSidebar.addEventListener("click", function () {
    this.classList.add("active-sidebar");
    userSidebar.classList.remove("active-sidebar");
    firstBreadcrumb.textContent = "Logs";
    secondBreadcrumb.textContent = "Mission > Logs";
  });
});
