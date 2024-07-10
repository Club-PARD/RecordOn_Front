import styled from "styled-components";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { recoilProjectPagination, recoilUserProjectFilter, recoilUserProjectNum } from "../Atom/UserDataAtom";
import ArrowImage from "../Assets/DropdownArrow.svg"

const PaginationBar = () => {

    const resultCount = 6;
    const [totalCount] = useRecoilState(recoilUserProjectNum);
    const [projectPagination, setProjectPagination] = useRecoilState(recoilProjectPagination);
    const [projectFilter] = useRecoilState(recoilUserProjectFilter);
    const lastPage = Math.ceil(totalCount / resultCount);

    const handlePageChange = (pageNumber) => {
        let startNum = (pageNumber - 1) * resultCount;
        let endNum = Math.min(startNum + resultCount, totalCount);
        setProjectPagination({
            startNum: startNum,
            endNum: endNum,
            pageNum: pageNumber,
        });
    };

    const prevCardNum = () => {
        if (projectPagination.pageNum > 1) {
            handlePageChange(projectPagination.pageNum - 1);
        }
    };

    const nextCardNum = () => {
        if (projectPagination.pageNum < lastPage) {
            handlePageChange(projectPagination.pageNum + 1);
        }
    };

    useEffect(() => {
        setProjectPagination({
            startNum: 0,
            endNum: resultCount,
            pageNum: 1,
        });
    }, [projectFilter]);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= lastPage; i++) {
            pageNumbers.push(
                <PageButton
                    key={i}
                    aria-label={`Page ${i}`}
                    onClick={() => handlePageChange(i)}
                    aria-current={projectPagination.pageNum === i ? 'page' : undefined}
                >
                    {i}
                </PageButton>
            );
        }
        return pageNumbers;
    };

    return (
        <PaginationDiv>
            <NavButton onClick={prevCardNum} disabled={projectPagination.pageNum === 1}>
                <ArrowLeft src={ArrowImage} />
            </NavButton>
            {renderPageNumbers()}
            <NavButton onClick={nextCardNum} disabled={projectPagination.pageNum === lastPage}>
                Next
            </NavButton>
        </PaginationDiv>
    );
};

const PaginationDiv = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 101px;
    margin-bottom: 151px;
    justify-content: center;
`;

const PageButton = styled.button`
    background: none;
    border: none;
    margin: 0 4px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: ${(props) => props.theme.fontSizes.TextS};
    color: ${(props) => props.theme.color.black};

    &[aria-current="page"] {
        background-color: ${(props) => props.theme.color.base1};
        color: ${(props) => props.theme.color.black};
        border-radius: 20px;
    }
`;

const NavButton = styled.button`
    background: none;
    border: none;
    margin: 0 4px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: ${(props) => props.theme.fontSizes.TextS};
    color: ${(props) => props.theme.color.black};

    &:disabled {
        cursor: not-allowed;
        color: ${(props) => props.theme.color.gray};
    }
`;

const ArrowLeft = styled.img`
width: 18px;
transform: rotate(45);


`

export default PaginationBar;
