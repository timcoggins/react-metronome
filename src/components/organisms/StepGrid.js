/**
 * StepGrid.js
 * Container for all of the step block components
 */

// Imports

import { nanoid } from 'nanoid'
import StepBlock from "../molecules/StepBlock";
import StepBlockAdd from "../molecules/StepBlockAdd";
import BlockContainer from "../atoms/BlockContainer";

import { useContext } from "react";
import StepContext from "../../contexts/StepContext";

/**
 * StepGrid Component
 * @param props
 * @returns {JSX.Element}
 */
const StepGrid = (props) => {

    const { stepData } = useContext(StepContext)

    // JSX
    return(
        <BlockContainer>
            {/* Loop through and a display a block for each step*/}
            {stepData.map((item, index) =>
                <StepBlock key={nanoid()} value={item} index={index} activeStep={props.activeStep}/>
            )}
            <StepBlockAdd addStep={props.addStep}/>
        </BlockContainer>
    )
}

export default StepGrid