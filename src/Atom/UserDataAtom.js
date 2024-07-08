import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isLogined = atom({
    key: "isLogined",
    default: false,
    effects_UNSTABLE: [persistAtom],
});
export const recoilLoginData = atom({
    key: "loginData",
    default: {
        name: "",
        imageUrl: "",
        email: "",
    },
    effects_UNSTABLE: [persistAtom],
});
export const recoilUserData = atom({
    key: "UserData",
    default: {
        user_id: "f245d2ac-d421-4cfb-99cf-c544071446ac",
        project_id: 0,
        id: 0, // experience id
    },
    effects_UNSTABLE: [persistAtom],
});

export const recoilUserProjectNum = atom({
    key: "projectNum",
    default: 0,
    effects_UNSTABLE: [persistAtom],
});
export const recoilUserProjectFilter = atom({
    key: "projectFilter",
    default: {
        user_id: "f245d2ac-d421-4cfb-99cf-c544071446ac",
        competency_tag_name: [],
        start_date: "",
        finish_date: "",
        is_finished: 2,
    },
    effects_UNSTABLE: [persistAtom],
});
export const recoilProjectModal = atom({
    key: "ProjectModal",
    default: false,
    effects_UNSTABLE: [persistAtom],
});
export const recoilUserExperienceNum = atom({
    key: "experienceNum",
    default: 0,
    effects_UNSTABLE: [persistAtom],
});
export const recoilUserExperienceFilter = atom({
    key: "experienceFilter",
    default: {
        user_id: "f245d2ac-d421-4cfb-99cf-c544071446ac",
        project_id: 1,
        tag_name: [],
        start_date: "",
        finish_date: "",
        search_text: "",
    },
    effects_UNSTABLE: [persistAtom],
});