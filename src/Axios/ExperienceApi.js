import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;

export const postExperienceAPI = async (data) => {
    console.log (data.json);
    try {
        const response = await axios.post (`${server}experiences`, data);
        console.log (response.data);
    } catch (error) {
        console.error(error);
    }
};