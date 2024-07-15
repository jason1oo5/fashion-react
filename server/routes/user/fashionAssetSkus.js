const express = require("express");
const router = express.Router();
const {
  FashionAssetSkus,
} = require("../../db");

router.get("/getAssetSkusList", async (req, res) => {
  try {
    const fashionAssetSkus = await FashionAssetSkus.find();
    return res
      .status(200)
      .send({ success: true, fashionAssetSkus: fashionAssetSkus });
  } catch (error) {
    return res.status(500).send({ success: false, fashionAssetSkus: null });
  }
});

module.exports = router;
