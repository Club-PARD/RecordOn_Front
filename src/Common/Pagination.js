import styled from "styled-components";
import {
    Pagination,
    getLastPage,
    getVisibleResultsMax,
    getVisibleResultsMin,
} from '@workday/canvas-kit-react/pagination';

const PaginationBar = () => {

    const resultCount = 10;
    const totalCount = 100;
    const lastPage = getLastPage(resultCount, totalCount);


    return (
        <PaginationDiv>
            <Pagination
                onPageChange={pageNumber => console.log(pageNumber)}
                aria-label="Pagination"
                lastPage={lastPage}
            >
                <Pagination.Controls style={{ flexDirection: "row" }}>
                    <Pagination.StepToPreviousButton aria-label="Previous" />
                    <Pagination.PageList>
                        {({ state }) =>
                            state.range.map(pageNumber => (
                                <Pagination.PageListItem key={pageNumber}>
                                    <CustomPageButton aria-label={`Page ${pageNumber}`} pageNumber={pageNumber} aria-current={state.currentPage === pageNumber ? 'page' : undefined} />
                                </Pagination.PageListItem>
                            ))
                        }
                    </Pagination.PageList>
                    <Pagination.StepToNextButton aria-label="Next" />
                </Pagination.Controls>

            </Pagination>
        </PaginationDiv>
    );
};

const PaginationDiv = styled.div`
flex-direction: row;
/* border: 1px solid black; */
margin-top: 99px;
margin-bottom: 65px;

`

const CustomPageButton = styled(Pagination.PageButton)`

transition: background-color 0s ease-in-out;

  &[aria-current="page"] {
    background-color: ${(props) => props.theme.colors.Green};
    color: white;
    font-style:${(props) => props.theme.fontStyles.TextS};
    color: white;
  }
`;

export default PaginationBar;
