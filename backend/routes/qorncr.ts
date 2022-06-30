const QorNcr = require("../models/QorNcr.ts");
const routerQ = require("express").Router();

// get all itns
routerQ.get("/all", async (req, res) => {
  try {
    const qorNcrs = await QorNcr.find({});
    res.status(200).json(qorNcrs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create an itn
routerQ.post("/create", async (req, res) => {
  const newQorNcr = new QorNcr(req.body);

  try {
    const saveQorNcr = await newQorNcr.save();
    console.log("BOOOOODY", saveQorNcr);
    res.status(200).json(saveQorNcr);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get itn by id
routerQ.get("/:id", async (req, res) => {
  try {
    console.log("44", req.params);
    const qorNcr = await QorNcr.findById(req.params.id);
    res.status(200).json(qorNcr);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update an itn
routerQ.put("/:id", async (req, res) => {
  try {
    const updateQorNcr = await QorNcr.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateQorNcr);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete an itn
routerQ.delete("/:id", async (req, res) => {
  console.log("sdsd", req.params);

  try {
    const qorNcr = await QorNcr.findById(req.params.id);
    try {
      await qorNcr.delete();
      res.status(200).json("Itn has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get itn by search
routerQ.get("/search/q=:value", async (req, res) => {
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

module.exports = routerQ;
