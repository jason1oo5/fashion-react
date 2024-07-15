import axios_instance from "../../components/api/api_instance"
import qs from 'qs';

export const getDataSet = async(set_type: number) => {
    const res = await axios_instance({
        url: '/user/admin/dataSet/getDataSet/'+set_type,
        method: 'GET'
    });
    return res.data.dataSet;
}


export const createDataSet = async(set_type: number, dataSet: any) => {
    const res = await axios_instance({
        url: '/user/admin/dataSet/createDataSet/'+set_type,
        method: 'POST',
        data: qs.stringify(dataSet)
    });
    
    return res.data.success
}

export const deleteDataSet = async(dataSet_id: any) => {
    const res = await axios_instance({
        url: '/user/admin/dataSet/deleteDataSet/'+dataSet_id,
        method: 'DELETE',
    });
    
    return res.data.success
}
