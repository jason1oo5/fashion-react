const express = require('express');
const router = express.Router();
const { User, Order } = require('../../../db');

router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.findForAdmin();
        return res.status(200).send({success: true, users});
    } catch (error) {
        return res.status(500).send({success: false, users: null});
    }    

})

router.post('/createNewUser', async (req, res) => {
    const user_data = req.body;
    try {
        const [maxIdItem] = await User.find().sort({id: -1}).limit(1);
        const id = maxIdItem.id + 1;
        Object.assign(user_data, { id: id});
        const new_user = await User.create(user_data);
        return res.status(200).send({success: true, new_user});
    } catch (error) {
        console.log(error);
        return res.status(500).send({success: false, new_user: null});
    }
})

router.delete('/deleteUser/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        await User.deleteOne({id: user_id});
        return res.status(200).send({success: true});
    } catch (error) {
        return res.status(500).send({success: false});
    }
})

router.get('/getUserByAdmin/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const user = await User.getUserByAdmin(user_id);
        return res.status(200).send({success: true, user});
    } catch(error) {
        return res.status(500).send({success: false});
    }
})

router.post('/updateUserByAdmin/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {        
        const updatedUser = {            
            acting_as: req.body.role,
            status: req.body.status
        }
        if(req.body.pwdChanged) {
            Object.assign(updatedUser, { password: '12345678' });
        }
        await User.findOneAndUpdate({id: user_id}, updatedUser);
        return res.status(200).send({success: true});
    } catch(error) {
        return res.status(500).send({success: false});
    }
})

router.get('/getOrderList/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const userOrders = await Order.find({userid: id});   
        return res.status(200).send({success: true, userOrders: userOrders});
    } catch(err) {
        console.log(err)
        return res.status(500).send({success: false, userOrders: null});
    }
})

module.exports = router;