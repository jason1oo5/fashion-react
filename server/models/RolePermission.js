const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RolePermissionSchema = new Schema({
    permission_id: { type: Number, required: true },
    role_id: { type: Number, required: true }
})

const RolePermission = mongoose.model('RolePermission', RolePermissionSchema);

RolePermission.createRolePermission = async function (permission_ids, role_id) {    
    const newData = await Promise.all(permission_ids.map(async(permission_id) => {
        return { permission_id: permission_id, role_id: role_id }
    }))        
    const data = await this.create(newData);
    return data;
}

module.exports = RolePermission;