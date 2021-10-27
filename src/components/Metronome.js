import StepGrid from "./StepGrid";
import StepEditor from "./StepEditor";
import TransportControls from './TransportControls'
import SoundOptions from "./SoundOptions";
import Notes from './Notes'
//import Drone from "./Drone";
import Patterns from "./Patterns";

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
        silent: false
    },
    {
        id: nanoid(),
        length: 2,
        base: 2,
        silent: false
    },
    {
        id: nanoid(),
        length: 2,
        base: 2,
        silent: false
    },
    {
        id: nanoid(),
        length: 3,
        base: 2,
        silent: false
    }
];

// Styled Components

const Container = styled.div`
  display: flex;
  margin: 0 auto;
`

const SideBar = styled.div`
margin: 10px;
  
`

// Main Component

const Metronome = () => {

    const vol = new Tone.Volume().toDestination();
    // Setup ToneJS Oscillators
    const osc = new Tone.Player("./cr78/Bongo_Hi1_Orig_CR78.wav").connect(vol);
    const osc2 = new Tone.Player("./cr78/Rim_Orig_CR78.wav").connect(vol);
    const osc3 = new Tone.Player("./cr78/Cowb_Orig_CR78.wav").connect(vol);

    let useReset = true;

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
    const changeSound = (main, alt, reset) => {
        stopButtonHandler();
        console.log('updating the sounds')
        osc.load(`./${main}`)
            //.then((res) => console.log(res))
        osc2.load(`./${alt}`)
            //.then((res) => console.log(res))
        osc3.load(`./${reset}`)
    }

    /**
     * Mutes the sound of the alternate sample
     * @param muted
     */
    const muteAltSound = (muted) => osc2.mute = muted;
    const toggleResetSound = (muted) => useReset = muted;

    /**
     * Manages the sequencing of audio events
     * @param time
     * @constructor
     */
    const Step = (time) => {

        //console.log(`STEP ${currentStep} SUB: ${currentSubStep}`)

        // Play a sound or something
        if(!stepData[currentStep].silent) {
            if(currentStep === 0 && currentLargeStep === 0 && currentSubStep === 0 && useReset === true) osc3.start(time).stop(time + 0.3);
            else if (currentLargeStep === 0 && currentSubStep === 0) osc.start(time).stop(time + 0.3);
            else if (currentSubStep === 0) osc2.start(time).stop(time + 0.3);
        }


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
                } else {
                    currentStep += 1;
                }
                setActiveStep(currentStep)
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
     * Removes a step based on the id, reset the step edit back to the first step
     * @param id
     */
    const removeStep = (id) => {
        setStepData(stepData.filter(item => item.id !== id))
        setStepSelected(stepData[0])
    }

    /**
     * Updates the volume
     * @param volume
     */
    const updateVolume = (volume) => {vol.volume.value = volume}

    // JSX

    return(<>
        <TransportControls
            tone={Tone}
            playButtonHandler={playButtonHandler}
            stopButtonHandler={stopButtonHandler}
            updateVolume={updateVolume}
        />
        <Container>
            <SideBar>
                {stepSelected && <StepEditor step={stepSelected} updateStep={updateStep} addStep={addStep} removeStep={removeStep}/>}
                <SoundOptions
                    changeSound={changeSound}
                    muteAltSound={muteAltSound}
                    toggleResetSound={toggleResetSound}
                />
                <Patterns
                    setStepData={setStepData}
                />
                {/*<Drone/>*/}
                <Notes />
            </SideBar>
            <StepGrid
                stepData = {stepData}
                editStep={editStep}
                currentStep={activeStep}
                selectedStep={stepSelected}
                addStep={addStep}
            />
        </Container>
    </>)
}

export default Metronome
