const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShowCaseSchema = new Schema(
  {
    path: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    active: { type: Boolean, default: true },
  },
  {
    strict: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const ShowCase = mongoose.model("Showcase", ShowCaseSchema);

ShowCase.findAll = async function (type = "all") {
  const matchQuery = {};
  if (type == "active") {
    Object.assign(matchQuery, { active: true });
  }
  const [total, all] = await Promise.all([
    this.countDocuments(matchQuery),
    this.aggregate([
      {
        $match: matchQuery,
      },
      {
        $sort: { created_at: -1 },
      },
    ]),
  ]);

  return [total, all];
};

module.exports = ShowCase;
