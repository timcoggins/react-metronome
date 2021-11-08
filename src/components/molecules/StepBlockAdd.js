/**
 * StepBlock.js
 * Component for rendering a single step block
 */

// Import

import { nanoid } from "nanoid";
import Heading2 from "../atoms/H2"
import BlockAdd from "../atoms/BlockAdd";

/**
 * StepBlockAdd Component
 * @param props
 * @returns {JSX.Element}
 */

const StepBlockAdd = (props) => {

    const step = {
        id: nanoid(),
        length: 1,
        base: 4,
        silent: false
    }
    // JSX

    return(
        <BlockAdd onClick={() => props.addStep(step)}>
            <Heading2>+</Heading2>
        </BlockAdd>
    )
}

export default StepBlockAdd