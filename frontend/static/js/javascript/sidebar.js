document.addEventListener("DOMContentLoaded", function () {
  // URL 경로를 기반으로 활성화할 사이드바 항목 결정
  const path = window.location.pathname;
  const userSidebar = document.getElementById("second-sidebar");
  const logSidebar = document.getElementById("third-sidebar");

  // 사이드바가 user일 경우 user 색상 변경, log일 경우 log 색상 변경
  if (path === "/user") {
    userSidebar.classList.add("active-sidebar");
  } else if (path === "/log") {
    logSidebar.classList.add("active-sidebar");
  }

  // 사이드바 클릭 이벤트 리스너
  userSidebar.addEventListener("click", function () {
    this.classList.add("active-sidebar");
    logSidebar.classList.remove("active-sidebar");
  });

  logSidebar.addEventListener("click", function () {
    this.classList.add("active-sidebar");
    userSidebar.classList.remove("active-sidebar");
  });
});
