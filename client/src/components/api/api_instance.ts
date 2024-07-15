import axios from "axios";

const axios_instance = axios.create({    
    withCredentials: true,
    baseURL: process.env.REACT_APP_BASEURL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // timeout: 1000
    }
})

export const axios_file_instance = axios.create({    
    withCredentials: true,
    baseURL: process.env.REACT_APP_BASEURL,
    headers: {
        "Content-Type": "multipart/form-data",
        // timeout: 1000
    }
})

export default axios_instance;