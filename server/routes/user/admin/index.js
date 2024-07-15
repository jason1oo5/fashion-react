const express = require("express");
const { updateLocaleData } = require("../../../controllers/fileOperation");
const router = express.Router();
const {
  User,
  FashionPurchase,
  FashionAssetSkus,
  FashionProduct,
  Order,
  Locale,
} = require("../../../db");

router.use("/dataSet", require("./dataSet"));
router.use("/role", require("./role"));
router.use("/user", require("./user"));
router.use("/license", require("./license"));
router.use("/tutorial", require("./tutorial"));
router.use("/platform", require("./platform"));
router.use("/company", require("./company"));
router.use("/showcase", require("./showcase"));

router.get("/getOwnedSkus/:type/:id/:page", async (req, res) => {
  const { type, id, page } = req.params;
  try {
    const purchased = await FashionPurchase.getUserOwnedSkus(id, type, page);
    return res.status(200).send({ success: true, purchased });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ success: false });
  }
});

router.post("/giveAssetSkus/:type/:id", async (req, res) => {
  const { assetSkus } = req.body;
  const { type, id } = req.params;
  console.log("asset Skus", assetSkus);
  let stateData = false;
  try {
    // Company State
    await Promise.all(
      assetSkus.map(async (sku) => {
        const product = await FashionProduct.findOne({ sku: sku });
        const purchased = await FashionPurchase.findPurchased(id, product.id);
        const cancelPurchase = await FashionPurchase.findCanceledPurchase(
          id,
          product.id
        );
        if (purchased) {
          return purchased;
        } else if (cancelPurchase) {
          await FashionPurchase.findOneAndUpdate(
            { id: cancelPurchase.id },
            { payment_status: 3 }
          );
          stateData = true;
          return cancelPurchase;
        } else {
          const [orderMaxIdItem] = await Order.find().sort({ id: -1 }).limit(1);
          const order = {
            id: orderMaxIdItem.id + 1,
            type: Number(type),
            entity_id: id,
            userid: id,
            title: "Company",
            amount: product.price,
            state: 3,
            period: 0,
          };

          const newOrder = await Order.create(order);
          const [skuMaxIdItem] = await FashionAssetSkus.find()
            .sort({ id: -1 })
            .limit(1);
          const skuPurchase = {
            id: skuMaxIdItem.id + 1,
            product_id: product.id,
            product_type: "product",
            sale_price: 0,
            owner_id: id,
            date: Date.now(),
            quantity: 1,
            order_id: newOrder.id,
            payment_status: 3,
            discount: 1,
          };
          stateData = true;
          await FashionPurchase.create(skuPurchase);
          const d_data = {
            user_id: id,
            purchased: 0,
          };
        }
      })
    );
    if (!stateData) {
      return res.status(200).send({ success: false, msg: "Already purchased" });
    }
    return res.status(200).send({ success: true, msg: "successfully ordered" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, msg: "Error occured" });
  }
});

router.post("/addLocale", async (req, res) => {
  const locale = req.body;
  try {
    const result = await Locale.create(locale);
    return res.status(200).send({ success: true, result });
  } catch (err) {
    return res.status(500).send({ success: false });
  }
});

router.delete("/removeLocale/:locale_id", async (req, res) => {
  const { locale_id } = req.params;
  try {
    const result = await Locale.findByIdAndDelete(locale_id);
    return res.status(200).send({ success: true, result });
  } catch (err) {
    return res.status(500).send({ success: false });
  }
});

router.post("/updateLocaleValue", async (req, res) => {
  const updatedLocales = req.body;
  console.log("updated ", updatedLocales);
  try {
    updateLocaleData(updatedLocales);
    // const json = readLocaleData()
    return res
      .status(200)
      .send({ success: true, msg: "updated successfully", json });
  } catch (err) {
    return res.status(500).send({ success: false, err });
  }
});

module.exports = router;
