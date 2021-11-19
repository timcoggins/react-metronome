/**
 * Button.js
 * Styled Component for a standard button
 */
import styled from 'styled-components'
import { css } from 'styled-components'

// Styles
const Button = styled.button`
    background: ${props => props.theme.colors.buttonBackground};
    color: ${props => props.theme.colors.buttonText};
    border: 1px ${props => props.theme.colors.borderColor} solid;
    padding: 6px;
    border-radius: 4px;

    ${props => props.disabled && css`
        background: ${props => props.theme.colors.buttonBackgroundDisabled};
        color: ${props => props.theme.colors.buttonTextDisabled};
      cursor: none;
    `}
`

export default Button;