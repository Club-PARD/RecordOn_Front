import styled from "styled-components";
import ProjectCard from "./ProjectCard";
import { useState } from "react";
import { useEffect } from "react";
import { getUserProjectDataAPI } from "../../../Axios/ProjectDataApi";
import { useRecoilState } from "recoil";
import { recoilUserProjectFilter, recoilUserProjectNum } from "../../../Atom/UserDataAtom";

const ProjectCardGrid = () => {

    const [projectCardNum, setProjectCardNum] = useState([]);
    const [userProjectData, setUserProjectData] = useState({});
    const [visibleCardStart, setVisibleCardStart] = useState(0);
    const [visibleCardEnd, setVisibleCardEnd] = useState(6);
    const [projectNum, setProjectNum] = useRecoilState(recoilUserProjectNum);
    const [projectFilter, setProjectFilter] = useRecoilState(recoilUserProjectFilter);

    const [userId, setUserId] = useState("ec87b339-7242-4141-ac09-dfea517ba54b");

    // console.log(visibleCardStart, visibleCardEnd);
    console.log(userProjectData);

    useEffect(() => {
        sessionStorage.setItem('startNum', 0);
        sessionStorage.setItem('endNum', 6)
    }, [])

    useEffect(() => {
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
            const response = await getUserProjectDataAPI(userId);
            // console.log(response);
            // console.log(response.read_default_page);
            // console.log(response.read_default_page.length);
            const cardArray = Array.from({ length: response.read_default_page.length }, (_, index) => index);
            setProjectCardNum(cardArray);
            setProjectNum(response.read_default_page.length);
            setUserProjectData(response.read_default_page);
        }
        getData();

    }, [])

    const gotoProject = () => {

    }

    return (
        <ProjectCardDiv>
            {projectCardNum.slice(visibleCardStart, visibleCardEnd).map(index => (
                <ProjectCard onClick={gotoProject(index)} key={index} projectData={userProjectData[index]}>
                </ProjectCard>
            ))}
        </ProjectCardDiv>

    );
};
const ProjectCardDiv = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(2, 1fr);
width: 1200px;
height: 565px;
/* border: 1px solid black; */
margin-top: 55px;
column-gap: 24px;
row-gap: 20px;
`

export default ProjectCardGrid;
