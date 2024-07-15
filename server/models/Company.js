const mongoose = require('mongoose');
const { Strategy } = require('passport-jwt');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    id: { type: Number, unique: true, required: true },
    name: { type: String, unique: true, required: true },
    multiplier: { type: Number, default: 0 },
    service: { type: Number, default: null },
    license: { type: Number, default: null },
    business_id: { type: String, default: null },
    business_license_photo: { type: String, default: null },
    status: { type: Number, default: 1 }
    },
    {
        strict: false,
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
)

const Company = mongoose.model("Company", CompanySchema);

Company.findEditInfo = function(id) {
    const matchQuery = { id: Number(id) };
    const company = this.aggregate([
        {
            $match: matchQuery
        },
        {
            $lookup: {
                from: 'companyusers',
                localField: 'id',
                foreignField: 'company_id',
                as: 'companyUser'
            }
        },         
        {
            $lookup: {
                from: 'evopoints',
                localField: 'companyUser.user_id',
                foreignField: 'user_id',
                as: 'evopoint'
            }
        },
        {
            $project: {
                id: 1,
                name: 1,
                multiplier: 1,
                service: 1,
                license: 1,
                business_id: 1,
                business_license_photo: 1,
                'companyUser.user_id': 1,
                'companyUser.previous_roles': 1,
                'companyUser.apply_roles': 1,                
                'evopoint.points': 1
            }
        }
    ])

    return company;
}

module.exports = Company;
