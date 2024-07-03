import styled from "styled-components";

const ProjectFilter = () => {
  return (
    <>
      <FilterDiv>
        <FilterLeft>
          <ProjectProcess>
            <ProjectProcessText>
              진행현황
            </ProjectProcessText>
          </ProjectProcess>
          <ProjectDate>

          </ProjectDate>
        </FilterLeft>
        <FilterRight>
          <ProjectKeyword>

          </ProjectKeyword>
        </FilterRight>
      </FilterDiv>

    </>
  );
};

const FilterDiv = styled.div`
width: 1200px;
height: 143px;
border: 1px solid black;
margin-top: 24px;
flex-direction: row;
align-items: start;
justify-content: space-between;
`
const FilterLeft = styled.div`
width: 420px;
height: 91px;
border: 1px solid black;
align-items: start;
justify-content: space-between;
`

const FilterRight = styled.div`
width: 677px;
height: 143px;
border: 1px solid black;
`

const ProjectProcess = styled.div`
width: 290px;
height: 40px;
border: 1px solid black;
align-items: start;
justify-content: center;
`
const ProjectProcessText = styled.div`
width: 78px;
height: 25px;
border: 1px solid black;
align-items: start;
justify-content: center;
`
const ProjectProcessOngoing = styled.div`
width: 98px;
height: 40px;
border: 1px solid black;
align-items: start;
justify-content: center;
`
const ProjectProcessDone = styled.div`
width: 98px;
height: 40px;
border: 1px solid black;
align-items: start;
justify-content: center;
`

const ProjectDate = styled.div`
width: 420px;
height: 40px;
border: 1px solid black;
`
const ProjectKeyword = styled.div`
width: 677px;
height: 143px;
border: 1px solid black;
`

export default ProjectFilter;
