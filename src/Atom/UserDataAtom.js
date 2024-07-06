import { atom } from "recoil";
// import { recoilPersist } from "recoil-persist";

// const { persistAtom } = recoilPersist();

export const isLogined = atom({
    key: "isLogined",
    default: false,
    // effects_UNSTABLE: [persistAtom],
});
export const recoilUserProjectNum = atom({
    key: "projectNum",
    default: 0,
    // effects_UNSTABLE: [persistAtom],
});
export const recoilUserProjectFilter = atom({
    key: "projectFilter",
    default: {
        processState: 2,
        startDate: "",
        endDate: "",
        tagList: [],
    },
    // effects_UNSTABLE: [persistAtom],
});
export const recoilProjectModal = atom({
    key: "ProjectModal",
    default: false,
    // effects_UNSTABLE: [persistAtom],
});