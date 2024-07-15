const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FashionPromotionSchema = new Schema(
    {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    sale_price: { type: Number, default: null },
    sale_percent: { type: Number, default: null },
    disabled: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },    
    },
    {
        strict: false,
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
)

const FashionPromotion = mongoose.model('FashionPromotion',FashionPromotionSchema);

module.exports = FashionPromotion;