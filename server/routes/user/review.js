const express = require("express");
const router = express.Router();
const { Review } = require("../../db");

router.post("/addReview", async (req, res) => {
  const { feedback, product_id } = req.body;
  console.log("feedback", feedback, req.user.user._id);
  try {
    const newReview = {
      user_id: req.user.user._id,
      feedback: feedback,
      product_id: product_id,
    };
    const result = await Review.create(newReview);
    return res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ success: false });
  }
});

router.get("/getReviews/:product_id", async (req, res) => {
  const { product_id } = req.params;
  try {
    const reviews = await Review.findUserReview(product_id);
    return res.status(200).send({ success: true, reviews });
  } catch (err) {
    return res.status(500).send({ success: false });
  }
});

module.exports = router;
