import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// <-- 로그 -->
// 1. 로그 목록조회
// 2. 로그 단일조회
// 3. 로그 Total 수

// <-- 유저 -->
// 1. 유저 목록조회
// 2. 유저 단일조회
// 3. 유저 Total 수
// 4. 회원가입
// 5. 아이디 중복확인
// 6. 유저 정보수정
// 7. 회원 삭제
