import styled from 'styled-components'
import { nanoid } from "nanoid";
import { useState, useEffect } from 'react'

import quaver from './../noun_quaver_1688935.png'
import semiquaver from './../noun_Sixteenth Note_88567.png'
import crochet from './../noun_quarter note_88568.png'
import minim from './../noun_Half Note_88569.png'

// Styled Components

const NoteValue =  styled.img`
height: 30px;
  width: 30px;
  cursor: pointer;
  .active {
    border: 3px #FF4141 solid;
  }
`

const Container = styled.div`
    background: white;
    width: 250px;
    height: 270px;
    border-bottom: #224422 3px dashed;
    border-right: #224422 3px dashed;
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

const Control = styled.div`
  display: flex;
  place-content: space-between;
  align-items: center;
`

// Component

const StepEditor = (props) => {

    // State variables
    const [stepToEdit, setStepToEdit] = useState();
    const [length, setLength] = useState(2);
    const [base, setBase] = useState(4);
    const [silentStep, setSilentStep] = useState(false);


    // When the parent updates the props, update our states
    useEffect(() => {
        setStepToEdit(props.step)
        setLength(props.step.length)
        setBase(props.step.base)
        setSilentStep(props.step.silent)
        console.log(props.step.silent)
    }, [props.step])

    // When the user changes the length or bass, update
    // eslint-disable-next-line
    useEffect(() => updateHandler(), [length, base, silentStep])


    /**
     * Handles updating a step in the parents state
     */

    const updateHandler = () => {
        if(stepToEdit === undefined) return;
        if(length <= 0) return
        const step = {
            id: stepToEdit.id,
            length: length,
            base: base,
            silent: silentStep
        }
        props.updateStep(step)
    }

    /**
     * Handles the add button
     */
    const addHandler = () => {
        const step = {
            id: nanoid(),
            length: length,
            base: base,
            playSub: false
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

    // JSX

    return(
        <Container>
            <h3>Edit Step</h3>

            <Control>
                <p>Repeats:</p>
                <input type='number' value={length} onChange={(e) => setLength(e.target.value)}/>
            </Control>
            <Control>
            <p>Division:</p>
                <NoteValue className={ base === 8 ? 'active' : ''} src={minim} onClick={() => setBase(8)}/>
                <NoteValue className={ base === 4 ? 'active' : ''} src={crochet} onClick={() => setBase(4)}/>
                <NoteValue className={ base === 2 ? 'active' : ''} src={quaver} onClick={() => setBase(2)}/>
                <NoteValue className={ base === 1 ? 'active' : ''} src={semiquaver} onClick={() => setBase(1)}/>
            </Control>
            <Control>
                <p>Silence Step:</p>
                <input type='checkbox' checked={silentStep} onChange={() => setSilentStep(!silentStep)}/>
            </Control>
            <Control>
                <p>Actions:</p>
                <div>
                    <button onClick={addHandler}>New</button>
                    <button onClick={removeHandler}>Delete</button>
                </div>
            </Control>
        </Container>
    )
}

export default StepEditor