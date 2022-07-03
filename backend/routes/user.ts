const User = require("../models/User");
const routerU = require("express").Router();

// create a project
routerU.post("/", async (req, res) => {
  const newUser = new User(req.body);

  const UserExists = User.findOne(
    { uid: req.body.uid },
    async (error, result) => {
      if (!error) {
        if (!result) {
          try {
            const saveUser = await newUser.save();
            res.status(200).json(saveUser);
          } catch (err) {
            res.status(500).json(err);
          }
        }
      }
    }
  );

  if (!UserExists) {
  }
});

// get project by uid
routerU.get("/:uid", async (req, res) => {
  try {
    const user = await User.find({
      uid: { $regex: req.params.uid, $options: "i" },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get projects search by title and desription
// routerU.get("/search/q=:value", async (req, res) => {
//   try {
//     const { value } = req.params;
//     console.log("value", value);
//     // const project = await Project.find({
//     //   title: { $regex: title, $options: "i" },
//     // });
//     const project = await User.find({
//       $or: [{ email: { $regex: value, $options: "i" } }],
//     });

//     console.log("project", project);
//     res.status(200).json(project);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// update project
routerU.put("/:id", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = routerU;
