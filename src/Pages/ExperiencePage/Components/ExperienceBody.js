import styled from "styled-components";
import ExperienceCardGrid from "./ExperienceCardGrid";
import ExperienceFilter from "./ExperienceFilter";
import PaginationExperience from "./PaginationExperience";

const ExperienceBody = () => {


    return (
        <Container>
            <ExperienceFilter />
            <ExperienceCardGrid />
            <PaginationExperience backgroundColor="#DCDCDC" />
        </Container>
    );
};

const Container = styled.div`
width: 100%;
height: 1024px;
justify-content: start;
background-color: ${(props) => props.theme.color.base2};
/* border: 1px solid black; */
border-radius: 50px 50px 0px 0px;
background: var(--base2, #F5F5F5);
box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.10);
margin-top: 61px;
`


export default ExperienceBody;
