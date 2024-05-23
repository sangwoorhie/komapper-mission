import Users from "./view/usersView.js";
import Logs from "./view/logsView.js";

// 주어진 경로를 정규식 패턴으로 변환
const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

// 매칭된 경로에서 파라미터를 추출
const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  // 키-값 쌍을 가진 객체를 반환
  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

// 지정된 URL로 이동하고 라우터를 호출
const navigateTo = (url) => {
  history.pushState(null, null, url); // 브라우저 히스토리를 변경
  router(); // 라우터 함수를 호출
};

// 경로 변경을 처리하고 뷰를 렌더링하는 라우터 함수
const router = async () => {
  const routes = [
    { path: "/", view: Users },
    { path: "/user", view: Users },
    // { path: "/user/:id", view: Users },
    { path: "/log", view: Logs },
    // { path: "/log/:id", view: Logs },
  ];

  // 현재 URL과 각 경로를 테스트하여 매칭을 시도
  const pageMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  // 첫 번째로 매칭된 경로를 찾기
  let match = pageMatches.find((pageMatch) => pageMatch.result !== null);

  // 매칭된 경로가 없으면 기본 경로('/')로 설정
  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  // 매칭된 경로의 뷰를 인스턴스화하고 HTML 콘텐츠를 가져와서 삽입
  const view = new match.route.view(getParams(match));
  document.querySelector("#container-box").innerHTML = await view.getHtml();
};

// 뒤로 가기/앞으로 가기 네비게이션 이벤트를 처리
window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  // data-link 속성을 가진 링크를 클릭했을 때 이벤트를 처리
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href); // navigateTo 함수를 호출하여 URL을 변경
    }
  });

  router();
});
