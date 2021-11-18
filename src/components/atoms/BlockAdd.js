/**
 * BlockAdd.js
 * Styled Component for the block which adds steps
 */
import styled from "styled-components";

// Styles
const BlockAdd = styled.div`
    width: 150px;
    height: 150px;
    //border-radius: 4px;
    border: 1px solid rgba(209, 213, 219, 0.3);
  
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
  
    cursor: pointer;
  
    opacity: 0.4;
    color: white;
  
    background: #477147;
    backdrop-filter: blur(25px) saturate(191%);
    -webkit-backdrop-filter: blur(25px) saturate(191%);
  
    &:hover {
        background-color: rgba(199, 199, 199, 0.75)
    }
`;

export default BlockAdd;