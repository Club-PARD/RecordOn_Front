import styled from "styled-components";
import {
    Pagination,
    getLastPage,
    getVisibleResultsMax,
    getVisibleResultsMin,
} from '@workday/canvas-kit-react/pagination';
import { useState } from "react";
import { useRecoilState } from "recoil";
import { recoilUserProjectNum } from "../Atom/UserDataAtom";

const PaginationBar = () => {

    const resultCount = 6;
    const [totalCount, setTotalCount] = useRecoilState(recoilUserProjectNum);
    const lastPage = getLastPage(resultCount, totalCount);
    const [currentPage, setCurrentPage] = useState(1);



    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);

        let startNum = (pageNumber - 1) * 6;
        let endNum = Math.min(startNum + 6, totalCount);

        updateSessionStorage(startNum, endNum);
    };

    const updateSessionStorage = (startNum, endNum) => {
        sessionStorage.setItem("startNum", startNum);
        sessionStorage.setItem("endNum", endNum);
        // storage 이벤트 트리거
        window.dispatchEvent(new Event("storage"));
    };


    const prevCardNum = () => {
        handlePageChange(currentPage - 1);

    }

    const nextCardNum = () => {
        handlePageChange(currentPage + 1);
    }



    return (
        <PaginationDiv>
            <Pagination
                onPageChange={pageNumber => console.log(pageNumber)}
                aria-label="Pagination"
                lastPage={lastPage}
            >
                <Pagination.Controls style={{ flexDirection: "row" }}>
                    <Pagination.StepToPreviousButton aria-label="Previous" onClick={prevCardNum} />
                    <Pagination.PageList>
                        {({ state }) =>
                            state.range.map(pageNumber => (
                                <Pagination.PageListItem key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
                                    <CustomPageButton aria-label={`Page ${pageNumber}`} pageNumber={pageNumber} aria-current={state.currentPage === pageNumber ? 'page' : undefined} />
                                </Pagination.PageListItem>
                            ))
                        }
                    </Pagination.PageList>
                    <Pagination.StepToNextButton aria-label="Next" onClick={nextCardNum} />
                </Pagination.Controls>

            </Pagination>
        </PaginationDiv>
    );
};

const PaginationDiv = styled.div`
flex-direction: row;
/* border: 1px solid black; */
margin-top: 101px;
margin-bottom: 151px;
justify-content: center;
`

const CustomPageButton = styled(Pagination.PageButton)`

transition: background-color 0s ease-in-out;

  &[aria-current="page"] {
    background-color: ${(props) => props.theme.colors.Green};
    color: white;
    font-style:${(props) => props.theme.fontSizes.TextS};
  }
`;

export default PaginationBar;
