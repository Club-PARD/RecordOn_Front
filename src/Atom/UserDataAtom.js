import { atom } from "recoil";
// import { recoilPersist } from "recoil-persist";

// const { persistAtom } = recoilPersist();

export const isLogined = atom({
    key: "isLogined",
    default: false,
    // effects_UNSTABLE: [persistAtom],
});
export const recoilUserId = atom({
    key: "user_id",
    default: "ec87b339-7242-4141-ac09-dfea517ba54b",
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
        user_id: "ec87b339-7242-4141-ac09-dfea517ba54b",
        competency_tag_name: [],
        start_date: "",
        finish_date: "",
        is_finished: 2,
    },
    // effects_UNSTABLE: [persistAtom],
});
export const recoilProjectModal = atom({
    key: "ProjectModal",
    default: false,
    // effects_UNSTABLE: [persistAtom],
});