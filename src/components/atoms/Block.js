/**
 * Block.js
 * Styled Component for the step blocks
 */
import styled, {css} from "styled-components";

// Styles
const Block = styled.div`
    width: 70px;
    height: 120px;
    border-radius: 4px;
    border: 1px solid rgba(209, 213, 219, 0.3);
    
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.9;
    
    cursor: pointer;
    
    backdrop-filter: blur(25px) saturate(191%);
    -webkit-backdrop-filter: blur(25px) saturate(191%);
    background-color: rgba(255, 255, 255, 0.62);
    
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    
    
    &:hover {
        background-color: rgb(97, 141, 92)
    }
    
    ${props => props.disabled && css`
        background: #6d736d;
        color: white;
    `}
    
    ${props => props.primary && css`
        background: #477147;
        color: white;
    `}
    
    ${props => props.active && css`
        background: cornflowerblue;
        color: white;
    `}
`

export default Block;