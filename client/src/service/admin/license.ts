import qs from "qs"
import axios_instance from "../../components/api/api_instance"

export const addLicense = async (newLicense: any) => {
    const res = await axios_instance({
        url: 'user/admin/license/addLicense',
        method: 'POST',
        data: qs.stringify(newLicense)
    });

    return res.data.success;
}

export const getLicense = async () => {
    const res = await axios_instance({
        url: 'user/admin/license/getLicense',
        method: 'GET'
    });

    return res.data.licenses;
}

export const deleteLicense = async (license_id: any) => {
    const res = await axios_instance({
        url: 'user/admin/license/deleteLicense/'+license_id,
        method: 'DELETE'
    });

    return res.data.success;
}

export const updateLicense = async (updatedLicense: any) => {
    const res = await axios_instance({
        url: 'user/admin/license/updateLicense/'+updatedLicense.id,
        method: 'POST',
        data: qs.stringify(updatedLicense)
    });

    return res.data.success;
}

export const findLicense = async () => {
    const res = await axios_instance({
        url: '/user/findLicenseByUser',
        method: 'GET'
    });

    return res.data.userLicense;
}