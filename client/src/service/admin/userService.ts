import qs from "qs";
import axios_instance from "../../components/api/api_instance"

export const getAllUserInfo = async () => {
    const res = await axios_instance({
        url: 'user/admin/user/getAllUsers',
        method: 'GET'
    })
    return res.data.users;
}

export const createNewUser = async (newUser: any) => {
    const res = await axios_instance({
        url: 'user/admin/user/createNewUser',
        method: 'POST',
        data: qs.stringify(newUser)
    });

    return res.data.success;
}

export const deleteUserByAdmin = async (user_id: any) => {
    const res = await axios_instance({
        url: 'user/admin/user/deleteUser/'+ user_id,
        method: 'DELETE'
    });

    return res.data.success;
}

export const getUserByAmin = async (user_id: any) => {
    const res = await axios_instance({
        url: 'user/admin/user/getUserByAdmin/' + user_id,
        method: 'GET'
    });

    return res.data.user;
}

export const updateUserByAdmin = async (user_id: any, newUser: any) => {
    const res = await axios_instance({
        url: 'user/admin/user/updateUserByAdmin/'+user_id,
        method: 'POST',
        data: qs.stringify(newUser)
    });

    return res.data.success;
}