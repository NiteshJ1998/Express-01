const express = require("express"); // importing express
const users = require("./MOCK_DATA.json");
const app = express(); // Handler function

// HTML response
app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
      </ul>`;
  return res.send(html);
});

//REST API
// Dynamic id
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    //Edit user with id
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    //Delete
    return res.json({ status: "pending" });
  })
  .post((req, res) => {
    //POST
    return res.json({ status: "pending" });
  });

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/users/:first_name", (req, res) => {
  const first_name = req.params.first_name;
  const user = users.find((user) => user.first_name === first_name);
  return res.json(user);
});
app.listen(8000, () => console.log("server started"));
