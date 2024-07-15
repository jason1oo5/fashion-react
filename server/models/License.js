const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LicenseSchema = new Schema({
    id: { type: Number, required: true },
    service: { type: Number, required: true },
    type: { type: Number, required: true },
    name: { type: String, default: "Trial" },
})

const License = mongoose.model('License', LicenseSchema);

module.exports = License;