const express = require("express");
const path = require("path");

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "static")));

// SinglePage이므로, 모든 경로에서 index.html을 불러옴
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server ${PORT} is open!`);
});
