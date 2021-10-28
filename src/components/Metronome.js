/**
 * Metronome.js
 * Main top level component for the app
 */

// Imports
import { Container, SideBar } from "./atoms/MainWindow";
import { useState } from "react";
import * as Tone from "tone";
import patternList from "../data/patternList";

import StepGrid from "./StepGrid";
import StepEditor from "./StepEditor";
import TransportControls from './TransportControls'
import SoundOptions from "./SoundOptions";
import Notes from './Notes'
import Drone from "./Drone";
import Patterns from "./Patterns";


// Globals
const initialData = patternList[0].data // Load the initial pattern

// Setup ToneJS volume node and sample players
const vol = new Tone.Volume().toDestination();
const osc = new Tone.Player("./cr78/Bongo_Hi1_Orig_CR78.wav").connect(vol);
const osc2 = new Tone.Player("./cr78/Rim_Orig_CR78.wav").connect(vol);
const osc3 = new Tone.Player("./cr78/Cowb_Orig_CR78.wav").connect(vol);

let useReset = true;

// Counters for Steps
let currentStep = 0;
let currentLargeStep = 0
let currentSubStep = 0;


/**
 * Metronome Component
 * @returns {JSX.Element}
 * @constructor
 */

const Metronome = () => {

    // State variable to hold the step data
    const [stepData, setStepData] = useState(initialData)
    const [stepSelected, setStepSelected] = useState(stepData[0])
    const [activeStep, setActiveStep] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false);

    /**
     * Manages the sequencing of audio events
     * @param time
     * @constructor
     */
    const Step = (time) => {

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
     * Update the click sounds
     * @param main
     * @param alt
     * @param reset
     */
    const changeSound = (main, alt, reset) => {
        osc.load(`./${main}`)
        osc2.load(`./${alt}`)
        osc3.load(`./${reset}`)
    }

    /**
     * Mutes the sound of the alternate sample
     * @param muted
     */
    const muteAltSound = (muted) => osc2.mute = muted;
    const toggleResetSound = (muted) => useReset = muted;

    /**
     * Handles the play button
     */
    const playStopButtonHandler = () => {
        if(Tone.Transport.state === 'stopped') {
            // Reset back to zero
            currentStep = 0;
            currentLargeStep = 0;
            currentSubStep = 0;
            setActiveStep(currentStep)
            // Schedules the clock
            Tone.Transport.scheduleRepeat((time) => Step(time), "16n");
            // Start ToneJS
            Tone.start()
                .then(() => Tone.Transport.start())
            setIsPlaying(true)
            return;
        }

        if(Tone.Transport.state === 'started') {
            Tone.Transport.cancel()
            Tone.Transport.stop();
            setIsPlaying(false)
            return;
        }
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
            playStopButtonHandler={playStopButtonHandler}
            isPlaying={isPlaying}
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
                <Drone/>
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
