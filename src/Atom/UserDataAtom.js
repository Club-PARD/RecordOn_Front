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
        user_id: "",
        project_id: 0,
        id: 1, // experience id
        sort_type: 2,
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
        user_id: "",
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
        user_id: "",
        project_id: 1,
        tag_name: [],
        start_date: "",
        finish_date: "",
        search_text: "",
        sort_type: 2,
    },
    effects_UNSTABLE: [persistAtom],
});
export const recoilProjectPagination = atom({
    key: "projectPagination",
    default: {
        startNum: 0,
        endNum: 6,
        pageNum: 1,
    },
    effects_UNSTABLE: [persistAtom],
});
export const recoilExperiencePagination = atom({
    key: "experiencePagination",
    default: {
        startNum: 0,
        endNum: 6,
    },
    effects_UNSTABLE: [persistAtom],
});

export const recoilSnack = atom({
    key: "snackAddProject",
    default: {
        projectAdd: false,
        projectEdit: false,
        projectDelete: false,
        experienceAdd: false,
        experienceEdit: false,
        experienceDelete: false,
    },
    effects_UNSTABLE: [persistAtom],
});