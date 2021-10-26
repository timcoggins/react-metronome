import StepGrid from "./StepGrid";
import StepEditor from "./StepEditor";
import TransportControls from './TransportControls'

import styled from 'styled-components'
import {useState} from "react";
import { nanoid } from 'nanoid'
import * as Tone from "tone";

// Start up sequence

const initialData = [
    {
        id: nanoid(),
        length: 3,
        base: 2,
        playSub: true
    },
    {
        id: nanoid(),
        length: 3,
        base: 4,
        playSub: true
    },
    {
        id: nanoid(),
        length: 2,
        base: 8,
        playSub: false
    },
    {
        id: nanoid(),
        length: 2,
        base: 16,
        playSub: false
    }
];

// Styled Components

const Container = styled.div`
  display: flex;
  margin: 0 auto;
`

// Main Component
// TODO Implement the sound logic

const Metronome = () => {

    // State variable to hold the step data
    const [stepData, setStepData] = useState(initialData)
    const [stepSelected, setStepSelected] = useState()

    /**
     * Opens a step in the edit window
     * @param id
     */
    const editStep = (id) => {
        const step = stepData.filter(item => item.id === id)
        setStepSelected(step[0])
    }

    /**
     * Updates a step from the data in the edit window
     * @param step
     */
    const updateStep = (step) => {
        setStepData(stepData.map(item => step.id === item.id ? step : item))
    }

    /**
     * Adds a new step with the data from the edit window
     * @param step
     */
    const addStep = (step) => setStepData([...stepData, step])

    /**
     * Removes a step based on the id
     * @param id
     */
    const removeStep = (id) => setStepData(stepData.filter(item => item.id !== id))

    // JSX

    return(<>
        <TransportControls tone={Tone}/>
        <Container>
            {stepSelected && <StepEditor step={stepSelected} updateStep={updateStep} addStep={addStep} removeStep={removeStep}/>}
            <StepGrid stepData = {stepData} editStep={editStep}/>
        </Container>
    </>)
}

export default Metronome






/*
 const osc = new Tone.Player("./cr78/Rim_Orig_CR78.wav").toDestination();
 const osc2 = new Tone.Player("./cr78/OH_1_Orig_CR78.wav").toDestination();
 const osc3 = new Tone.Player("./cr78/Cowb_Orig_CR78.wav").toDestination();
 */

/*
let currentStep = 0;
let currentSubStep = 0;

const Step = (time) => {

    if (currentStep > blockTimes.length - 1) {
        currentStep = 0;
        currentSubStep = 0
        console.log('reset')
        osc3.start(time).stop(time + 0.1);
        return
    }

    if (currentSubStep > blockTimes[currentStep]) {
        currentSubStep = 0
        currentStep += 1;
        osc2.start(time).stop(time + 0.1);
        console.log(`step ${currentStep}`)
    } else {
        currentSubStep += 1;
        osc.start(time).stop(time + 0.1);
    }
}

// repeated event every 8th note
Tone.Transport.scheduleRepeat((time) => Step(time), "16n");
*/