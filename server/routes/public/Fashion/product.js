const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { initialize } = require("../../../controllers/backblaze");
const { FashionProduct, FashionProductImage, User } = require("../../../db");
const { Product_Mock } = require("../../../helpers/mock");

router.post("/getAllProduct", async (req, res) => {
  const data = req.body;
  let user;
  if (req.user) {
    [user] = await User.find({ _id: req.user.user._id });
  } else {
    user = "";
  }
  const [total, products] = await FashionProduct.findAll(
    user.id,
    data.userProduct,
    data.page,
    data.perPage,
    data.type,
    data.filterBy,
    data.sortBy,
    data.minPrice,
    data.maxPrice,
    data.search
  );
  const s3_auth = await initialize();
  return res
    .status(200)
    .send({
      message: "success",
      data: { s3_auth: s3_auth, total: total, products: products },
    });
});

router.get("/getProductDetail/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await FashionProduct.findProductDetailById(id);
    return res.status(200).send({ msg: "success", data: product });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "failed", data: null });
  }
});

module.exports = router;
