const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema(
    {
        id: { type: Number, required: true, unique: true },
        user_id: { type: Number, required: true },
        saveable_id: { type: Number, required: true },
        saveable_type: { type: String, default: "App\\Models\\Fashion\\Product" },        
    },
    {
        strict: false,
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
)

const Favorite = mongoose.model('Favorite', FavoriteSchema);


Favorite.findUserFavorite = function (user_id) {
    const matchQuery = { 
        user_id: Number(user_id),
        saveable_type: "App\\Models\\Fashion\\Product"
     }
    const favorites = this.aggregate([
        {
            $match: matchQuery
        },
        {
            $lookup: {
                from: "fashionproducts",
                localField: "saveable_id",
                foreignField: "id",
                as: "fashionProduct"
            }
        },
        {
            $lookup:
            {
                from: "likes",
                localField: "saveable_id",
                foreignField: "likeable_id",
                as: "productLike"
            }

        },
        {
            $lookup:
            {
                from: "fashionproductimages",
                localField: "saveable_id",
                foreignField: "product_id",
                as: "productImage"
            }
        },
        {
            $project: {
                'fashionProduct.title': 1,
                'productLike.id': 1,
                'productImage.path': 1
            }
        }
    ]);

    return favorites;
}


module.exports = Favorite;