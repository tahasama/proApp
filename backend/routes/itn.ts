const Itn = require("../models/Itn.ts");
const router = require("express").Router();

// get all itns
router.get("/all", async (req, res) => {
  try {
    const itns = await Itn.find({});
    res.status(200).json(itns);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get itns by location
router.get("/all/:itp", async (req, res) => {
  try {
    const { itp } = req.params;

    const itns = await Itn.find({ itp: { $regex: itp, $options: "i" } });
    res.status(200).json(itns);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create an itn
router.post("/createItn", async (req, res) => {
  const newItn = new Itn(req.body);
  try {
    const saveItn = await newItn.save();
    res.status(200).json(saveItn);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get itn by id
router.get("/:itp/:id", async (req, res) => {
  try {
    const itn = await Itn.findById(req.params.id);
    res.status(200).json(itn);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update an itn
router.put("/:id", async (req, res) => {
  try {
    const updateItn = await Itn.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateItn);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete an itn
router.delete("/:id", async (req, res) => {
  try {
    const itn = await Itn.findById(req.params.id);
    try {
      await itn.delete();
      res.status(200).json("Itn has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get itn by search
router.get("/search/q=:value", async (req, res) => {
  try {
    const { value } = req.params;

    const itn = await Itn.find({
      $or: [
        { num: { $regex: value, $options: "i" } },
        { itp: { $regex: value, $options: "i" } },
        { routine: { $regex: value, $options: "i" } },
        { subLocation: { $regex: value, $options: "i" } },
      ],
    });

    res.status(200).json(itn);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
