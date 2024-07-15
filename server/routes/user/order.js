const express = require('express');
const router = express.Router();
const { Order, User } = require('../../db');

router.get("/getOrderList/:type/:entity_id", async(req, res) => {
    const { type, entity_id } = req.params;
    const [user] = await User.find({_id: req.user.user._id});    
    try {
        let order_entity_id = user.id;
        if(type == 2) {
            order_entity_id = entity_id;
        }
        console.log("order", type, entity_id)
        const userOrders = await Order.find({entity_id: order_entity_id, type: type});   
        return res.status(200).send({success: true, userOrders: userOrders});
    } catch (error) {
        return res.status(500).send({success: false, userOrders: null});
    }    
})

router.post('/addOrderInfo', async (req, res) => {    
    const orderInfo = req.body;
    try {
        const [user] = await User.find({_id: req.user.user._id});            
        const [maxIdItem] = await Order.find().sort({id: -1}).limit(1);
        const new_id = maxIdItem.id + 1;
        Object.assign(orderInfo, {id: new_id, userid: user.id, entity_id: user.id, type: 1 });
        await Order.create(orderInfo);
        return res.status(200).send({success: true, msg: "successfully added"});
    } catch (error) {
        return res.status(500).send({success: false, msg: "order failed"});
    }
})

module.exports = router;