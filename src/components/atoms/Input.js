/**
 * Input.js
 * Styled Component for the different input types
 */
import styled from 'styled-components'

// Styles
const Input = styled.input`
      padding: 5px;
      color: ${props => props.theme.colors.selectText};
      background: ${props => props.theme.colors.selectBackground};
      border: 1px ${props => props.theme.colors.borderColor} solid;
`

export default Input;