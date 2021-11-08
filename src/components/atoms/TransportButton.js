/**
 * TransportButton.js
 * Styled Component for the Play/Stop Button
 */
import styled from "styled-components";

// Styles
const TransportButton = styled.button`
    margin: 5px;
    height: 30px;
    width: 50px;
    display: grid;
    place-items: center;
    cursor: pointer;
    color: ${props => props.theme.colors.buttonColor};
    background: ${props => props.theme.colors.buttonBackground};
    border: 0;
`

export default TransportButton;