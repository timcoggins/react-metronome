/**
 * Button.js
 * Styled Component for a standard button
 */
import styled from 'styled-components'

// Styles
const Button = styled.button`
    background: ${props => props.theme.colors.buttonBackground};
    color: ${props => props.theme.colors.buttonText};
    border: 1px ${props => props.theme.colors.borderColor} solid;
    padding: 6px;
    border-radius: 4px;
`

export default Button;