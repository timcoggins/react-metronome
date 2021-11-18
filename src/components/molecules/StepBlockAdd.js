/**
 * StepBlock.js
 * Component for rendering a single step block
 */

// Import

import { nanoid } from "nanoid";
import Heading2 from "../atoms/H2"
import BlockAdd from "../atoms/BlockAdd";

import { useContext } from "react";
import StepContext from "../../contexts/StepContext";

/**
 * StepBlockAdd Component
 * @param props
 * @returns {JSX.Element}
 */
const StepBlockAdd = (props) => {

    // Use the context
    const { stepData, setStepData } = useContext(StepContext)



    /**
     * Adds a new step to the Step Data
     */
    const addStep = () => {
        const step = {
            id: nanoid(),
            length: 1,
            base: 4,
            silent: false
        }
        setStepData([...stepData, step])
    }

    // JSX

    return(
        <BlockAdd onClick={addStep}>
            <Heading2>+</Heading2>
        </BlockAdd>
    )
}

export default StepBlockAdd