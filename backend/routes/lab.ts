const Lab = require("../models/Lab.ts");
const routerL = require("express").Router();

// get all itns
routerL.get("/all", async (req, res) => {
  try {
    const labs = await Lab.find({});
    res.status(200).json(labs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create an itn
routerL.post("/create", async (req, res) => {
  const newLab = new Lab(req.body);

  try {
    const saveLab = await newLab.save();
    console.log("BOOOOODY", saveLab);
    res.status(200).json(saveLab);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get itn by id:
routerL.get("/:id", async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id);
    res.status(200).json(lab);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update an itn
routerL.put("/:id", async (req, res) => {
  try {
    console.log("her you go", req.body);
    const updatelab = await Lab.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatelab);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete an itn
routerL.delete("/:id", async (req, res) => {
  console.log("sdsd", req.params);

  try {
    const lab = await Lab.findById(req.params.id);
    try {
      await lab.delete();
      res.status(200).json("Itn has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// //get itn by search
// routerL.get("/search/q=:value", async (req, res) => {
//   try {
//     const { value } = req.params;

//     const itn = await Itn.find({
//       $or: [
//         { num: { $regex: value, $options: "i" } },
//         { itp: { $regex: value, $options: "i" } },
//         { routine: { $regex: value, $options: "i" } },
//         { subLocation: { $regex: value, $options: "i" } },
//       ],
//     });

//     res.status(200).json(itn);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = routerL;
