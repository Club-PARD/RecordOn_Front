import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {

    const navigator = useNavigate();

    const writeHandler = () => {
        navigator("/WritingPage")
    }

    const myPageHandler = () => {
        navigator("/MyPage")
    }

    return (
        // 전체 컨테이너
        <Container>
            <Div justifyContent="space-between" backgroundColor="none">
                <Div position="relative" backgroundColor="none">

                    <Div position="absolute" backgroundColor="none">
                    </Div>
                    <Div position="absolute" width="130px" height="55px">
                    </Div>
                    <Div position="absolute" width="93px" height="35px" margin="0 630px 0 0">
                    </Div>
                    <Div position="absolute" width="100px" height="35px" margin="0 0 0  630px" onClick={myPageHandler}>
                        <Div>
                        </Div>
                        <Div>사용자</Div>
                    </Div>
                </Div>
            </Div>
        </Container>
    )
}

export default Header


/* 스타일 컴포넌트 선언 */

const Container = styled.div`
display: flex;
height: 60px;
width:100%;
background-color:  none;
justify-content: center;
border: ${(props) => props.border || '1px solid black'};
`

const Div = styled.div`
width: ${(props) => props.width || '100%'};
height: ${(props) => props.height || '100%'};
display: ${(props) => props.display || 'flex'};
flex-direction: ${(props) => props.flexDirection || 'row'};
justify-content: ${(props) => props.justifyContent || 'center'};
align-items: ${(props) => props.alignItems || 'center'};
align-content: ${(props) => props.alignContent || ''};
background-color: ${(props) => props.backgroundColor || 'white'};
border: ${(props) => props.border || '1px solid black'};
font-size: ${(props) => props.fontSize || "15px"};
font-weight: ${(props) => props.fontWeight || "bold"};
margin: ${(props) => props.margin || ""};
padding: ${(props) => props.padding || ""};
box-sizing: border-box;
position: ${(props) => props.position || ''};
`
const Input = styled.input`
width: ${(props) => props.width || '100%'};
height: ${(props) => props.height || '100%'};
background-color: ${(props) => props.backgroundColor || 'white'};
color: ${(props) => props.color || "black"};
font-size: ${(props) => props.fontSize || "15px"};
font-weight: ${(props) => props.fontWeight || ""};
box-sizing: border-box;
border: 0.5px solid #dbdbdb;
padding: ${(props) => props.padding || ""};
border-radius: 5px;
/* input 태그 placeholder 스타일 정하기 */
    &::placeholder{
        color: #dbdbdb;
    }
`

const Img = styled.img`
width: ${(props) => props.width || '100%'};
height: ${(props) => props.height || '100%'};
border-radius: ${(props) => props.borderRadius || ''};
`