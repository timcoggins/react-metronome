/**
 * SliderContainer.js
 * Styled Component for placing the value and slider together
 */
import styled from "styled-components";

// Style
const SliderContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    align-items: center;
    color: ${props => props.theme.colors.contentText};
`

export default SliderContainer;