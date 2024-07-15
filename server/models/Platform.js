const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlatformSchema = new Schema(
    {
        id: { type: Number, required: true },
        name: { type: String, required: true }, 
        deleted_at: { type: String, default: null },
    },
    {
        strict: false,
        timestamps: { createdAt: "created_at", updatedAt: "udpated_at" }
    }
)

const Platform = mongoose.model('Platform', PlatformSchema);

Platform.findAll = async function() {    
    const categories = await this.find();
    // console.log("all categories",categories)             
    return categories;
}

module.exports = Platform;