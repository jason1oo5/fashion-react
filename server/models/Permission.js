const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PermissionSchema = new Schema(
    {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        guard_name: { type: String, default: "web" },        
    },
    {
        strict: false,
        timestamps: { createdAt: 'created_at', updatedAt: "updated_at" }
    }
)

const Permission = mongoose.model('Permission', PermissionSchema);

module.exports = Permission