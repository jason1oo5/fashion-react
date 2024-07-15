const express = require("express");
const { uploadFile, removeFile } = require("../../../controllers/backblaze");
const router = express.Router();
const { ShowCase } = require("../../../db");

router.post("/add", async (req, res) => {
  try {
    const filePath = await uploadFile(req.files.imgFile, "image");
    const updated = {
      path: filePath,
      title: req.body.title,
      description: req.body.description,
      active: true,
    };
    const result = await ShowCase.create(updated);
    return res.status(200).send({ success: true });
  } catch (err) {
    return res.status(500).send({ success: false, error: err });
  }
});

// router.post("/update", async (req, res) => {
//   const updated = req.body;
//   try {
//     const res = await ShowCase.findByIdAndUpdate(updated._id, updated);
//     return res.status(200).send({ success: true, res });
//   } catch (err) {
//     return res.status(500).send({ success: false, error: err });
//   }
// });

router.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await ShowCase.findOneAndDelete({ _id: _id });
    await removeFile(result.path);
    return res.status(200).send({ success: true, result });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ success: false, error: err });
  }
});

module.exports = router;
