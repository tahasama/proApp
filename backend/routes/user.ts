const User = require("../models/User");
const routerU = require("express").Router();
var nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

var transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    type: "OAuth2",
    user: "taha.maatof@gmail.com",
    clientId:
      "812566747763-3cckdbmpe2qcsj9let3jmvni05c6533d.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken:
      "1//04BbAjbw-Og0rCgYIARAAGAQSNwF-L9IraOWU5cywM7sclc3Xv2zVXz9Od-fOdOQ_x3-GDGDhg_rhP-2Ik7RZJTifbseZkkQT2V0",
    accessToken:
      "ya29.a0AVA9y1v9XmhbwgWzVuB65wsLBwNYLERcrMl39wR5osglo8vLDojXYpqQUjMUmoxc1YU_V0rfqzBPFBAcA0fq_xk9Vf3rXBsOLQ1i7GLPfUnRC6w8pwtdF1Fot-QGR0LWW8rCSqcSxZ9Ix7uJN7e57fyX-dQZ",
  },
});

// create a project
routerU.post("/", async (req, res) => {
  const newUser = new User(req.body);
  console.log("pleaaaaase", newUser);

  var mailOptions = {
    from: "taha.maatof@gmail.com",
    to: "taha.maatof@gmail.com",
    subject: "request authirization to browse the app",
    text: `a new user with the email: ${req.body.email}, request an access to the app.
    click on this link to authorize this user's access http://localhost:3000/authorized/${newUser._id}/${req.body.email}`,
  };
  const UserExists = User.findOne(
    { uid: req.body.uid },
    async (error, result) => {
      if (!error) {
        if (!result) {
          try {
            console.log("is thsi user exist????", result);

            const saveUser = await newUser.save();
            console.log("did it work??", saveUser);
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
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
routerU.put("/:id/:email", async (req, res) => {
  try {
    console.log("backend at work", req.params.id);
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    // console.log("backend at work 2222", res);

    var mailOptions = {
      from: "taha.maatof@gmail.com",
      to: `${req.params.email}`,
      subject: "Welcome among us!!",
      text: `Congatulations, your request has been fullfilled, you can no access the app, http://localhost:3000/`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }),
      res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = routerU;
