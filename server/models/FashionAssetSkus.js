const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FashionAssetSkusSchema = new Schema(
    {
    id: { type:Number, required: true, unique: true },
    asset: { type: String, required: true },
    product_id: { type: Number, required: true },
    },
    {
        strict: false,
        timestamps: { createdAt: "craeted_at", updatedAt: "updated_at" }
    }
)

const FashionAssetSkus = mongoose.model('FashionAssetSkus', FashionAssetSkusSchema);

module.exports = FashionAssetSkus;