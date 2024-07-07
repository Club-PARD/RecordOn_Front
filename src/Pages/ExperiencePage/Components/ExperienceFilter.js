import styled from "styled-components";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import { ko } from "date-fns/locale";
import { useRecoilState } from "recoil";
import { recoilUserExperienceFilter } from "../../../Atom/UserDataAtom";
import ResetIcon from "../../../Assets/ResetIcon.svg"
import SearchIcon from "../../../Assets/SearchIcon.svg"
import { useEffect } from "react";
// import { getUserExperienceDataFilteredAPI } from "../../../Axios/ExperienceDataApi";

const ExperienceFilter = () => {

  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  const [experienceFilter, setExperienceFilter] = useRecoilState(recoilUserExperienceFilter);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState([]);
  const keywords = ['성공경험', '갈등경험', '성장경험', '도전경험', '실패경험'];



  const toggling = () => setIsOpen(!isOpen);

  const addKeyword = value => () => {
    if (!selectedKeyword.includes(value)) {
      setSelectedKeyword(
        [
          ...selectedKeyword,
          value,
        ]
      );
      setExperienceFilter({
        ...experienceFilter,
        tag_name: [
          ...selectedKeyword,
          value,
        ],
      })
    }
    setIsOpen(false);
    // applyFilter();
    // console.log(value);
  };

  const deleteKeyword = value => () => {
    setSelectedKeyword(
      selectedKeyword.filter(keywords => keywords !== value)
    );
    setExperienceFilter({
      ...experienceFilter,
      tag_name: selectedKeyword.filter(keywords => keywords !== value),
    })
    // console.log(value);

  };


  const resetDate = () => {
    setExperienceFilter({
      ...experienceFilter,
      start_date: "",
      finish_date: "",
    })
    setSelectedStartDate("");
    setSelectedEndDate("");

  }

  console.log(experienceFilter);

  return (
    <>
      <FilterDiv>
        <FilterLeft>
          <ExperienceSearch>
            <ExperienceSearchInput />
            <ExperienceSearchInputButton>
              <img src={SearchIcon} />
            </ExperienceSearchInputButton>
          </ExperienceSearch>
          <ExperienceDate>
            <ExperienceDateText>
              기간설정
            </ExperienceDateText>
            <ExperienceDateWrapper>
              <ExperienceDateStart
                dateFormat='yyyy.MM.dd'
                shouldCloseOnSelect
                disabledKeyboardNavigation
                placeholderText="시작 날짜"
                minDate={new Date('1980-01-01')}
                maxDate={new Date('2100-12-31')}
                locale={ko}
                selected={selectedStartDate}
                onChange={(date) => {
                  setSelectedStartDate(date);
                  setExperienceFilter({
                    ...experienceFilter,
                    start_date: date,
                  })
                }}
              />
              <ExperienceDateTo>
                ~
              </ExperienceDateTo>
              <ExperienceDateEnd
                dateFormat='yyyy.MM.dd'
                shouldCloseOnSelect
                disabledKeyboardNavigation
                placeholderText="마무리 날짜"
                minDate={new Date('1980-01-01')}
                maxDate={new Date('2100-12-31')}
                locale={ko}
                selected={selectedEndDate}
                onChange={(date) => {
                  setSelectedEndDate(date);
                  setExperienceFilter({
                    ...experienceFilter,
                    finish_date: date,
                  })
                }}
              />
            </ExperienceDateWrapper>
            <ExperienceDateApply onClick={resetDate}>
              <ResetButton src={ResetIcon}></ResetButton>
            </ExperienceDateApply>
          </ExperienceDate>
        </FilterLeft>
        <FilterRight>
          <ExperienceKeyword>
            <ExperienceKeywordFilter>
              <ExperienceKeywordFilterText>
                경험태그필터
              </ExperienceKeywordFilterText>
              <ExperienceKeywordFilterButton>
                <ExperienceKeywordFilterDropdownContainer>
                  <ExperienceKeywordFilterDropdownHeader onClick={toggling}>
                    경험태그선택
                  </ExperienceKeywordFilterDropdownHeader>
                  {isOpen && (
                    <ExperienceKeywordFilterDropdownListContainer>
                      <ExperienceKeywordFilterDropdownList>
                        {keywords.map(keyword => (
                          <ExperienceKeywordFilterListItem onClick={addKeyword(keyword)} key={keyword}>
                            {keyword}
                          </ExperienceKeywordFilterListItem>
                        ))}
                      </ExperienceKeywordFilterDropdownList>
                    </ExperienceKeywordFilterDropdownListContainer>
                  )}
                </ExperienceKeywordFilterDropdownContainer>
              </ExperienceKeywordFilterButton>
            </ExperienceKeywordFilter>
            <ExperienceKeywordList>
              {selectedKeyword.map(keyword => (
                <ExperienceKeywordSelected key={keyword} onClick={deleteKeyword(keyword)}>
                  {keyword}
                </ExperienceKeywordSelected>
              ))}
            </ExperienceKeywordList>
          </ExperienceKeyword>
        </FilterRight>
      </FilterDiv>

    </>
  );
};

const FilterDiv = styled.div`
width: 1200px;
height: 90px;
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

const ExperienceSearch = styled.div`
flex-direction: row;
width: 410px;
height: 40px;
/* border: 1px solid black; */
align-items: center;
justify-content: start;
flex-direction: row;
border-radius: 10px;
background-color: #f2f2f2;
`
const ExperienceSearchInput = styled.input`
width: 340px;
height: 40px;
/* border: 1px solid black; */
align-items: start;
justify-content: center;


`

const ExperienceSearchInputButton = styled.div`
width: 60px;
height: 40px;
/* border: 1px solid black; */
justify-content:center;
`

const ExperienceProcessOngoing = styled.div`
width: 98px;
height: 40px;
/* border: 1px solid black; */
justify-content: center;
border-radius: 25px;
color: ${(props) => props.theme.colors.White};
/* background-color: ${(props) => props.theme.colors.Black}; */
`
const ExperienceProcessDone = styled.div`
width: 98px;
height: 40px;
/* border: 1px solid black; */
justify-content: center;
border-radius: 25px;
color: ${(props) => props.theme.colors.Black};
background-color: ${(props) => props.theme.colors.Gray};
margin-left: 16px;
`

const ExperienceDate = styled.div`
width: 420px;
height: 40px;
/* border: 1px solid black; */
flex-direction: row;
`

const ExperienceDateText = styled.div`
width: 78px;
height: 25px;
/* border: 1px solid black; */
align-items: start;
justify-content: center;
`

const ExperienceDateWrapper = styled.div`
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
    font-style: ${(props) => props.theme.fontSizes.TextS};
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
    font-style: ${(props) => props.theme.fontSizes.TextL};
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

const ExperienceDateStart = styled(DatePicker)`
width: 126px;
height: 40px;
/* border: 1px solid black; */
border-radius: 10px;
align-items: center;
background-color: ${(props) => props.theme.colors.Gray};
text-align: center;
`


const ExperienceDateTo = styled.div`
width: 34px;
height: 25px;
/* border: 1px solid black; */
`

const ExperienceDateEnd = styled(DatePicker)`
width: 126px;
height: 40px;
/* border: 1px solid black; */
border-radius: 10px;
align-items: center;
background-color: ${(props) => props.theme.colors.Gray};
text-align: center;
`

const ExperienceDateApply = styled.div`
width: 40px;
height: 40px;
/* border: 1px solid black; */
border-radius: 10px;
align-items: center;
justify-content: center;
background-color: ${(props) => props.theme.colors.Gray};
margin-left: 6px;
`

const ResetButton = styled.img`
width: 20px;
height: 20px;
/* border: 1px solid black; */
cursor: pointer;
`

const ExperienceKeyword = styled.div`
width: 677px;
height: 143px;
/* border: 1px solid black; */
flex-direction: row;
justify-content: space-between;
align-items:start;
`

const ExperienceKeywordFilter = styled.div`
width: 268px;
height: 40px;
/* border: 1px solid black; */
flex-direction: row;
`
const ExperienceKeywordFilterText = styled.div`
width: 105px;
height: 40px;
/* border: 1px solid black; */
align-items:start;
justify-content:center;
`
const ExperienceKeywordFilterButton = styled.div`
width: 164px;
height: 40px;
/* border: 1px solid black; */
`

const ExperienceKeywordFilterDropdownContainer = styled.div`
  position: relative;
  width: 164px;
  background-color: ${(props) => props.theme.colors.Gray};
  border-radius: 25px;
`;

const ExperienceKeywordFilterDropdownHeader = styled.div`
  /* padding: 10px; */
  width: 164px;
  height:40px;
  justify-content:center;
  background-color: ${(props) => props.theme.colors.Gray};
  /* border: 1px solid #ccc; */
  border-radius: 25px;
  cursor: pointer;
`;

const ExperienceKeywordFilterDropdownListContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1000;
`;

const ExperienceKeywordFilterDropdownList = styled.ul`
  width: 164px;
  padding: 0;
  margin: 45px;
  list-style: none;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  /* border-top: none; */
`;

const ExperienceKeywordFilterListItem = styled.li`
  padding: 10px;
  padding-left: 20px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background: ${(props) => props.theme.colors.Green};
  }
`;

const ExperienceKeywordList = styled.div`
width: 384px;
height: 90px;
/* border: 1px solid black; */
display: grid;
grid-template-columns: 3fr 3fr 3fr;
grid-template-rows: 2fr 2fr 2fr;
column-gap: 10px;
row-gap: 11px;
`

const ExperienceKeywordSelected = styled.div`
width: 122px;
height: 40px;
/* border: 1px solid black; */
justify-content: center;
background-color: ${(props) => props.theme.colors.Gray};
border-radius: 25px;
`



export default ExperienceFilter;
