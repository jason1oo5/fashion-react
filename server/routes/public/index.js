const express = require('express');
const router = express.Router();
const product = require('./Fashion/product');
const { FashionCategory, Platform } = require('../../db');
const { readLocaleData } = require('../../controllers/fileOperation');


router.use('/fashion_product', product);
router.use('/fashion_category', require('./Fashion/category'));
router.use('/tutorial', require('./Fashion/tutorial'));
router.use("/showcase", require("./Fashion/showcase"));
router.use('/platform', require('./Fashion/platform'));

router.get('/getConfigs', async(req, res) => {
    try {
        const categories = await FashionCategory.findAll();
        const platform = await Platform.findAll();
        return res.status(200).send({ success: true, categories: categories, platform: platform })
    } catch (error) {
        console.log(error);
        return res.status(500).send({msg:"failed", data: null});
    }    
})


router.get("/getLocalesData/:locale", async (req, res) => {    
    const { locale } = req.params;
    try {
      const localesData = readLocaleData();
      return res.status(200).send(localesData[locale]);
    } catch (err) {
      return res.status(500).send({ success: false, err });
    }
  });
  

module.exports = router;