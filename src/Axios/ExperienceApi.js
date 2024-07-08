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

export const getOneExperienceAPI = async () => {
    const id = 15;
    try {
        const response = await axios.get (`${server}experiences/${id}`);
        if (response.data.success) {
            console.log (response.data.response_object);
        } else {
            console.error("API 호출 실패: ", response.data.message);
        }
        console.log (response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteOneExperienceAPI = async () => {
const id = 2;
try{
    const response = await axios.get (`${server}experiences/${id}`, "f245d2ac-d421-4cfb-99cf-c544071446ac");
console.log (response.data);
}catch(error) {
    console.log (error);
}
};