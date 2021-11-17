/**
 * Select.js
 * Styled Component for Select
 */
import styled from 'styled-components'

// Styles
const Select = styled.select`
      border: 1px ${props => props.theme.colors.borderColor} solid;
      border-radius: 5px;
      padding: 5px;
      color: ${props => props.theme.colors.selectText};
      background: ${props => props.theme.colors.selectBackground};
`

export default Select;