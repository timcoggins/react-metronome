import StepGrid from "./StepGrid";
import StepEditor from "./StepEditor";
import TransportControls from './TransportControls'
import SoundOptions from "./SoundOptions";
import Notes from './Notes'

import styled from 'styled-components'
import { useState } from "react";
import { nanoid } from 'nanoid'
import * as Tone from "tone";

// Start up sequence

const initialData = [
    {
        id: nanoid(),
        length: 3,
        base: 1,
        playSub: true
    },
    {
        id: nanoid(),
        length: 2,
        base: 2,
        playSub: true
    },
    {
        id: nanoid(),
        length: 4,
        base: 1,
        playSub: false
    },
    {
        id: nanoid(),
        length: 3,
        base: 2,
        playSub: true
    },
    {
        id: nanoid(),
        length: 5,
        base: 1,
        playSub: true
    },
    {
        id: nanoid(),
        length: 1,
        base: 8,
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

    // Setup ToneJS Oscillators
    const osc = new Tone.Player("./cr78/Bongo_Hi1_Orig_CR78.wav").toDestination();
    const osc2 = new Tone.Player("./cr78/Rim_Orig_CR78.wav").toDestination();

    // Counters for Steps
    let currentStep = 0;
    let currentLargeStep = 0
    let currentSubStep = 0;

    // State variable to hold the step data
    const [stepData, setStepData] = useState(initialData)
    const [stepSelected, setStepSelected] = useState(stepData[0])
    const [activeStep, setActiveStep] = useState(0)

    /**
     * Update the click sounds
     * @param main
     * @param alt
     */
    const changeSound = (main, alt) => {
        stopButtonHandler();
        console.log('updating the sounds')
        osc.load(`./${main}`)
            //.then((res) => console.log(res))
        osc2.load(`./${alt}`)
            //.then((res) => console.log(res))
    }

    /**
     * Mutes the sound of the alternate sample
     * @param muted
     */
    const muteAltSound = (muted) => osc2.mute = muted;

    /**
     * Manages the sequencing of audio events
     * @param time
     * @constructor
     */
    const Step = (time) => {

        //console.log(`STEP ${currentStep} SUB: ${currentSubStep}`)

        // Play a sound or something
        if(currentLargeStep === 0 && currentSubStep === 0) osc.start(time).stop(time + 0.3);
        else if(currentSubStep === 0) osc2.start(time).stop(time + 0.3);


        // Increment the step counters!
        if (currentSubStep < stepData[currentStep].base - 1) {
            currentSubStep += 1;
        } else {
            currentSubStep = 0;
            currentLargeStep += 1;
            if (currentLargeStep >= stepData[currentStep].length) {
                currentLargeStep = 0;
                if(currentStep >= stepData.length - 1) {
                    currentStep = 0
                    setActiveStep(currentStep)
                } else {
                    currentStep += 1;
                    setActiveStep(currentStep)
                }
            }
        }
    }

    /**
     * Handles the play button
     */
    const playButtonHandler = () => {
        if(Tone.Transport.state === 'started') return;
        // Reset back to zero
        currentStep = 0;
        currentSubStep = 0;
        setActiveStep(currentStep)
        // Schedules the clock
        Tone.Transport.scheduleRepeat((time) => Step(time), "16n");
        // Start ToneJS
        Tone.start()
            .then(() => Tone.Transport.start())
    }

    /**
     * Handles the stop button
     * @returns {Transport}
     */
    const stopButtonHandler = () => {
        if(Tone.Transport.state === 'stopped') return;
        Tone.Transport.cancel()
        Tone.Transport.stop();
    }

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
    const updateStep = (step) => setStepData(stepData.map(item => step.id === item.id ? step : item))

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
        <TransportControls tone={Tone} playButtonHandler={playButtonHandler} stopButtonHandler={stopButtonHandler}/>
        <Container>
            <div>
                {stepSelected && <StepEditor step={stepSelected} updateStep={updateStep} addStep={addStep} removeStep={removeStep}/>}
                <SoundOptions
                    changeSound={changeSound}
                    muteAltSound={muteAltSound}
                />
                <Notes />
            </div>
            <StepGrid
                stepData = {stepData}
                editStep={editStep}
                currentStep={activeStep}
                selectedStep={stepSelected}
            />
        </Container>
    </>)
}

export default Metronome
