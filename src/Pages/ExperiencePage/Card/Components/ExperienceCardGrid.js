import styled from "styled-components";
import ExperienceCard from "./ExperienceCard";
import { useState } from "react";
import { useEffect } from "react";
import { getUserExperienceDataFilteredAPI } from "../../../../Axios/ProjectDataApi";
import { useRecoilState } from "recoil";
import { recoilUserExperienceFilter, recoilUserExperienceNum, recoilExperiencePagination } from "../../../../Atom/UserDataAtom";
import ExpNone from "../../../../Assets/ExpEmpty.svg"
import ExpFilteredNone from "../../../../Assets/ExpFilteredEmpty.svg"
import { useNavigate } from "react-router-dom";

const ExperienceCardGrid = () => {

    const [experienceCardNum, setExperienceCardNum] = useState([]);
    const [userExperienceData, setUserExperienceData] = useState({});
    const [visibleCardStart, setVisibleCardStart] = useState(0);
    const [visibleCardEnd, setVisibleCardEnd] = useState(6);
    const [experienceNum, setExperienceNum] = useRecoilState(recoilUserExperienceNum);
    const [experienceFilter, setExperienceFilter] = useRecoilState(recoilUserExperienceFilter);
    const [experiencePagination, setExperiencePagination] = useRecoilState(recoilExperiencePagination);
    const navigate = useNavigate();



    // console.log(visibleCardStart, visibleCardEnd);
    // console.log(userExperienceData);
    // console.log(experienceFilter);



    useEffect(() => {
        setVisibleCardStart(experiencePagination.startNum);
        setVisibleCardEnd(experiencePagination.endNum);

    }, [experiencePagination])

    useEffect(() => {
        const getData = async () => {
            // console.log(experienceFilter);
            const response = await getUserExperienceDataFilteredAPI(experienceFilter);
            // console.log(response);
            const cardArray = Array.from({ length: response?.length }, (_, index) => index);
            setExperienceCardNum(cardArray);
            setExperienceNum(response?.length);
            setUserExperienceData(response);
        }
        getData();

    }, [experienceFilter])

    const addExperienceHandler = () => {
        navigate("/writing");
    }

    return (
        <ExperienceCardDiv>
            {experienceCardNum.length == 0
                ?
                <div>
                    {experienceFilter.tag_name.length == 0 && experienceFilter.search_text == "" && experienceFilter.finish_date == "" && experienceFilter.start_date == ""
                        ? <div>
                            <img src={ExpNone} style={{ marginTop: "104px", cursor: "pointer" }} onClick={() => addExperienceHandler()} />
                        </div>
                        :
                        <div>
                            <img src={ExpFilteredNone} style={{ marginTop: "104px", cursor: "pointer" }} onClick={() => addExperienceHandler()} />
                        </div>
                    }
                </div>
                :
                <ExperienceCardDivContent>
                    {experienceCardNum.slice(visibleCardStart, visibleCardEnd).map(index => (
                        <ExperienceCard key={index} experienceData={userExperienceData[index]}>
                        </ExperienceCard>
                    ))}
                </ExperienceCardDivContent>
            }

        </ExperienceCardDiv>


        // <ProjectCardDiv>
        // {projectCardNum.length == 0
        //     ?
        //     <div>
        //         {projectFilter.competency_tag_name.length == 0 && projectFilter.is_finished == 2 && projectFilter.finish_date == "" && projectFilter.start_date == ""
        //             ? <div>
        //                 <img src={FolderNone} style={{ marginTop: "104px", cursor: "pointer" }} onClick={() => setModalOn(true)} />
        //                 {modalOn && <AddProjectModal isOpen={modalOn} onClose={() => setModalOn(false)} />}
        //             </div>
        //             :
        //             <div>
        //                 <img src={FolderNoneFiltered} style={{ marginTop: "104px", cursor: "pointer" }} onClick={() => setModalOn(true)} />
        //                 {modalOn && <AddProjectModal isOpen={modalOn} onClose={() => setModalOn(false)} />}
        //             </div>
        //         }

        //     </div>
        //     :
        //     <ProjectCardDivContent>
        //         {projectCardNum.slice(visibleCardStart, visibleCardEnd).map(index => (
        //             <ProjectCard onClick={gotoProject(index)} key={index} projectData={userProjectData[index]}>
        //             </ProjectCard>
        //         ))}
        //     </ProjectCardDivContent>
        // }

        // </ProjectCardDiv>
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
