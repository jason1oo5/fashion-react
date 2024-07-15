import qs from "qs";
import axios_instance from "../../components/api/api_instance"

export const getTutorials = async () => {
    const res = await axios_instance({
        url: 'public/tutorial/getTutorials',
        method: 'GET'
    });

    return res.data.tutorials;
}

export const addTutorial = async (newTutorial: any) => {
    const res = await axios_instance({
        url: 'user/admin/tutorial/addTutorial',
        method: 'POST',
        data: qs.stringify(newTutorial)
    });

    return res.data.success;
}

export const deleteTutorial = async (tutorial_id:any) => {
    const res = await axios_instance({
        url: 'user/admin/tutorial/deleteTutorial/'+tutorial_id,
        method: 'DELETE'
    });

    return res.data.success;
}

export const updateTutorial = async (updatedTutorial: any) => {
    const res = await axios_instance({
        url: 'user/admin/tutorial/updateTutorial/'+updatedTutorial.id,
        method: 'POST',
        data: qs.stringify(updatedTutorial)
    });

    return res.data.success;
}