/**
 * ButtonButton.js
 * Styled Component for a
 */
import styled from 'styled-components'

// Styles
const BlockButton = styled.button`
    background: ${props => props.theme.colors.blockBackground};
    color: ${props => props.theme.colors.buttonText};
    //border: 1px ${props => props.theme.colors.borderColor} solid;
    border: 0;
    cursor: pointer;
    padding: 6px;
    //border-radius: 8px;
    width: 70px;
    height: 70px;
    //margin: 2px;
    opacity: 0.7;

  &:hover {
    background: ${props => props.theme.colors.blockBackgroundHover};
    color: ${props => props.theme.colors.blockTextHover};
  }
`

export default BlockButton;