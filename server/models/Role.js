const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema(
    {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    guard_name: { type:  String, default: "web" },    
    },
    {
        strict: false,
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
)

const Role = mongoose.model("role", RoleSchema);

Role.getAllInfomation = async function () {
    const [allRoles] = await Promise.all([
        this.aggregate([
            {
                $lookup:
                {
                    from: "rolepermissions",
                    localField: "id",
                    foreignField: "role_id",
                    as: "rolePermission"
                }
            },
            {
                $lookup:
                {
                    from: "permissions",
                    localField: "rolePermission.permission_id",
                    foreignField: "id",
                    as: "permission"
                }
            },
            {
                $project: {
                    id: 1,
                    name: 1,
                    guard_name: 1,
                    "permission.name": 1,
                    "rolePermission.permission_id": 1
                }
            }
            
        ])
    ])

    return allRoles;
}

module.exports = Role
