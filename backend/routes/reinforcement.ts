const Reinforcement = require("../models/Reinforcement.ts");
const routerR = require("express").Router();

// get all Concrete
routerR.get("/all", async (req: any, res: any) => {
  try {
    const reinforcements = await Reinforcement.find({});

    res.status(200).json(reinforcements);
  } catch (err: any) {
    res.status(500).json(err);
  }
});

// get Concrete by location
routerR.get("/all/:itp", async (req: any, res: any) => {
  try {
    const { itp } = req.params;

    const reinforcements = await Reinforcement.find({
      itp: { $regex: itp, $options: "i" },
    }).populate("relatedItn");
    // console.log("res.data", reinforcements);
    res.status(200).json(reinforcements);
  } catch (err: any) {
    res.status(500).json(err);
  }
});

// create an concrete
routerR.post("/create", async (req: any, res: any) => {
  console.log("aaaaaaa", req.body);
  const newReinforcement = new Reinforcement(req.body);
  try {
    const saveReinforcement = await newReinforcement.save();
    res.status(200).json(saveReinforcement);
  } catch (err: any) {
    res.status(500).json(err);
  }
});

// get concrete by id
routerR.get("/:id", async (req: any, res: any) => {
  try {
    const reinforcement = await Reinforcement.findById(req.params.id);

    res.status(200).json(reinforcement);
  } catch (err: any) {
    res.status(500).json(err);
  }
});

// // update an itn
routerR.put("/:id", async (req: any, res: any) => {
  try {
    const updateReinforcement = await Reinforcement.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateReinforcement);
  } catch (err: any) {
    res.status(500).json(err);
  }
});

// delete an Concrete
routerR.delete("/:id", async (req: any, res: any) => {
  try {
    const reinforcement = await Reinforcement.findById(req.params.id);
    try {
      await reinforcement.delete();
      res.status(200);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err: any) {
    res.status(500).json(err);
  }
});

// //get itn by search
// router.get("/search/q=:value", async (req, res) => {
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

module.exports = routerR;
