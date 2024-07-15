const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FashionTagSchema = new Schema({
    tag: { type: String, required: true },
    disabled: { type: Number, default: 0 }
})

const FashionTag = mongoose.model('FashionTag', FashionTagSchema);

module.exports = FashionTag;