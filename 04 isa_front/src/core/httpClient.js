import axios from "axios";

export const Axios = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 300000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const get = async (url, params) => {
    return await Axios.get(url, {params});
}

export const post = async (url, params) => {
    return await Axios.post(url, params);
}

export const put = async (url, params) => {
    try {
        console.log("PUT request data:", params);

        const response = await Axios.put(url, params);
        return response.data;
    } catch (error) {
        console.error("Axios PUT error:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
        throw error;
    }
};
