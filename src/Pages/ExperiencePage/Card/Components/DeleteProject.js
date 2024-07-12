import styled from "styled-components";
import { useState } from "react";
import DeleteModal from "../../../../Common/DeleteModal";
import { deleteProjectAPI } from "../../../../Axios/ProjectDataApi";
import { useRecoilState } from "recoil";
import { recoilSnack, recoilUserData } from "../../../../Atom/UserDataAtom";
import { useNavigate } from "react-router-dom";
import Delete from "../../../../Assets/delete.svg"

const DeleteProject = () => {

    const [modalOn, setModalOn] = useState(false);
    const [userData, setUserData] = useRecoilState(recoilUserData);
    const [snack, setSnack] = useRecoilState(recoilSnack);
    const navigate = useNavigate();

    const handleDeleteProject = async () => {
        try {
            const response = await deleteProjectAPI(userData);
            // console.log(response);
            setModalOn(false);
            setSnack({
                ...snack,
                projectDelete: true,
            })
            navigate("/project");
        }
        catch (error) {
            // console.log(error);
        }


    }

    // console.log(modalOn);
    return (
        <>
            <DeleteProjectDiv onClick={() => setModalOn(true)}>
            <img src={Delete} style={{ width: "18px", height: "18px", marginRight: "11px" }} /> 삭제하기
            </DeleteProjectDiv>
            {modalOn && <DeleteModal isOpen={modalOn} bigAlertText1="삭제하신 프로젝트는" bigAlertText2="저장되지 않습니다." smallAlertText="프로젝트를 정말 삭제하시겠습니까?" keepButtonText="프로젝트 유지하기" deleteButtonText="삭제하기" onClose={() => setModalOn(false)} onKeep={() => setModalOn(false)}
                onDelete={handleDeleteProject} />}
        </>
    );
};


const DeleteProjectDiv= styled.div`
flex-direction: row;
width: 180px;
height: 25px;
justify-content: center;
flex-shrink: 0;
margin-top: 10px;
left: 16px;
/* border: 1px solid black; */
font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};
cursor: pointer;
z-index: 1000;
`

export default DeleteProject;
