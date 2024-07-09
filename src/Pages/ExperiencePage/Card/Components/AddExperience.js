import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddExperience = () => {

    const navigate = useNavigate();


    const addExperienceHandler = () => {
        navigate("/writing");
    }

    // console.log(modalOn);
    return (
        <AddProjectButton onClick={addExperienceHandler}>
            + 경험 기록 추가
        </AddProjectButton>
    );
};


const AddProjectButton = styled.button`
width: 228px;
height: 50px;
color: ${(props) => props.theme.color.white};
background-color: ${(props) => props.theme.color.main};
font-size: ${(props) => props.theme.fontSizes.TextXL};
justify-content:center;
border-radius: 10px;
cursor: pointer;
`

export default AddExperience;
