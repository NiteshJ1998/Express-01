const express = require("express"); // importing express
const users = require("./MOCK_DATA.json");
const app = express(); // Handler function

app.get("/", (req, res) => {
  return res.send("hello from home page");
});

app.get("/users", (req, res) => {
  return res.json(users);
});

app.get("/about", (req, res) => {
  return res.json("about page you are seeing rn");
});

app.listen(8000, () => console.log("server started"));
