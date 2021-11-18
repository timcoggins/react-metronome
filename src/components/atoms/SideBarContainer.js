/**
 * SideBarContainer.js
 * Styled Component for the Side Bar Container
 */
import styled from 'styled-components'
import css from 'styled-components'

// Styles
const SideBarContainer = styled.div`
    padding: 0 15px;
    margin: 0;
    
    border-bottom: ${props => props.theme.colors.borderColor} 1px solid;
    border-right: ${props => props.theme.colors.borderColor} 1px solid;
  
    background: ${props => props.theme.colors.contentBackground};
    
    text-align: left;

    ${props => props.first && css`
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
    `}

    ${props => props.last && css`
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
    `}
  
    p {
      word-wrap: break-word;
    }
`

export default SideBarContainer;