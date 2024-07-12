import styled from "styled-components";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { recoilExperiencePagination, recoilUserExperienceFilter, recoilUserExperienceNum } from "../../../../Atom/UserDataAtom";
import ArrowImage from "../../../../Assets/PaginationArrow.svg"
import ArrowImage2 from "../../../../Assets/PaginationArrow2.svg"

const PaginationExperience = () => {

    const resultCount = 6;
    const [totalCount] = useRecoilState(recoilUserExperienceNum);
    const [experiencePagination, setExperiencePagination] = useRecoilState(recoilExperiencePagination);
    const [experienceFilter] = useRecoilState(recoilUserExperienceFilter);
    const lastPage = Math.ceil(totalCount / resultCount);

    const handlePageChange = (pageNumber) => {
        let startNum = (pageNumber - 1) * resultCount;
        let endNum = Math.min(startNum + resultCount, totalCount);
        setExperiencePagination({
            startNum: startNum,
            endNum: endNum,
            pageNum: pageNumber,
        });
    };

    const prevCardNum = () => {
        if (experiencePagination.pageNum > 1) {
            handlePageChange(experiencePagination.pageNum - 1);
        }
    };

    const nextCardNum = () => {
        if (experiencePagination.pageNum < lastPage) {
            handlePageChange(experiencePagination.pageNum + 1);
        }
    };

    const startCardNum = () => {
        if (experiencePagination.pageNum > 1) {
            handlePageChange(1);
        }
    };

    const endCardNum = () => {
        if (experiencePagination.pageNum < lastPage) {
            handlePageChange(lastPage);
        }
    };

    useEffect(() => {
        setExperiencePagination({
            startNum: 0,
            endNum: resultCount,
            pageNum: 1,
        });
    }, [experienceFilter]);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= lastPage; i++) {
            pageNumbers.push(
                <PageButton
                    key={i}
                    aria-label={`Page ${i}`}
                    onClick={() => handlePageChange(i)}
                    aria-current={experiencePagination.pageNum === i ? 'page' : undefined}
                >
                    {i}
                </PageButton>
            );
        }
        return pageNumbers;
    };

    return (
        <PaginationDiv>
            <NavButton onClick={prevCardNum} disabled={experiencePagination.pageNum === 1}>
                <ArrowLeft src={ArrowImage} />
            </NavButton>
            {renderPageNumbers()}
            <NavButton onClick={nextCardNum} disabled={experiencePagination.pageNum === lastPage}>
                <ArrowRight src={ArrowImage} />
            </NavButton>
        </PaginationDiv>
    );
};




const PaginationDiv = styled.div`
    flex-direction: row;
    margin-top: 78px;
    margin-bottom: 152px;
    justify-content: center;
    /* border: 1px solid black; */
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
    /* margin: 0 4px; */
    padding: 8px 16px;
    /* border: 1px solid black; */
    cursor: pointer;
    font-size: ${(props) => props.theme.fontSizes.TextS};
    color: ${(props) => props.theme.color.black};

    &:disabled {
        cursor: not-allowed;
        color: ${(props) => props.theme.color.gray};
    }
`;

const ArrowLeft = styled.img`
width: 12px;
`

const ArrowRight = styled.img`
width: 12px;
transform: rotate(180deg);
`

const ArrowLeft2 = styled.img`
width: 18px;
`

const ArrowRight2 = styled.img`
width: 18px;
transform: rotate(180deg);
`

export default PaginationExperience;
