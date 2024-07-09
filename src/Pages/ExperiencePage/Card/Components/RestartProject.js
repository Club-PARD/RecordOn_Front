import styled from "styled-components";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { recoilUserData } from "../../../../Atom/UserDataAtom";
import { restartProjectAPI } from "../../../../Axios/ProjectDataApi";
import { useNavigate } from "react-router-dom";

const RestartProject = () => {

    const [userData, setUserData] = useRecoilState(recoilUserData);
    // const navigate = useNavigate();

    const restartProjectHandler = async () => {
        const response = await restartProjectAPI(userData);
        window.location.reload();
    }

    return (
        <RestartProjectButton onClick={restartProjectHandler}>
            프로젝트 재개하기
        </RestartProjectButton>

    );
};


const RestartProjectButton = styled.button`
width: 228px;
height: 50px;
color: ${(props) => props.theme.color.white};
background-color: ${(props) => props.theme.color.main};
font-size: ${(props) => props.theme.fontSizes.TextXL};
justify-content:center;
border-radius: 10px;
cursor: pointer;
`

export default RestartProject;
