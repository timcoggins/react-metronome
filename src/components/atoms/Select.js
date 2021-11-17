/**
 * Select.js
 * Styled Component for Select
 */
import styled from 'styled-components'

// Styles
const Select = styled.select`
    border-radius: 5px;
    padding: 2px;
    color: ${props => props.theme.colors.selectText}
    background: ${props => props.theme.colors.selectBackground}
`

export default Select;