import styled from "styled-components";
import ExperienceCard from "./ExperienceCard";
import { useState } from "react";
import { useEffect } from "react";
import { getUserExperienceDataAPI, getUserExperienceDataFilteredAPI } from "../../../Axios/ProjectDataApi";
import { useRecoilState } from "recoil";
import { recoilUserExperienceFilter, recoilUserExperienceNum } from "../../../Atom/UserDataAtom";

const ExperienceCardGrid = () => {

    const [experienceCardNum, setExperienceCardNum] = useState([]);
    const [userExperienceData, setUserExperienceData] = useState({});
    const [visibleCardStart, setVisibleCardStart] = useState(0);
    const [visibleCardEnd, setVisibleCardEnd] = useState(6);
    const [experienceNum, setExperienceNum] = useRecoilState(recoilUserExperienceNum);
    const [experienceFilter, setExperienceFilter] = useRecoilState(recoilUserExperienceFilter);



    // console.log(visibleCardStart, visibleCardEnd);
    console.log(userExperienceData);

    useEffect(() => {
        sessionStorage.setItem('startNum', 0);
        sessionStorage.setItem('endNum', 6)

        const handleStorageChange = () => {
            const startNum = sessionStorage.getItem('startNum') || 0;
            const endNum = sessionStorage.getItem('endNum') || 6;
            setVisibleCardStart(Number(startNum));
            setVisibleCardEnd(Number(endNum));
        };

        window.addEventListener('storage', handleStorageChange);

    }, [])

    useEffect(() => {
        const getData = async () => {
            console.log(experienceFilter);
            const response = await getUserExperienceDataFilteredAPI(experienceFilter);
            console.log(response);
            const cardArray = Array.from({ length: response?.length }, (_, index) => index);
            setExperienceCardNum(cardArray);
            setExperienceNum(response?.length);
            setUserExperienceData(response);
        }
        getData();

    }, [experienceFilter])

    const gotoExperience = () => {

    }

    return (
        <ExperienceCardDiv>
            <ExperienceCardDivContent>
                {experienceCardNum.slice(visibleCardStart, visibleCardEnd).map(index => (
                    <ExperienceCard onClick={gotoExperience(index)} key={index} experienceData={userExperienceData[index]}>
                    </ExperienceCard>
                ))}
            </ExperienceCardDivContent>
        </ExperienceCardDiv>

    );
};

const ExperienceCardDiv = styled.div`
width: 1200px;
height: 600px;
/* border: 1px solid black; */
margin-top: 55px;
`

const ExperienceCardDivContent = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(2, 1fr);
width: 1200px;
height: 600px;
/* border: 1px solid black; */
/* margin-top: 55px; */
column-gap: 24px;
row-gap: 20px;
`

export default ExperienceCardGrid;
