import styled from 'styled-components'
import { nanoid } from "nanoid";
import { useState, useEffect } from 'react'

import quaver from './../noun_quaver_1688935.png'
import semiquaver from './../noun_Sixteenth Note_88567.png'
import crochet from './../noun_quarter note_88568.png'
import minim from './../noun_Half Note_88569.png'

// Styled Components

const NoteValue =  styled.img`
height: 50px;
  width: 50px;
  .active {
    border: 3px #FF4141 solid;
  }
`

const Container = styled.div`
    background: white;
    width: 250px;
    height: 400px;
  input {
    width: 60px;
  }

  button {
    margin: 10px auto;
  }
`

// Component

const StepEditor = (props) => {

    // State variables
    const [stepToEdit, setStepToEdit] = useState();
    const [length, setLength] = useState()
    const [base, setBase] = useState()

    // When the parent updates the props, update our states
    useEffect(() => {
        setStepToEdit(props.step)
        setLength(props.step.length)
        setBase(props.step.base)
    }, [props.step])

    // When the user changes the length or bass, update
    // eslint-disable-next-line
    useEffect(() => updateHandler(), [length, base])


    /**
     * Handles updating a step in the parents state
     */

    const updateHandler = () => {
        if(stepToEdit === undefined) return;
        const step = {
            id: stepToEdit.id,
            length: length,
            base: base,
            playSub: false
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
            <h2>Edit</h2>

            <p>Length</p>
            <input type='number' value={length} onChange={(e) => setLength(e.target.value)}/>

            <p>Base</p>
            <NoteValue className={ base === 2 ? 'active' : ''} src={minim} onClick={() => setBase(2)}/>
            <NoteValue className={ base === 4 ? 'active' : ''} src={crochet} onClick={() => setBase(4)}/>
            <NoteValue className={ base === 8 ? 'active' : ''} src={quaver} onClick={() => setBase(8)}/>
            <NoteValue className={ base === 16 ? 'active' : ''} src={semiquaver} onClick={() => setBase(16)}/>

            <div>
                <button onClick={addHandler}>New</button>
                <button onClick={removeHandler}>Delete</button>
            </div>
        </Container>
    )
}

export default StepEditor