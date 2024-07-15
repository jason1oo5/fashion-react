const express = require('express');
const router = express.Router();
const { Platform } = require('../../../db');

router.get('/getPlatforms', async (req, res) => {
    try {
        const platforms = await Platform.findAll();
        return res.status(200).send({ success: true, platforms });
    } catch (error) {
        return res.status(500).send({ success: true, platforms: [] });
    }
})

module.exports = router;