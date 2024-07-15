const express = require('express');
const router = express.Router();
const { Tutorial } = require('../../../db');

router.get('/getTutorials', async (req, res) => {
    try {
        const tutorials = await Tutorial.find();
        return res.status(200).send({success: true, tutorials});
    } catch (error) {
        return res.status(500).send({success: false});
    }
})

module.exports = router;