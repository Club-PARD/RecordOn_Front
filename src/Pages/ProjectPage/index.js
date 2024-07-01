import styled from "styled-components"



const ProjectPage = () => {

    return (

        <Container>
            안녕하세요

        </Container>
    )

}

const Container = styled.div`
width: ${(props) => props.width || ''};
height: ${(props) => props.height || ''};
display: ${(props) => props.display || ''};
flex-direction: ${(props) => props.flexDirection || ''};
justify-content: ${(props) => props.justifyContent || ''};
align-items: ${(props) => props.alignItems || ''};
align-content: ${(props) => props.alignContent || ''};
background-color: ${(props) => props.backgroundColor || ''};
/* border: ${(props) => props.border || '1px solid black'}; */
color: ${(props) => props.theme.colors.primary_normal};
font-size: ${(props) => props.theme.fontSizes.title1};
/* font-weight: ; */
margin: ${(props) => props.margin || ""};
padding: ${(props) => props.padding || ""};
box-sizing: border-box;
position: ${(props) => props.position || ''};
`

export default ProjectPage;