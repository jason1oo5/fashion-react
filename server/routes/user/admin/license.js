const express = require('express');
const router = express.Router();
const { License } = require('../../../db');
const services = [1, 2, 3, 4];
router.get('/getLicense', async (req, res) => {
    const licenses = {};
    try {
        await Promise.all(services.map(async(service) => {
            licenses[service] = await License.find({service: Number(service)});
        }))
        return res.status(200).send({success: true, licenses});
    } catch (error) {
        return res.status(500).send({success: false});
    }
})

router.delete('/deleteLicense/:license_id', async (req, res) => {
    const { license_id } = req.params;
    try {
        await License.deleteOne({id: license_id});
        return res.status(200).send({success: true});
    } catch (error) {
        return res.status(500).send({success: false});
    }
})

router.post('/addLicense', async (req, res) => {
    const [maxIdItem] = await License.find().sort({id: -1}).limit(1);
    const id = maxIdItem.id + 1;
    const newLicense = req.body;
    Object.assign(newLicense, { id: id })
    try {        
        await License.create(newLicense);
        return res.status(200).send({ success:true });
    } catch (error) {
        console.log(error);
        return res.status(500).send({success: false});
    }
})

router.post('/updateLicense/:license_id', async (req, res) => {
    const { license_id } = req.params;
    try {
        await License.findOneAndUpdate({id: license_id}, req.body);
        return res.status(200).send({ success: true });
    } catch (error) {
        return res.status(500).send({success: false});
    }
})

module.exports = router;