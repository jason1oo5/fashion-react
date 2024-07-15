const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FashionProductPromotionSchema = mongoose.model({
    fashion_product_id: { type: Number, ref: 'FashionProduct' },
    fashion_promotion_id: { type: Number, ref: 'FashionPromotion' }
})

const FashionProductPromotion = mongoose.model('FashionProductPromotion', FashionProductPromotionSchema);

module.exports = FashionProductPromotion;