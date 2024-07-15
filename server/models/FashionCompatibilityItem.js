const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FashionCompatibilityItemSchema = new Schema(
    {
        id: { type: Number, required: true, unique: true },
        title: { type: String, required: true },
        set_id: { type: Number, required: true },
        enabled: { type: Number, required: true }
    }
)

const FashionCompatibilityItem = mongoose.model('FashionCompatibilityItem', FashionCompatibilityItemSchema);

module.exports = FashionCompatibilityItem;