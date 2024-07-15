const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocaleSchema = new Schema({
    locale: { type: String, required: true, unique: true },
    locale_name: { type: String, required: true },        
})

const Locale = mongoose.model('Locale', LocaleSchema);

module.exports = Locale;