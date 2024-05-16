// const express = require("express");
// const path = require("path");

// const app = express();

// app.use("/static", express.static(path.resolve(__dirname, "static")));

// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "index.html"));
// });

// const port = 3001;
// app.listen(port, () => {
//   console.log(`server ${port} is open!`);
// });

//  //  //  //  //

const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3001;

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
