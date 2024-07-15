const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FashionPriceSchema = new Schema({
    price: { type: String, required: true }
})

const FashionPrice = mongoose.model('FashionPrice', FashionPriceSchema);