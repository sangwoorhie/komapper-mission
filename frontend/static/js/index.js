import Logs from "./view/logs.js";
import Users from "./view/users.js";
import NotFound from "./view/NotFound.js";

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

// 정규식 객체
const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(
    match.route.path.matchAll(/:(\w+)/g).map((result) => result[1])
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const router = async () => {
  const routes = [
    // Users
    { path: "/", view: Users },
    { path: "/user", view: Users },
    { path: "/user/register", view: () => console.log("register") },
    { path: "/user/idcheck", view: () => console.log("idcheck") },
    { path: "/user/count", view: () => console.log("user count") },
    { path: "/user/:id", view: Users },

    // Logs
    { path: "/log", view: Logs },
    { path: "/log/count", view: () => console.log("log count") },
    { path: "/log/:id", view: Logs },
  ];

  // 경로 확인
  const pageMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = pageMatches.find((pageMatch) => pageMatch.result !== null);
  if (!match) {
    match = {
      route: location.pathname, // 경로가 불일치할 경우 // routes[0]
      result: [location.pathname],
    };
    const view = new NotFound();
    document.querySelector("#app").innerHTML = await view.getHtml();
  } else {
    const view = new match.route.view(getParams(match));
    document.querySelector("#app").innerHTML = await view.getHtml();
  }

  console.log(match.route.view);
};

// 뒤로가기 할 때 데이터 나오게 하기 위함
window.addEventListener("popstate", () => {
  router();
});

// 링크를 클릭했을 때
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
