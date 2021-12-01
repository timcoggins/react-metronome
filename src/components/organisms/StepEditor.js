// LEGACY
/**
 * StepEditor.js
 * Component which handles the UI for editing a step
 */

// Imports
import { nanoid } from "nanoid";
import { useState, useEffect } from 'react'
import SideBarItem from "../molecules/SideBarItem";
import SideBarControls from "../atoms/SideBarControls";
import Button from "../atoms/Button";
import P from "../atoms/P"
import Input from "../atoms/Input";
import NoteValue from "../atoms/NoteValue";

// Import the note images

import quaver from '../../assets/images/noun_quaver_1688935.png'
import semiquaver from '../../assets/images/noun_Sixteenth Note_88567.png'
import crochet from '../../assets/images/noun_quarter note_88568.png'
import minim from '../../assets/images/noun_Half Note_88569.png'


/**
 * StepEditor Component
 * @param props
 * @returns {JSX.Element}
 */
const StepEditor = (props) => {

    // State variables
    const [stepToEdit, setStepToEdit] = useState();
    const [stepLength, setStepLength] = useState(2);
    const [stepBase, setStepBase] = useState(4);
    const [stepSilent, setStepSilent] = useState(false);

    // When the user clicks on a block to edit it, update the data in our states
    useEffect(() => {
        setStepToEdit(props.step)
        setStepLength(props.step.length)
        setStepBase(props.step.base)
        setStepSilent(props.step.silent)
    }, [props.step])

    // When the user changes the length or bass, update
    // eslint-disable-next-line
    useEffect(() => updateHandler(), [stepLength, stepBase, stepSilent])


    /**
     * Handles updating a step in the parents state
     */
    const updateHandler = () => {
        if(stepToEdit === undefined) return;
        if(stepLength <= 0) return
        const step = {
            id: stepToEdit.id,
            length: stepLength,
            base: stepBase,
            silent: stepSilent
        }
        props.updateStep(step)
    }

    /**
     * Handles the add button
     */
    const addHandler = () => {
        const step = {
            id: nanoid(),
            length: stepLength,
            base: stepBase,
            silent: stepSilent
        }
        props.addStep(step)
    }

    /**
     * Handles the remove button
     */
    const removeHandler = () => {
        if(stepToEdit === undefined) return;
        props.removeStep(stepToEdit.id)
    }

    // JSX Elements

    return(
        <SideBarItem title={'Step Editor'}>

            {/* UI Element for selecting the division of the step */}
            <SideBarControls>
                <P>Division:</P>
                <NoteValue active={ stepBase === 8 } src={minim} onClick={() => setStepBase(8)}/>
                <NoteValue active={ stepBase === 4 } src={crochet} onClick={() => setStepBase(4)}/>
                <NoteValue active={ stepBase === 2 } src={quaver} onClick={() => setStepBase(2)}/>
                <NoteValue active={ stepBase === 1 } src={semiquaver} onClick={() => setStepBase(1)}/>
            </SideBarControls>

            {/* UI Element for controlling how many times a step repeats */}
            <SideBarControls>
                <P>Repeats:</P>
                <Input type='number' value={stepLength} onChange={(e) => setStepLength(e.target.value)}/>
            </SideBarControls>

            {/* UI Element for toggling if the step is silent */}
            <SideBarControls>
                <P>Silence Step:</P>
                <Input type='checkbox' checked={stepSilent} onChange={() => setStepSilent(!stepSilent)}/>
            </SideBarControls>

            {/* UI Elements for adding or deleting a step */}
            <SideBarControls>
                <P>Actions:</P>
                <div>
                    <Button onClick={addHandler}>New</Button>
                    <Button onClick={removeHandler}>Delete</Button>
                </div>
            </SideBarControls>
        </SideBarItem>
    )
}

export default StepEditor