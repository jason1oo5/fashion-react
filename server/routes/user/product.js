const express = require("express");
const router = express.Router();
// const { body, validationResult } = require('express-validator');
const { uploadFile, removeFile } = require("../../controllers/backblaze");
const {
  FashionProduct,
  User,
  FashionAssetSkus,
  FashionProductFile,
  FashionProductImage,
  FashionPurchase,
} = require("../../db");

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

router.post("/addProduct", async (req, res) => {
  const new_product_detail = req.body;
  try {
    const user = await User.findOne({ _id: req.user.user._id });
    const [maxIdItem] = await FashionProduct.find().sort({ id: -1 }).limit(1);
    Object.assign(new_product_detail, { user_id: user.id });
    new_product_detail.id = maxIdItem.id + 1;
    await FashionProduct.create(new_product_detail);

    return res
      .status(200)
      .send({ success: true, msg: "Product added successfully" });
  } catch (error) {
    console.log("errror", error);
    return res.status(500).send({ success: false, msg: "Additional failed" });
  }
});

router.post("/updateProduct", async (req, res) => {
  const updatedProduct = req.body;
  const user = User.findOne({ email: updatedProduct.publisher });
  try {
    await FashionAssetSkus.findOneAndUpdate(
      { product_id: updatedProduct.id },
      { asset: updatedProduct.assetSkus }
    );
    delete updatedProduct.assetSkus;
    delete updatedProduct.publisher;
    Object.assign(updatedProduct, { user_id: user.id });
    await FashionProduct.updateProduct(updatedProduct);
    return res.status(200).send({ success: true, data: null });
  } catch (error) {
    console.log("update product", error);
    return res.status(500).send({ success: false, data: null });
  }
});

const uploadProductFile = async (files, product_id) => {
  const [maxIdItem] = await FashionProduct.find().sort({ id: -1 }).limit(1);
  if (!Array.isArray(files)) {
    const filePath = await uploadFile(files, "file");
    const newId = maxIdItem.id + 1;
    const fileInfo = {
      id: newId,
      name: files.name,
      product_id: product_id,
      path: filePath,
    };
    return await FashionProductFile.create(fileInfo);
  } else {
    const fileInfoList = [];
    await Promise.all(
      files.map(async (file, index) => {
        const filePath = await uploadFile(file, "file");
        const newId = maxIdItem.id + index + 1;
        fileInfoList.push({
          id: newId,
          name: file.name,
          product_id: product_id,
          path: filePath,
        });
      })
    );
    return await FashionProductFile.insertMany(fileInfoList);
  }
};

const uploadProductFileImages = async (files, product_id) => {
  const [maxIdItem] = await FashionProduct.find().sort({ id: -1 }).limit(1);
  if (!Array.isArray(files)) {
    const filePath = await uploadFile(files, "image");
    const newId = maxIdItem.id + 1;
    const newFileImage = { id: newId, product_id: product_id, path: filePath };
    return await FashionProductImage.create(newFileImage);
  } else {
    const fileInfoList = [];
    await Promise.all(
      files.map(async (file, index) => {
        const filePath = await uploadFile(file, "image");
        const newId = maxIdItem.id + index + 1;
        fileInfoList.push({
          id: newId,
          product_id: product_id,
          path: filePath,
        });
      })
    );
    return await FashionProductImage.insertMany(fileInfoList);
  }
};

router.post("/uploadProductFile", async (req, res) => {
  const file = req.files;
  const [maxIdItem] = await FashionProduct.find().sort({ id: -1 }).limit(1);
  const newProductId = maxIdItem.id;
  try {
    if (file.files) {
      await uploadProductFile(file.files, newProductId);
    }
    if (file.images) {
      await uploadProductFileImages(file.images, newProductId);
    }
    return res.status(200).send({ success: true, data: req.body });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, data: null });
  }
});

const removeProductFiles = async (filePath) => {
  //
  if (Array.isArray(filePath)) {
    await Promise.all(
      filePath.map(async (path) => {
        await removeFile(path);
        await FashionProductFile.findOneAndRemove({ path: path });
      })
    );
    return;
  } else {
    await removeFile(filePath);
    await FashionProductFile.findOneAndRemove({ path: filePath });
    return;
  }
};

const removeProductImages = async (fileName) => {
  //
  if (Array.isArray(fileName)) {
    await Promise.all(
      fileName.map(async (name) => {
        await removeFile(name);
        await FashionProductImage.findOneAndRemove({ path: name });
      })
    );
    return;
  } else {
    await removeFile(fileName);
    await FashionProductImage.findOneAndRemove({ path: fileName });
    return;
  }
};

router.post("/removeProductFile", async (req, res) => {
  const { filePathToRemove, imageNameToRemove } = req.body;
  try {
    if (filePathToRemove) {
      await removeProductFiles(filePathToRemove);
      console.log("step 1");
    }
    if (imageNameToRemove) {
      // console.log('step 2')
      await removeProductImages(imageNameToRemove);
    }
    return res.status(200).send({ success: true, data: [] });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, data: [] });
  }
});

router.post("/updateProductFile/:product_id", async (req, res) => {
  const { product_id } = req.params;
  const file = req.files;
  try {
    if (file.files) {
      await uploadProductFile(file.files, product_id);
    }
    if (file.images) {
      await uploadProductFileImages(file.images, product_id);
    }
    return res.status(200).send({ success: true, data: req.body });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, data: null });
  }
});

router.delete("/deleteProduct/:product_id", async (req, res) => {
  const { product_id } = req.params;
  try {
    await FashionProduct.findOneAndDelete({ _id: product_id });
    return res.status(200).send({ success: true, msg: "successfully deleted" });
  } catch (error) {
    return res.status(500).send({ success: false, msg: "Failed" });
  }
});

router.get("/purchasedProducts", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.user._id });
    const purchasedProducts_id = await FashionPurchase.find(
      { owner_id: user.id },
      { product_id: 1 }
    );
    const products = [];
    // const total = 0;
    await Promise.all(
      purchasedProducts_id.map(async (idx) => {
        const [total, product] = await FashionProduct.findPurchasedProductById(
          idx.product_id
        );
        if (product[0] != null) {
          products.push(product[0]);
        }
      })
    );
    return res
      .status(200)
      .send({ success: true, msg: "successfully fetched", products });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, msg: "failed" });
  }
});

module.exports = router;
