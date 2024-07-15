const express = require('express');
const router = express.Router();
const { 
    User, 
    License, 
    EvoPoint, 
    AuthParty, 
    DataSet, 
    DataSetStructure, 
    FashionProduct, 
    FashionProductFile,
    Order,
    FashionPurchase,
    FashionAssetSkus,
    DataSetRecord    
 } = require('../../db');


router.post('/get_profile', async (req, res) => {
    const service_id = req.query.service_id;
    console.log('query param', service_id);
    const user = await User.findOne({email: req.user.user.email});
    try {
        const userProfile = await User.get_profile(user.email);
        const license = await License.findOne({service: service_id});
        const evoPoint = await EvoPoint.findOne({user_id: user.id});        
        Object.assign(userProfile, 
            {
                license_id: license.type,
                points: evoPoint.points,
                karma: {
                    evokit: evoPoint.evokit,
                    evofashion: evoPoint.evofashion,
                    evoexpo: evoPoint.evoexpo
                }
            });
        
        return res.status(200).send({success: true, msg: "Login successful.", user: userProfile});
    } catch (error) {
        console.log("evovor get profile", error);
        return res.status(500).send({success:false});
    }
})

router.post('/auth_party', async(req, res) => {
    const party_name = req.query.party_name;
    const party_id = req.query.party_id;    
    try {        
        const authParty = await AuthParty.findOne({party_name: party_name, party_id: party_id});
        return res.status(200).send({success: true, id: authParty.user_id});
    } catch (error) {
        return res.status(500).send({success: false});
    }

})

router.post('/auth_party_add', async (req, res) => {
    const { email, password, party_id, party_name } = req.query;    
    try {        
        const user = await User.findOne({email: email});
        const existAuthParty = await AuthParty.findOne({user_id: user.id, party_name: party_name});
        if(existAuthParty) {
            return res.status(500).send({success: true, msg: 'already bound party'});
        }
        const [maxIdItem] = await AuthParty.find().sort({id: -1}).limit(1);
        const authParty = {
            id: maxIdItem.id + 1,
            user_id: user.id,
            party_id: party_id,
            party_name: party_name
        }
        await AuthParty.create(authParty);
        return res.status(200).send({success: true, msg: "bind successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).send({success: false, msg: "Failed"});
    }
})

router.post('/register', async (req, res, next) => {
    const { name, email, password, password_confirmation, locale } = req.query;
    
})

router.post('/resetPassword', async (req, res) => {
    const email = req.query.email;
})

router.post('/license_skus', async (req, res) => {
    const { license_id, service_id } = req.query;    
    try {
        const license = await License.findOne({service: service_id, id: license_id});        
        return res.status(200).send({
            success: true,
            msg: "Fetched successfully",
            license_name: license.name,
            license_type_code: license.type,
            license_skus: []
        })
    } catch (error) {
        return res.status(500).send({success: false});
    }
})

router.post('/sku_my', async (req, res) => {
    const { service_id, platform_id } = req.query;   
    const sku_array = [];
    const app_sku_array = [];
    try {
        const user = await User.findOne({email: req.user.user.email});
        const orders = await Order.getAcceptedOrders(user.id);
        await Promise.all(orders.map(async(order) => {
            const purchase = await FashionPurchase.findOne({order_id: order.id}, {product_id: 1});            
            if(purchase) {
                const product_file = await FashionProductFile.findOne({product_id: purchase.product_id, platform_id: platform_id}, {version: 1});
                const product = await FashionProduct.findOne({id: purchase.product_id}, {sku: 1, in_app: 1});
                if(product) {
                    if(product.in_app==0) {
                        sku_array.push({sku: product.sku, version: product_file.version});
                    } 
                    if(product.in_app==1) {
                        app_sku_array.push({sku: product.sku, version: product_file.version});
                    }
                }                
            }            
        }))
        
        return res. status(200).send({success: true, msg: "Fetched successfully", sku_array, app_sku_array});
    } catch (error) {
        console.log(error);
        return res.status(500).send({success: false});
    }
})

router.post('/asset_sku_my', async (req, res) => {
    const { service_id } = req.query;
    try {
        const user = await User.findOne({email: req.user.user.email});
        const orders = await Order.getAcceptedOrders(user.id);
        let asset_sku_array = [];
        await Promise.all(orders.map(async(order) => {
            const purchase = await FashionPurchase.findOne({order_id: order.id}, {product_id: 1});
            if(purchase) {
                const asset_skus = await FashionAssetSkus.find({product_id: purchase.product_id}, {asset: 1})
                const assets = [];
                asset_skus.map((item) => {
                    assets.push(item.asset);
                })                
                const product = await FashionProduct.findOne({id: purchase.product_id}, {in_app: 1});
                if(product.in_app==0&&asset_skus.length>0) {
                    asset_sku_array = [...asset_sku_array, ...assets];
                }                
            }            
        }))
        return res.status(200).send({success: true, asset_sku_array});
    } catch (error) {
        console.log("asset_sku_my", error);
        return res.status(500).send({success: false});
    }
})

router.post('/sku_get', async (req, res) => {
    const { service_id, sku_array, platform_id } = req.query;
    try {
        
    } catch (error) {
        
    }
})

router.post('/sku_inapp', async (req, res) => {
    const { service_id } = req.query;
    try {
        const sku_array = await FashionProduct.find({in_app : 1}, {sku: 1, title: 1});
        if(sku_array.length>0) {
            return res.status(200).send({success: true, msg: "Fetched successfully", sku_array});
        } else {
            return res.status(500).send({success: false, msg: "Could not find sku_array"});
        }
    } catch (error) {
        return res.status(500).send({success: false, msg: "Could not find sku_array"});
    }
})

router.post('/purchase_inapp', async (req, res) => {
    const { service_id } = req.query;
    try {
        
    } catch (error) {
        
    }
})

router.post('/property', async (req, res) => {
    const { service_id, key, type, group } = req.query;
    try {
        
    } catch (error) {
        
    }
})

router.post('/userdata_add', async (req, res) => {    
    const { service_id, dataset, data } = req.query;
    try {
        const dataSet = await DataSet.find({service: service_id, name: dataset, set_type: 0})
        return ;
    } catch (error) {
        
    }
})

// router.post('/userdata_add', async (req, res) => {
    
// })

router.post('/userdata_get', async (req, res) => {    
    const { service_id, dataset } = req.query;
    let out = [];
    try {
        const user_dataset= await DataSet.findAllByName(dataset, service_id, 0);
        const dataRecords = await DataSetRecord.getDataSetRecords(service_id, 0);
        let fields = user_dataset[0].structures;        

        dataRecords.map((recordItem, index) => {                
            recordItem.dataSetItem.map((item) => {                              
                const s_field = fields.find((field) => field.id == item.structure_id);                
                if(s_field) {
                    const key = s_field.name;
                    const object = { };      
                    object[key] = item.value;
                    Object.assign(object, {db_key: recordItem.id});
                    out.push(object);
                }                
            })
        })        

        return res.status(200).send({success: true, msg: "Fetched successfully", out});
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false, msg: "Cannot find items"});
    }
})

router.post('/userdata_remove', async (req, res) => {
    const { db_key } = req.query;
    try {
        
    } catch (error) {
        
    }
})

router.post('/appdata_add', async (req, res) => {
    // const { service_id } = req.query;
    try {
        
    } catch (error) {
        
    }
})

router.post('/appdata_get', async (req, res) => {
    const { service_id, dataset } = req.query;
    // try {
    //     const appDataSet = await DataSet.find({ service: service_id, name: dataset }, {id: 1});
    //     const data = [];
    //     await Promise.all(appDataSet.map(async(item) => {
    //         const datasetStructure = await DataSetStructure.find({set_id: item.id});
    //         console.log("app data get", datasetStructure)
            
    //     }))
    //     return res.status(200).send({success: true, appDataSet});
    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).send({success: false});
    // }    
})

module.exports = router;