const express = require('express');
const router = express.Router();
const { DataSet, DataSetStructure } = require('../../../db');

router.get('/getDataSet/:set_type', async(req, res) => {
    const { set_type } = req.params;
    const services = [1, 2, 3, 4];
    const dataSet = {};
    try {
        await Promise.all(services.map(async(service) => {
            dataSet[service] = await DataSet.findAllByType(set_type, service);
        }))        
        // console.log('getAppDataSet', dataSet);
        return res.status(200).send({ success: true, dataSet });
    } catch (error) {
        console.log('getAppDataSet', error);
        return res.status(500).send({success: false, data: null})
    }
})

router.post('/createDataSet/:set_type', async(req, res) => {
    const { set_type } = req.params;    
    const newDataSet = req.body;        
    const newDataSetStructure = req.body.dataStructure;
    console.log(newDataSet);
    try {
        const [maxItem] = await DataSet.find().sort({id: -1}).limit(1);
        const id = maxItem.id + 1;
        delete newDataSet.dataStructure;
        Object.assign(newDataSet, { set_type: set_type, id: id });
        const dataset_res = await DataSet.create(newDataSet);
        const dataStructure_res = await DataSetStructure.createManyDataStructure(newDataSetStructure, id);
        return res.status(200).send({success: true, data:[ dataset_res, dataStructure_res]});
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false});
    }
})

router.delete('/deleteDataSet/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await DataSet.findOneAndDelete({id: id});
        await DataSetStructure.deleteMany({set_id: id});
        return res.status(200).send({ success: true });
    } catch (error) {
        return res.status(500).send({success: false})
    }
})

module.exports = router;