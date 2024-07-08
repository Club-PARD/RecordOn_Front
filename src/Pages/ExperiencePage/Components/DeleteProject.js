import styled from "styled-components";
import { useState } from "react";
import DeleteModal from "../../../Common/DeleteModal";
import { deleteProjectAPI } from "../../../Axios/ProjectDataApi";
import { useRecoilState } from "recoil";
import { recoilUserData } from "../../../Atom/UserDataAtom";
import { useNavigate } from "react-router-dom";

const DeleteProject = () => {

    const [modalOn, setModalOn] = useState(false);
    const [userData, setUserData] = useRecoilState(recoilUserData);
    const navigate = useNavigate();

    const handleDeleteProject = async () => {
        const response = await deleteProjectAPI(userData);
        console.log(response);
        setModalOn(false);
        navigate("/project");
    }

    console.log(modalOn);
    return (
        <>
            <DeleteProjectButton onClick={() => setModalOn(true)}>
                프로젝트 삭제하기
            </DeleteProjectButton>
            {modalOn && <DeleteModal isOpen={modalOn} bigAlertText1="삭제하신 프로젝트는" bigAlertText2="저장되지 않습니다." smallAlertText="프로젝트를 정말 삭제하시겠습니까?" keepButtonText="프로젝트 유지하기" deleteButtonText="삭제하기" onClose={() => setModalOn(false)} onKeep={() => setModalOn(false)}
                onDelete={handleDeleteProject} />}
        </>
    );
};


const DeleteProjectButton = styled.button`
width: 147px;
height: 25px;
/* border: 1px solid black; */
text-decoration: underline;
color: #7f7f7f;
font-weight: ${(props) => props.theme.fontWeights.TextM};
cursor: pointer;
`

export default DeleteProject;
