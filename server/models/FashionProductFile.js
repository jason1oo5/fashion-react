const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FashionProductFileSchema = new Schema(
    {
        id: { type: Number, required: true },
        product_id: { type: Number, required: true },
        platform_id: { type: Number, default: 1 },
        version: { type: Number, default: 1 },
        is_edited: { type: Number, default: 1 },
        is_enabled:  { type: Number, default: 1 },
        name: { type: String, required: true },
        path: { type: String, required: true }
    }
)

const FashionProductFile = mongoose.model('FashionProductFile', FashionProductFileSchema);

module.exports = FashionProductFile;