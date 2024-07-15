const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanyUserSchema = new Schema(
  {
    id: { type: Number, required: true },
    company_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    previous_roles: { type: String, default: "" },
    apply_roles: { type: Number, default: 0 },
    admin: { type: Number, default: 0 },
  },
  {
    strict: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const CompanyUser = mongoose.model("CompanyUser", CompanyUserSchema);

CompanyUser.findCompanyByUser = function (user_id) {
  const companies = this.aggregate([
    {
      $match: { user_id: Number(user_id) },
    },
    {
      $lookup: {
        from: "companies",
        localField: "company_id",
        foreignField: "id",
        as: "company",
      },
    },
    {
      $group: {
        _id: "$company_id",
        apply_roles: { $first: "$apply_roles" },
        admin: { $first: "$admin" },
        company: { $first: "$company" },
      },
    },
  ]);

  return companies;
};

module.exports = CompanyUser;
