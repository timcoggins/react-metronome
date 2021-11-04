/**
 * StepEditor.js
 * Component which handles the UI for editing a step
 */

// Imports

import styled from 'styled-components'
import { css } from 'styled-components'
import { Container, Expand, Heading, Controls } from '../atoms/SideBar'
import { nanoid } from "nanoid";
import { useState, useEffect } from 'react'

// Import the note images

import quaver from '../../images/noun_quaver_1688935.png'
import semiquaver from '../../images/noun_Sixteenth Note_88567.png'
import crochet from '../../images/noun_quarter note_88568.png'
import minim from '../../images/noun_Half Note_88569.png'

// Styled Components

const TopContainer = styled(Container)`
    border-top: #886F68 1px solid;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
`;

const NoteValue =  styled.img`
    height: 30px;
    width: 30px;
    cursor: pointer;
    padding: 5px;

    ${props => props.active && css`
      background: #efefef;
    `}
`;

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

    // State variable for the fold down display
    const [display, setDisplay] = useState(false)

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
        <TopContainer>
            {/* Title for the editor */}
            <Heading onClick={() => setDisplay(!display)}>
                <h3>Step Editor</h3>
                <Expand><span className="material-icons">
                    {display === true ? 'expand_less' : 'expand_more'}
                </span></Expand>
            </Heading>

            {display === true && <div>

                {/* UI Element for selecting the division of the step */}
                <Controls>
                    <p>Division:</p>
                    <NoteValue active={ stepBase === 8 } src={minim} onClick={() => setStepBase(8)}/>
                    <NoteValue active={ stepBase === 4 } src={crochet} onClick={() => setStepBase(4)}/>
                    <NoteValue active={ stepBase === 2 } src={quaver} onClick={() => setStepBase(2)}/>
                    <NoteValue active={ stepBase === 1 } src={semiquaver} onClick={() => setStepBase(1)}/>
                </Controls>

                {/* UI Element for controlling how many times a step repeats */}
                <Controls>
                    <p>Repeats:</p>
                    <input type='number' value={stepLength} onChange={(e) => setStepLength(e.target.value)}/>
                </Controls>

                {/* UI Element for toggling if the step is silent */}
                <Controls>
                    <p>Silence Step:</p>
                    <input type='checkbox' checked={stepSilent} onChange={() => setStepSilent(!stepSilent)}/>
                </Controls>

                {/* UI Elements for adding or deleting a step */}
                <Controls>
                    <p>Actions:</p>
                    <div>
                        <button onClick={addHandler}>New</button>
                        <button onClick={removeHandler}>Delete</button>
                    </div>
                </Controls>
            </div>}
        </TopContainer>
    )
}

export default StepEditor