const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FashionProductImageSchema = new Schema(
    {
        id: { type: Number, required: true },
        product_id: { type: Number, required: true },
        path: { type: String, required: true },
        type: { type: Number, default: null }
    }
)

const FashionProductImage = mongoose.model('FashionProductImage', FashionProductImageSchema);

module.exports = FashionProductImage;