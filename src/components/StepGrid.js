/**
 * StepGrid.js
 * Container for all of the step block components
 */

// Imports

import { nanoid } from 'nanoid'
import styled from 'styled-components'
import Block from "./Block";
import AddStepBlock from "./AddStepBlock";

// Styles

const Container = styled.div`
    flex-grow: 1;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 5px;
`;

/**
 * StepGrid Component
 * @param props
 * @returns {JSX.Element}
 */

const StepGrid = (props) => {

    // JSX

    return(
        <Container>
            {/* Loop through and a display a block for each step*/}
            {props.stepData.map((item, index) =>
                <Block key={nanoid()} value={item} editStep={props.editStep} currentStep={props.currentStep} index={index} selectedStep={props.selectedStep}/>
            )}
            <AddStepBlock addStep={props.addStep}/>
        </Container>
    )
}

export default StepGrid