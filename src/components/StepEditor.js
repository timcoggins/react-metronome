/**
 * StepEditor.js
 * Component which handles the UI for editing a step
 */

// Imports

import styled from 'styled-components'
import { nanoid } from "nanoid";
import { useState, useEffect } from 'react'

// Import the note images

import quaver from './../noun_quaver_1688935.png'
import semiquaver from './../noun_Sixteenth Note_88567.png'
import crochet from './../noun_quarter note_88568.png'
import minim from './../noun_Half Note_88569.png'

// Styled Components

const Container = styled.div`
    background: white;
    width: 250px;
    border-bottom: #224422 2px dashed;
    border-right: #224422 2px dashed;
    text-align: left;
    padding: 10px;
    margin: 0;

    input[type="number"] {
      width: 60px;
      cursor: pointer;
    }
    
    button {
      margin: 10px 3px;
      cursor: pointer;
    }
`

const Controls = styled.div`
    display: flex;
    place-content: space-between;
    align-items: center;
`

const NoteValue =  styled.img`
    height: 30px;
    width: 30px;
    cursor: pointer;
    .active {
      border: 3px #FF4141 solid;
    }
`

const Heading = styled.div`
  display: flex;
  place-content: space-between;
  align-items: center;
  cursor: pointer;
`

const Expand = styled.div`
  color: white;
  width: 30px;
  height: 30px;
  padding: 1px;
  background: gainsboro;
  border-radius: 20px;
  display: grid;
  place-items: center;
`

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
        <Container>
            {/* Title for the editor */}
            <Heading>
                <h3>Step Editor</h3>
                <Expand onClick={() => setDisplay(!display)}><span className="material-icons">
                    {display === true ? 'expand_less' : 'expand_more'}
                </span></Expand>
            </Heading>

            {display === true && <div>
                {/* UI Element for controlling how many times a step repeats */}
                <Controls>
                    <p>Repeats:</p>
                    <input type='number' value={stepLength} onChange={(e) => setStepLength(e.target.value)}/>
                </Controls>

                {/* UI Element for selecting the division of the step */}
                <Controls>
                <p>Division:</p>
                    <NoteValue className={ stepBase === 8 ? 'active' : ''} src={minim} onClick={() => setStepBase(8)}/>
                    <NoteValue className={ stepBase === 4 ? 'active' : ''} src={crochet} onClick={() => setStepBase(4)}/>
                    <NoteValue className={ stepBase === 2 ? 'active' : ''} src={quaver} onClick={() => setStepBase(2)}/>
                    <NoteValue className={ stepBase === 1 ? 'active' : ''} src={semiquaver} onClick={() => setStepBase(1)}/>
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
        </Container>
    )
}

export default StepEditor