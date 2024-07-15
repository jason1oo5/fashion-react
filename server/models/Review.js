const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    product_id: { type: Number, required: true },
    feedback: { type: String, required: true }
})

const Review = mongoose.model('Review', ReviewSchema);

Review.findUserReview = function (product_id) {
    const matchQuery = { product_id: Number(product_id) };
    const reviews = this.aggregate([
        {
            $match: matchQuery
        },
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "questionUser"
            }
        }, 
        {
            $project: {
                "questionUser.name": 1,
                "questionUser.avatar": 1,
                feedback: 1
            }
        }
    ]);

    return reviews;
}

module.exports = Review;