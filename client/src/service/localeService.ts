import qs from 'qs';
import axios_instance from '../components/api/api_instance';

export const getCurrentLocales = async () => {
    const res = await axios_instance({
        url: 'user/getLocales',
        method: 'GET',        
    });
    const locale_array: any = [];
    await Promise.all(res.data.locales.map(async(item: any) => {
        locale_array.push(item.locale)
    }))
    localStorage.setItem('locales', locale_array);
    return res.data.locales;
}

export const addNewLocale = async (dataToSend: any) => {
    const res = await axios_instance({
        url: 'user/admin/addLocale',
        method: 'POST',
        data: qs.stringify(dataToSend)
    });

    return res.data.success;
}

export const removeLocale = async (_id: any) => {
    const res = await axios_instance({
        url: 'user/admin/removeLocale/' + _id,
        method: 'DELETE'
    });

    return res.data.success;
}

export const getLocalesData = async () => {
    const res = await axios_instance({
        url: 'user/getLocalesData',
        method: 'GET'
    });

    return res.data.localesData;
}

export const updateLocalesData = async (updatedLocales: any) => {
    const res = await axios_instance({
        url: 'user/admin/updateLocaleValue',
        method: 'POST',
        data: qs.stringify(updatedLocales)
    });

    return res.data.success;
}