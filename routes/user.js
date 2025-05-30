const express = require("express");

const router = express.Router();

//Routes;

//REST API
router
  .route("/")
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

router.post("/", async (req, res) => {
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

router
  .route("/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ error: " user not found" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    //Edit user with id
    await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
    return res.json({ status: "success" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success" });
  });

module.exports = router;
