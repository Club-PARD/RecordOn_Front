import styled from "styled-components";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import { ko } from "date-fns/locale";

const ProjectFilter = () => {

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const [isOpen, setIsOpen] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState([]);
  const keywords = ['신뢰성', '전문성', '책임감', '열정', '실행력', '창의성', '성실성', '정직', '소통/협력'];

  const processCheck = () => {

  }

  const toggling = () => setIsOpen(!isOpen);

  const addKeyword = value => () => {
    if (!selectedKeyword.includes(value)) {
      setSelectedKeyword(
        [
          ...selectedKeyword,
          value,
        ]
      );
    }
    setIsOpen(false);
    console.log(value);
  };

  const deleteKeyword = value => () => {
    setSelectedKeyword(
      selectedKeyword.filter(keywords => keywords !== value)
    );
    console.log(value);

  };

  console.log(selectedKeyword);

  // console.log(selectedStartDate);

  return (
    <>
      <FilterDiv>
        <FilterLeft>
          <ProjectProcess>
            <ProjectProcessText>
              진행현황
            </ProjectProcessText>
            <ProjectProcessOngoing>
              진행중
            </ProjectProcessOngoing>
            <ProjectProcessDone>
              진행완료
            </ProjectProcessDone>
          </ProjectProcess>
          <ProjectDate>
            <ProjectDateText>
              기간설정
            </ProjectDateText>
            <ProjectDateWrapper>
              <ProjectDateStart
                dateFormat='yyyy.MM.dd'
                shouldCloseOnSelect
                disabledKeyboardNavigation
                minDate={new Date('1980-01-01')}
                maxDate={new Date('2100-12-31')}
                locale={ko}
                selected={selectedStartDate}
                onChange={(date) => setSelectedStartDate(date)}
              />
              <ProjectDateTo>
                ~
              </ProjectDateTo>
              <ProjectDateEnd
                dateFormat='yyyy.MM.dd'
                shouldCloseOnSelect
                disabledKeyboardNavigation
                minDate={new Date('1980-01-01')}
                maxDate={new Date('2100-12-31')}
                locale={ko}
                selected={selectedEndDate}
                onChange={(date) => setSelectedEndDate(date)}
              />
            </ProjectDateWrapper>
            <ProjectDateApply>
              확인
            </ProjectDateApply>
          </ProjectDate>
        </FilterLeft>
        <FilterRight>
          <ProjectKeyword>
            <ProjectKeywordFilter>
              <ProjectKeywordFilterText>
                핵심역량필터
              </ProjectKeywordFilterText>
              <ProjectKeywordFilterButton>
                <ProjectKeywordFilterDropdownContainer>
                  <ProjectKeywordFilterDropdownHeader onClick={toggling}>
                    핵심역량선택
                  </ProjectKeywordFilterDropdownHeader>
                  {isOpen && (
                    <ProjectKeywordFilterDropdownListContainer>
                      <ProjectKeywordFilterDropdownList>
                        {keywords.map(keyword => (
                          <ProjectKeywordFilterListItem onClick={addKeyword(keyword)} key={keyword}>
                            {keyword}
                          </ProjectKeywordFilterListItem>
                        ))}
                      </ProjectKeywordFilterDropdownList>
                    </ProjectKeywordFilterDropdownListContainer>
                  )}
                </ProjectKeywordFilterDropdownContainer>
              </ProjectKeywordFilterButton>
            </ProjectKeywordFilter>
            <ProjectKeywordList>
              {selectedKeyword.map(keyword => (
                <ProjectKeywordSelected key={keyword} onClick={deleteKeyword(keyword)}>
                  {keyword}
                </ProjectKeywordSelected>
              ))}
            </ProjectKeywordList>
          </ProjectKeyword>
        </FilterRight>
      </FilterDiv>

    </>
  );
};

const FilterDiv = styled.div`
width: 1200px;
height: 143px;
/* border: 1px solid black; */
margin-top: 88px;
flex-direction: row;
align-items: start;
justify-content: space-between;
`
const FilterLeft = styled.div`
width: 420px;
height: 91px;
/* border: 1px solid black; */
align-items: start;
justify-content: space-between;
`

const FilterRight = styled.div`
width: 677px;
height: 143px;
/* border: 1px solid black; */
`

const ProjectProcess = styled.div`
width: 290px;
height: 40px;
/* border: 1px solid black; */
align-items: center;
justify-content: start;
flex-direction: row;
`
const ProjectProcessText = styled.div`
width: 78px;
height: 25px;
/* border: 1px solid black; */
align-items: start;
justify-content: center;
`
const ProjectProcessOngoing = styled.div`
width: 98px;
height: 40px;
/* border: 1px solid black; */
justify-content: center;
border-radius: 25px;
color: ${(props) => props.theme.colors.White};
background-color: ${(props) => props.theme.colors.Black};
`
const ProjectProcessDone = styled.div`
width: 98px;
height: 40px;
/* border: 1px solid black; */
justify-content: center;
border-radius: 25px;
color: ${(props) => props.theme.colors.Black};
background-color: ${(props) => props.theme.colors.Gray};
margin-left: 16px;
`

const ProjectDate = styled.div`
width: 420px;
height: 40px;
/* border: 1px solid black; */
flex-direction: row;
`

const ProjectDateText = styled.div`
width: 78px;
height: 25px;
/* border: 1px solid black; */
align-items: start;
justify-content: center;
`

const ProjectDateWrapper = styled.div`
width: 286px;
height: 40px;
/* border: 1px solid black; */
flex-direction: row;
justify-content: start;

/* DatePicker에 직접 하면 적용이 안된다.. */
.react-datepicker {
    background-color: ${(props) => props.theme.colors.White}; 
    width: 300px;
    align-items: center;
    justify-content: center;
    font-style: ${(props) => props.theme.fontStyles.TextS};
    border-radius: 15px;
    
  }
  
  .react-datepicker__header {
    background-color: ${(props) => props.theme.colors.White}; 
    width: 250px;
    font-size: 15px;
    font-family: "Pretendard";
    border: 0px;
    
    /* border: 1px solid black; */
  }

  .react-datepicker__current-month {
    /* width: 150px; */
    height: 20px;
    flex-direction: row;
    justify-content: space-between;
    font-family: "Pretendard";
    font-style: ${(props) => props.theme.fontStyles.TextL};
    margin-top: 15px;
    margin-bottom: 15px;
    /* border: 1px solid black; */
  }
  .react-datepicker__navigation--previous{
    margin-top: 15px;
    
  }

  .react-datepicker__navigation--next{
    margin-top: 15px;
  }

  .react-datepicker__day-names {
    width: 250px;
    height: 20px;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    /* margin-bottom: -20px; */
    /* border: 1px solid black; */
  }

  .react-datepicker__day-name {
    font-size: 15px;
    color: #aaaaaa;
    align-items: center;
    justify-content: center;
    font-family: "Pretendard";
    /* border: 1px solid black; */
  }
  
  .react-datepicker__month-container {
    width: 100%;
  }
  

  .react-datepicker__week {
    display: flex;
    flex-direction: row;
    width: 250px;
    /* justify-content: space-between; */
    /* border: 1px solid black; */
  }

  .react-datepicker__day {
    width: 30px;
    height: 30px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #444444;
    /* border: 1px solid black; */
  }

  .react-datepicker__day--selected {
    background-color: ${(props) => props.theme.colors.Green}; 
    border-radius: 15px;
    color: white;
  }
  .react-datepicker__triangle {
      display: none;
    }

  .react-datepicker__day--outside-month {
    cursor: default;
    visibility: hidden;
  }


`

const ProjectDateStart = styled(DatePicker)`
width: 126px;
height: 40px;
/* border: 1px solid black; */
border-radius: 10px;
align-items: center;
background-color: ${(props) => props.theme.colors.Gray};
text-align: center;
`


const ProjectDateTo = styled.div`
width: 34px;
height: 25px;
/* border: 1px solid black; */
`

const ProjectDateEnd = styled(DatePicker)`
width: 126px;
height: 40px;
/* border: 1px solid black; */
border-radius: 10px;
align-items: center;
background-color: ${(props) => props.theme.colors.Gray};
text-align: center;
`

const ProjectDateApply = styled.div`
width: 50px;
height: 40px;
/* border: 1px solid black; */
border-radius: 10px;
align-items: center;
justify-content: center;
background-color: ${(props) => props.theme.colors.Gray};
margin-left: 6px;
`

const ProjectKeyword = styled.div`
width: 677px;
height: 143px;
/* border: 1px solid black; */
flex-direction: row;
justify-content: space-between;
align-items:start;
`

const ProjectKeywordFilter = styled.div`
width: 268px;
height: 40px;
/* border: 1px solid black; */
flex-direction: row;
`
const ProjectKeywordFilterText = styled.div`
width: 105px;
height: 40px;
/* border: 1px solid black; */
align-items:start;
justify-content:center;
`
const ProjectKeywordFilterButton = styled.div`
width: 164px;
height: 40px;
/* border: 1px solid black; */
`

const ProjectKeywordFilterDropdownContainer = styled.div`
  position: relative;
  width: 164px;
  background-color: ${(props) => props.theme.colors.Gray};
  border-radius: 25px;
`;

const ProjectKeywordFilterDropdownHeader = styled.div`
  /* padding: 10px; */
  width: 164px;
  height:40px;
  justify-content:center;
  background-color: ${(props) => props.theme.colors.Gray};
  /* border: 1px solid #ccc; */
  border-radius: 25px;
  cursor: pointer;
`;

const ProjectKeywordFilterDropdownListContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1000;
`;

const ProjectKeywordFilterDropdownList = styled.ul`
  width: 164px;
  padding: 0;
  margin: 45px;
  list-style: none;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  /* border-top: none; */
`;

const ProjectKeywordFilterListItem = styled.li`
  padding: 10px;
  padding-left: 20px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background: ${(props) => props.theme.colors.Green};
  }
`;

const ProjectKeywordList = styled.div`
width: 384px;
height: 143px;
/* border: 1px solid black; */
display: grid;
grid-template-columns: 3fr 3fr 3fr;
grid-template-rows: 3fr 3fr 3fr;
column-gap: 10px;
row-gap: 11px;
`

const ProjectKeywordSelected = styled.div`
width: 122px;
height: 40px;
/* border: 1px solid black; */
justify-content: center;
background-color: ${(props) => props.theme.colors.Gray};
border-radius: 25px;
`



export default ProjectFilter;
