const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema(
  {
    id: { type: Number, required: true },
    likeable_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    likeable_type: { type: String, required: true },
  },
  {
    strict: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Like = mongoose.model("Like", LikeSchema);

// Like.createIndexes({ user_id: 1, likeable_id: 1, likeable_type: 1 });

module.exports = Like;
