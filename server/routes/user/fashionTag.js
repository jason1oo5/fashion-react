const express = require('express');
const router = express.Router();
const { FashionTag } = require('../../db');

router.get('/getTags', async(req, res) => {
    try {
        const tags = await FashionTag.find();
        return res.status(200).send({success: true, tags: tags});
    } catch (error) {
        return res. status(500).send({success: true, tags: null})
    }
})

router.post('/addTags', async (req, res) => {
    try {
        const tagObj = [];
        req.body.tags.map((tag) => {
            const newItem = {
                tag: tag
            }
            tagObj.push(newItem);
        })
        await FashionTag.insertMany(tagObj);
        return res.status(200).send({success: true});
    } catch (error) {
        console.log("addTags", error);
        return res.status(500).send({success: false});
    }
})

module.exports = router