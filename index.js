const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/backend")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("Connection failed", err));

//Scheama
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

//Midleware - Plugin
//For Every request this plugin will work
// this plugin basically pull the data from postman and created json object and put on request.body
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("hello fgffrom middleware 1 ");
  next();
});

app.use((req, res, next) => {
  console.log("hello from middleware 1 ");
  return res.end("hey fdsfdsadfsfads");
});
//Routes
app.get("/users", (req, res) => {
  const html = `
      <ul>
      ${users.map((user) => `<li>${user.job_title}</li>`).join("")}
      </ul>
      `;
  res.send(html);
});

//REST API
app
  .route("/api/users")
  .get((req, res) => {
    return res.json(users);
  })
  .patch((req, res) => {
    //Edit user with id
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    //Delete user  with id
    return res.json({ status: "Pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./Mock_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id: users.length });
  });
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
