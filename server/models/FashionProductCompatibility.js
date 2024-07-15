const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FashionProductCompatibilitySchema = new Schema({
    id: { type: Number, required: true, unique: true },
    data_set: { type: String, requried: true },
    record_id: { type: Number, required: true },
    product_id: { type: String, required: true }
})

const FashionProductCompatibility = mongoose.model('FashionProductCompatibility', FashionProductCompatibilitySchema);

module.exports = FashionProductCompatibility;