const Concrete = require("../models/Concrete");
const routerC = require("express").Router();

// get all Concrete
routerC.get("/all", async (req: any, res: any) => {
  try {
    // const concretes = await Concrete.find({}).populate("relatedItn");
    const concretes = await Concrete.find({});

    res.status(200).json(concretes);
  } catch (err: any) {
    res.status(500).json(err);
  }
});

// get Concrete by location
routerC.get("/all/:itp", async (req: any, res: any) => {
  try {
    const { itp } = req.params;

    const concretes = await Concrete.find({
      itp: { $regex: itp, $options: "i" },
    });
    // .populate("relatedItn");
    res.status(200).json(concretes);
  } catch (err: any) {
    res.status(500).json(err);
  }
});

// create an concrete
routerC.post("/create", async (req: any, res: any) => {
  const newConcrete = new Concrete(req.body);
  try {
    const saveConcrete = await newConcrete.save();
    res.status(200).json(saveConcrete);
  } catch (err: any) {
    res.status(500).json(err);
  }
});

// get concrete by id
routerC.get("/:itp/:id", async (req: any, res: any) => {
  try {
    // const concrete = await Concrete.findById(req.params.id).populate(
    //   "relatedItn"
    // );
    const concrete = await Concrete.findById(req.params.id);

    res.status(200).json(concrete);
  } catch (err: any) {
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

// delete an Concrete
routerC.delete("/:id", async (req: any, res: any) => {
  try {
    const concrete = await Concrete.findById(req.params.id);
    try {
      await concrete.delete();
      res.status(200);
    } catch (err: any) {
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

module.exports = routerC;
