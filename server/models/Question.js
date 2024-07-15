const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    product_id: { type: Number, required: true },
    title: { type: String, default: "Question" },
    content: { type: String, required: true }
})

const Question = mongoose.model('Question', QuestionSchema);

Question.findUserQuestion = function (product_id) {
    const matchQuery = { product_id: Number(product_id) };
    console.log("matchquery", matchQuery);
    const questions = this.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "questionUser"
            }
        },
        {
            $match: matchQuery
        }, 
        {
            $project: {
                "questionUser.name": 1,
                "questionUser.avatar": 1,
                title: 1,
                content: 1
            }
        }
    ]);
    
    return questions;
}


module.exports = Question;