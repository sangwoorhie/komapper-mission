const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://52.78.218.195:3000",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname)));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "html/users.html"));
});

app.get("/users.html", (req, res) => {
  res.sendFile(path.join(__dirname, "html/users.html"));
});

app.get("/logs.html", (req, res) => {
  res.sendFile(path.join(__dirname, "html/logs.html"));
});

app.listen(port, () => {
  console.log(port, "=> server open!");
});
