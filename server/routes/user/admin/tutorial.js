const express = require('express');
const router = express.Router();
const { Tutorial } = require('../../../db');

router.post('/addTutorial', async (req, res) => {
    const [maxIdItem] = await Tutorial.find().sort({id: -1}).limit(1);
    const id = maxIdItem.id + 1;
    const newTutorial = req.body;
    Object.assign(newTutorial, { id: id });
    try {
        await Tutorial.create(newTutorial);
        return res.status(200).send({success: true})
    } catch (error) {
        return res.status(500).send({success: false})
    }
})

router.post('/updateTutorial/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Tutorial.findOneAndUpdate({id: id}, req.body);
        return res.status(200).send({success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).send({success: false})
    }
})

router.delete('/deleteTutorial/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Tutorial.findOneAndDelete({id: id});
        return res.status(200).send({success: true})
    } catch (error) {
        return res.status(500).send({success: false})
    }
})

module.exports = router;