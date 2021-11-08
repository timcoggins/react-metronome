/**
 * Button.js
 * Styled Component for a standard button
 */
import styled from 'styled-components'

// Styles
const Button = styled.button`
    background: ${props => props.theme.colors.buttonBackground};
    color: ${props => props.theme.colors.buttonColor};
    border: 0;
    padding: 5px;
`

export default Button;