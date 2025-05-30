const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

//Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/backend")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("Connection failed", err));

//Scheama
const userSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

//Midleware - Plugin
//For Every request this plugin will work
// this plugin basically pull the data from postman and created json object and put on request.body
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   console.log("hello fgffrom middleware 1 ");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("hello from middleware 1 ");
//   return res.end("hey fdsfdsadfsfads");
// });
//Routes;
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
      <ul>
      ${allDbUsers
        .map((user) => `<li>${user.firstName} -${user.email}</li>`)
        .join("")}
      </ul>
      `;
  res.send(html);
});

//REST API
app
  .route("/api/users")
  .get(async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
  })
  .patch(async (req, res) => {
    //Edit user with id
    await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
    return res.json({ status: "success" });
  })
  .delete((req, res) => {
    //Delete user  with id
    return res.json({ status: "Pending" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All field are required..." });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ msg: "kaam kar raha hai" });
});

// app.post("/api/users", (req, res) => {
//   const body = req.body;
//   users.push({ ...body, id: users.length + 1 });
//   fs.writeFile("./Mock_DATA.json", JSON.stringify(users), (err, data) => {
//     return res.json({ status: "Success", id: users.length });
//   });
// });

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ error: " user not found" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    //Edit user with id
    await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
    return res.json({ status: "success" });
  });

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
