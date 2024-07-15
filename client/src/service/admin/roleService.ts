import axios_instance from "../../components/api/api_instance"
import qs from 'qs';

export let Permissions: any = [];

export const getAllPermissions = async() =>{
   const res = await axios_instance({
      url: 'user/admin/role/getPermissions',
      method: 'GET'
   });
   Permissions = [];
   await Promise.all(res.data.permissions.map((item: any) => {
        Permissions.push(item.name);
   }))
}

export const getRoleData = async () => {
    const res = await axios_instance({
        url: '/user/admin/role/getRoleInfo',
        method: 'GET'
    });
    return res.data.roles;
}

export const addRole = async (d_newRole: any) => {
    const newRole: any = {
        name: d_newRole.name,
        permissions: []
    }
    await Promise.all(d_newRole.permissions.map((permission: any) => {
        newRole.permissions.push(Permissions.indexOf(permission) + 1);
    }))    
    const res = await axios_instance({
        url: '/user/admin/role/addRole',
        method: 'POST',
        data: qs.stringify(newRole)
    });
    return res.data.success;
}

export const deleteRole = async (role_id: any) => {    
    const res = await axios_instance({
        url: '/user/admin/role/deleteRole/'+role_id,
        method: 'DELETE',
    });
    return res.data.success;
}
