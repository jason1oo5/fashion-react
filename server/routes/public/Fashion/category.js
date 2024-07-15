const express = require('express');
const router = express.Router();
const { FashionCategory } = require('../../../db');

router.get('/getAllCategories',  async(req, res) => {
    // console.log("get all categories", FashionCategory)
    try {        
        const categories = await FashionCategory.findAll();            
        return res.status(200).send({msg: "success", data: categories});
    } catch (error) {   
        console.log("error", error)
        return res.status(500).send({msg:"failed", data: null});
    }    
});

module.exports = router;