const User = require("../models/User");
const routerU = require("express").Router();
var nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

var transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    type: "OAuth2",
    user: process.env.UserOwner,
    clientId: process.env.ClientId,
    clientSecret: process.env.ClientSecret,
    refreshToken: process.env.RefreshToken,
    accessToken: process.env.AccessToken,
  },
});

// create a project
routerU.post("/", async (req: any, res: any) => {
  const newUser = new User(req.body);
  console.log("pleaaaaase", newUser);

  var mailOptions = {
    from: process.env.UserOwner,
    to: process.env.UserOwner,
    subject: "request authorization to browse the app",
    text: `a new user with the email: ${req.body.email}, request an access to the app.
    click on this link to authorize this user's access https://maatof-qc.netlify.app/authorized/${newUser._id}/${req.body.email}`,
  };
  var mailOptions2 = {
    from: process.env.UserOwner,
    to: `${req.body.email}`,
    subject: "request authorization to browse the app",
    text: `Your inscription will be examined
    if you are an authorized member you will receive an email very shortly ,
    ginving you access to the app, Thank you for your patience`,
  };
  const UserExists = User.findOne(
    { uid: req.body.uid },
    async (error: any, result: any) => {
      if (!error) {
        if (!result) {
          try {
            const saveUser = await newUser.save();
            transporter.sendMail(
              mailOptions,
              function (error: any, info: { response: any }) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              }
            );
            console.log("yes it did");
            transporter.sendMail(
              mailOptions2,
              function (error: any, info: { response: any }) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email2 sent: " + info.response);
                }
              }
            );

            res.status(200).json(saveUser);
          } catch (err: any) {
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
routerU.put("/:id/:email", async (req: any, res: any) => {
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
      from: process.env.UserOwner,
      to: `${req.params.email}`,
      subject: "Welcome among us!!",
      text: `Congratulations, your request has been fullfilled, you can now access the app, https://maatof-qc.netlify.app/`,
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }),
      res.status(200).json(updateUser);
  } catch (err: any) {
    res.status(500).json(err);
  }
});

module.exports = routerU;
