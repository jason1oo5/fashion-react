const express = require("express");
const router = express.Router();
const { ShowCase } = require("../../../db");

router.get("/getShowcase/:type", async (req, res) => {
  const { type } = req.params;
  try {
    const [total, showCase] = await ShowCase.findAll(type);
    return res.status(200).send({ success: true, total, showCase });
  } catch (err) {
    return res.status(500).send({ success: false, error: err });
  }
});

module.exports = router;
