/**
 * StepGrid.js
 * Container for all of the step block components
 */

// Imports

import { nanoid } from 'nanoid'
import StepBlock from "../molecules/StepBlock";
import StepBlockAdd from "../molecules/StepBlockAdd";
import BlockContainer from "../atoms/BlockContainer";

/**
 * StepGrid Component
 * @param props
 * @returns {JSX.Element}
 */
const StepGrid = (props) => {

    // JSX
    return(
        <BlockContainer>
            {/* Loop through and a display a block for each step*/}
            {props.stepData.map((item, index) =>
                <StepBlock key={nanoid()} value={item} editStep={props.editStep} currentStep={props.currentStep} index={index} selectedStep={props.selectedStep} activeStep={props.activeStep}/>
            )}
            <StepBlockAdd addStep={props.addStep}/>
        </BlockContainer>
    )
}

export default StepGrid