import { Routes, Route } from 'react-router-dom'
import ThemeExample from '../Style/ThemeExample';
import HomePage from '../Pages/Home'
import RegisterPage from '../Pages/RegisterPage'
import Header from '../Common/Header';
import styled from "styled-components"
import ProjectPage from '../Pages/ProjectPage';
import ExperiencePage from '../Pages/ExperiencePage';

function Router() {
    return (
        <Container>
            <Header />
            <Routes>

                <Route path='/' element={<HomePage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/project' element={<ProjectPage />} />
                <Route path='/experience' element={<ExperiencePage />} />
                {/* theme 사용 에시 페이지 */}
                {/* <Route path='/theme' element={<ThemeExample />} /> */}
            </Routes>
        </Container>
    );
}

const Container = styled.div`
width: ${(props) => props.width || '100%'};
height: ${(props) => props.height || '100%'};
display: ${(props) => props.display || 'flex'};
/* flex-direction: ${(props) => props.flexDirection || 'row'}; */
justify-content: ${(props) => props.justifyContent || 'center'};
align-items: ${(props) => props.alignItems || 'center'};
align-content: ${(props) => props.alignContent || ''};
background-color: ${(props) => props.backgroundColor || 'white'};
/* border: ${(props) => props.border || '1px solid black'}; */
color: ${(props) => props.theme.colors.primary_normal};
font-size: ${(props) => props.theme.fontSizes.title1};
font-weight: ${(props) => props.fontWeight || "bold"};
margin: ${(props) => props.margin || ""};
padding: ${(props) => props.padding || ""};
box-sizing: border-box;
position: ${(props) => props.position || ''};

`

export default Router;
