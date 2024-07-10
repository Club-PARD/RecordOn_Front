import styled from "styled-components";
import ProjectCard from "./ProjectCard";
import { useState } from "react";
import { useEffect } from "react";
import { getUserProjectDataAPI, getUserProjectDataFilteredAPI } from "../../../Axios/ProjectDataApi";
import { useRecoilState } from "recoil";
import { recoilProjectPagination, recoilUserProjectFilter, recoilUserProjectNum } from "../../../Atom/UserDataAtom";

const ProjectCardGrid = () => {

    const [projectCardNum, setProjectCardNum] = useState([]);
    const [userProjectData, setUserProjectData] = useState({});
    const [visibleCardStart, setVisibleCardStart] = useState(0);
    const [visibleCardEnd, setVisibleCardEnd] = useState(6);
    const [projectNum, setProjectNum] = useRecoilState(recoilUserProjectNum);
    const [projectFilter, setProjectFilter] = useRecoilState(recoilUserProjectFilter);
    const [projectPagination, setProjectPagination] = useRecoilState(recoilProjectPagination);

    useEffect(() => {
        setVisibleCardStart(projectPagination.startNum);
        setVisibleCardEnd(projectPagination.endNum);

    }, [projectPagination])

    useEffect(() => {
        const getData = async () => {
            const response = await getUserProjectDataFilteredAPI(projectFilter);
            console.log(response);
            const cardArray = Array.from({ length: response?.length }, (_, index) => index);
            setProjectCardNum(cardArray);
            setProjectNum(response?.length);
            setUserProjectData(response);
        }
        getData();

    }, [projectFilter])

    const gotoProject = () => {

    }

    return (
        <ProjectCardDiv>
            <ProjectCardDivContent>
                {projectCardNum.slice(visibleCardStart, visibleCardEnd).map(index => (
                    <ProjectCard onClick={gotoProject(index)} key={index} projectData={userProjectData[index]}>
                    </ProjectCard>
                ))}
            </ProjectCardDivContent>
        </ProjectCardDiv>

    );
};
const ProjectCardDiv = styled.div`
width: 1200px;
height: 638px;
margin-top: 55px;
/* border: 1px solid black; */
`

const ProjectCardDivContent = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(2, 1fr);
width: 1200px;
height: 638px;
/* border: 1px solid black; */

column-gap: 24px;
row-gap: 20px;
`

export default ProjectCardGrid;
