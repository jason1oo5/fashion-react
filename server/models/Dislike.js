const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DislikeSchema = new Schema({
    id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    dislikeable_id: { type: Number, required: true },
    dislikeable_type: { type: String, required: true }, 
    },
    {
        strict: false,
        timestamps: { createdAt: "created_at",  updatedAt: "updated_at" }
    }
    )

const Dislike = mongoose.model('Dislike', DislikeSchema);



module.exports = Dislike;