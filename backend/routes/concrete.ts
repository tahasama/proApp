const Concrete = require("../models/Concrete.ts");
const routerC = require("express").Router();

// get all Concrete
routerC.get("/all", async (req, res) => {
  try {
    const concretes = await Concrete.find({}).populate("relatedItn");

    res.status(200).json(concretes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get Concrete by location
routerC.get("/all/:itp", async (req, res) => {
  try {
    const { itp } = req.params;

    const concretes = await Concrete.find({
      itp: { $regex: itp, $options: "i" },
    }).populate("relatedItn");
    res.status(200).json(concretes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create an concrete
routerC.post("/create", async (req, res) => {
  const newConcrete = new Concrete(req.body);
  try {
    const saveConcrete = await newConcrete.save();
    res.status(200).json(saveConcrete);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get concrete by id
routerC.get("/:itp/:id", async (req, res) => {
  try {
    const concrete = await Concrete.findById(req.params.id).populate(
      "relatedItn"
    );

    res.status(200).json(concrete);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // update an itn
// router.put("/:id", async (req, res) => {
//   try {
//     const updateItn = await Itn.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updateItn);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // delete an itn
// router.delete("/:id", async (req, res) => {
//   try {
//     const itn = await Itn.findById(req.params.id);
//     try {
//       await itn.delete();
//       res.status(200).json("Itn has been deleted...");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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

module.exports = routerC;