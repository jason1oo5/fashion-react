const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSetItemSchema = new Schema({
    id: { type: Number, required: true },
    record_id: { type: Number, required: true },
    structure: { type: Number, required: true },
    value: { type: String, required: true },
})

const DataSetItem = mongoose.model('DataSetItem', DataSetItemSchema);

module.exports = DataSetItem;