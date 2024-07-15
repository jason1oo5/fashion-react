const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductTagSchema = new Schema({
    id: {type: Number, required: true },
    product_id: {type: Number, required: true },
    inventory_id: {type: Number, required: true },
    name: { type: String, required: true }
})

const ProductTag = mongoose.model('ProductTag', ProductTagSchema);

module.exports = ProductTag