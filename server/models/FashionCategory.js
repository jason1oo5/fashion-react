const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FashionCategorySchema = new Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    isQuickFilter: { type: Number, required: true },
    order: { type: Number, required: true },
    disabled: { type: Number, required: true }
})

const FashionCategory = mongoose.model('FashionCategory', FashionCategorySchema);

FashionCategory.findAll = async function() {    
        const categories = await this.find();
        // console.log("all categories",categories)             
        return categories;
}


module.exports = FashionCategory;