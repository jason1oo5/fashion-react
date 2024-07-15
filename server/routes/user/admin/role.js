const express = require('express');
const router = express.Router();
const { Role, Permission, RolePermission } = require('../../../db');

router.get('/getPermissions', async (req, res) => {
    try {
        const permissions = await Permission.find({}, {
            id: 1, name:  1 
        });
        return res.status(200).send({success: true, permissions});
    } catch (error) {
        return res.status(500).send({success: false, permissions: []});
    }
})

router.get('/getRoleInfo', async (req, res) => {
    try {
        const roles = await Role.getAllInfomation();
        return res.status(200).send({success: true, roles});
    } catch (error) {
        console.log(error);
        return res.status(500).send({success: false, data: null})
    }    
})

router.post('/addRole', async (req, res) => {
    const role_info = req.body;
    try {
        const [maxIdItem] = await Role.find().sort({id: -1}).limit(1);
        const id = maxIdItem.id + 1;        
        const dataToSave = {
            name: role_info.name,
            id: id
        }
        const newRole = await Role.create(dataToSave);
        const newRolePermission = await RolePermission.createRolePermission(role_info.permissions, id);
        return res.status(200).send({success: true, newRole});
    } catch(error) {
        console.log(error);
        return res.status(500).send({success: false, data: null});
    }
})

router.delete("/deleteRole/:role_id", async (req, res) => {
    const { role_id } = req.params;
    try {
        await Role.findOneAndDelete({id: role_id});
        await RolePermission.deleteMany({role_id: role_id});
        return res.status(200).send({success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).send({success: false});
    }
})

module.exports = router;