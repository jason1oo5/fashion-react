const express = require('express');
const router = express.Router();
const { Cart, User } = require('../../db');

router.get('/getCartItems', async(req, res) => {    
    const c_user = await User.findById(req.user.user._id);    
    try {
        const cartItems = await Cart.findByUser(c_user.id);
        return res.status(200).send({success: true, cartItems});
    } catch (error) {
        return res.status(500).send({success: false, cartItems: []});
    }
})

router.post('/addToCart', async (req, res) => {
    const { product_id } = req.body;
    const c_user = await User.findById(req.user.user._id);    
    const [maxIdItem] = await Cart.find().sort({id: -1}).limit(1);
    const exist = await Cart.findOne({product_id: product_id, user_id: c_user.id});
    if(exist) {
        return res.status(200).send({success: false, msg: "Already add in cart"});
    }
    let id = 1;
    if(maxIdItem) {
        id = maxIdItem.id + 1;
    } else {
        id = 1;
    }
    try {
        const newItem = {
            id: id,
            user_id: c_user.id,
            product_id: product_id
        }
        await Cart.create(newItem);
        const updatedCartItems = await Cart.findByUser(c_user.id);
        return res.status(200).send({success: true, updatedCartItems});
    } catch (error) {
        console.log('add to cart', error)
        return res.status(500).send({success: false});
    }
})

router.delete('/deleteCartItem/:cart_id', async (req, res) => {
    const { cart_id } = req.params;
    const c_user = await User.findById(req.user.user._id);
    try {
        await Cart.findOneAndDelete({id: cart_id});
        const updatedCartItems = await Cart.findByUser(c_user.id);
        return res.status(200).send({success: true, updatedCartItems});
    } catch (error) {
        console.log(error)
        return res.status(500).send({success: false});
    }
})

module.exports = router;
