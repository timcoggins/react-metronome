/**
 * Block.js
 * Component for rendering a single step block
 */

// Import

import styled from "styled-components";
import {nanoid} from "nanoid";

// Styles

const StyledBlock = styled.div`
    width: 70px;
    height: 120px;
    border-radius: 4px;
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


/**
 * AddStepBlock Component
 * @param props
 * @returns {JSX.Element}
 */

const AddStepBlock = (props) => {

    const step = {
        id: nanoid(),
        length: 1,
        base: 4,
        silent: false
    }
    // JSX

    return(
        <StyledBlock onClick={() => props.addStep(step)}>
            <h2>+</h2>
        </StyledBlock>
    )
}

export default AddStepBlock