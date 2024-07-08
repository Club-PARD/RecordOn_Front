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
    const id = 2;
    try {
        const response = await axios.get (`${server}experiences/${id}`);
        console.log (response.data);
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