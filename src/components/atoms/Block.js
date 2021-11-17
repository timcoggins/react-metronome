/**
 * Block.js
 * Styled Component for the step blocks
 */
import styled, {css} from "styled-components";

// Styles
const Block = styled.div`
    width: 150px;
    //height: 120px;
    //border-radius: 4px;
    border: 1px solid rgba(209, 213, 219, 0.3);
    margin: 0;
  padding: 0;
    
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    place-content: center;
    opacity: 0.9;
    
    cursor: pointer;
    
    backdrop-filter: blur(25px) saturate(191%);
    -webkit-backdrop-filter: blur(25px) saturate(191%);

    color: ${props => props.theme.colors.blockColor};
    background-color: ${props => props.theme.colors.blockBackground};
    
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    
    

    
    ${props => props.disabled && css`
        background: ${props => props.theme.colors.blockBackgroundDisabled};
        color: ${props => props.theme.colors.blockTextDisabled};
    `}
    
    ${props => props.primary && css`
        background: ${props => props.theme.colors.blockBackgroundPrimary};
        color: ${props => props.theme.colors.blockTextPrimary}
    `}
    
    ${props => props.active && css`
        background: ${props => props.theme.colors.blockBackgroundActive};
        color: ${props => props.theme.colors.blockTextActive}
    `}
`

export default Block;