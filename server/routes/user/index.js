const express = require("express");
const router = express.Router();
const { uploadFile } = require("../../controllers/backblaze");
const { readLocaleData } = require("../../controllers/fileOperation");
const {
  User,
  License,
  FashionPurchase,
  Locale,
  CompanyUser,
  Company,
} = require("../../db");

router.use("/like", require("./like"));
router.use("/company", require("./company"));
router.use("/order", require("./order"));
router.use("/product", require("./product"));
router.use("/fashionAssetSkus", require("./fashionAssetSkus"));
router.use("/fashionTags", require("./fashionTag"));
router.use("/cart", require("./cart"));
router.use("/review", require("./review"));
router.use("/question", require("./question"));

router.get("/getLocales", async (req, res) => {
  try {
    const locales = await Locale.find();
    return res.status(200).send({ success: true, locales });
  } catch (err) {
    return res.status(500).send({ success: false });
  }
});

router.get("/getLocalesData", async (req, res) => {
  try {
    const localesData = readLocaleData();
    return res.status(200).send({ success: true, localesData });
  } catch (err) {
    return res.status(500).send({ success: false, err });
  }
});

router.get("/findSkuSales/:promotionState/:page", async (req, res) => {
  const { promotionState, page } = req.params;

  try {
    const user = await User.findOne({ _id: req.user.user._id });
    const skuSales = await FashionPurchase.findSkusSales(
      user.id,
      promotionState == 1,
      page
    );
    return res.status(200).send({ success: true, skuSales });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false });
  }
});

router.get("/findLicenseByUser", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.user._id });
    const userLicense = await License.find(
      { service: 1, type: user.account_type },
      { name: 1 }
    );
    return res.status(200).send({ success: true, userLicense });
  } catch (error) {
    return res.status(500).send({ success: false });
  }
});

router.get("/getUserProfile", async (req, res) => {
  try {
    const user = await User.getProfile(req.user.user.email);
    return res.status(200).send({ success: true, user: user });
  } catch (error) {
    return res.status(500).send({ success: false, user: null });
  }
});

router.post("/updateProfile", async (req, res) => {
  console.log("req user", req.user);
  try {
    const user = await User.updateProfile(req.user.user._id, req.body);
    return res.status(200).send({ success: true, data: null });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, data: null });
  }
});

router.get("/getFashionPublisher", async (req, res) => {
  try {
    const publisher = await User.findAppUsers(0);
    return res.status(200).send({ success: true, publisher: publisher });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, publisher: null });
  }
});

const uploadUserImage = async (file) => {
  const filePath = await uploadFile(file, "image");
  return filePath;
};

router.post("/uploadUserImage", async (req, res) => {
  const file = req.files.file;
  try {
    const user = req.user.user;
    const filePath = await uploadUserImage(file);
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { avatar: filePath }
    );
    return res.status(200).send({ success: true });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({ success: false });
  }
});

const isAdmin = async (req, res, next) => {
  const user = await User.findOne(
    { _id: req.user.user._id },
    { account_type: 1 }
  );
  if (user.account_type == 1) {
    return next();
  } else {
    return res
      .status(500)
      .send({ success: false, msg: "The user is not admin" });
  }
};

router.get("/getUserCompanyInfo", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.user._id });
    const userCompanies = await CompanyUser.findCompanyByUser(user.id);

    return res.status(200).send({ success: true, userCompanies });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ success: false, msg: err });
  }
});

router.use("/admin", isAdmin, require("./admin/index"));

module.exports = router;
