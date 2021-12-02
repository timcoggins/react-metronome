/**
 * EngineContext.js
 * Main top level component for the app
 */
// Imports
import * as Tone from "tone";
import { createContext, useState, useEffect } from "react";
import patternList from "../assets/data/patternList";

// Export the context
const Engine = createContext()
export default Engine

// Define the  variables for the engine
let data = patternList[0].data;

// Step Counters
let currentStep = 0;
let currentLargeStep = 0;
let currentSubStep = 0;
let useReset = true;

// Variables to store the path to the samples
let soundPrimary = './samples/BD CR78 MPC60 05.wav';
let soundSecondary = './samples/Clave CR78 MPC60 10.wav';
let soundReset = './samples/CLICKHIGH.wav';

// Tone Players
const vol = new Tone.Volume().toDestination();
const osc = new Tone.Player(soundPrimary).connect(vol);
const osc2 = new Tone.Player(soundSecondary).connect(vol);
const osc3 = new Tone.Player(soundReset).connect(vol);


/**
 * EngineProvider - Provides the engine context
 * @param children
 * @returns {JSX.Element}
 */
export const EngineProvider = ({ children }) => {

    // TODO Add checks to see if the samples are loaded before playing
    // TODO Make sure if the user deletes a step, we dont try to play that step
    // TODO Stop the metronome is we load a new pattern
    // TODO Implement volume controls

    // Declare state variables
    const [ stepData, setStepData ] = useState(patternList[0].data);
    const [ activeStep, setActiveStep ] = useState(0);
    const [ isPlaying, setIsPlaying ] = useState(false)

    // Put the stepData useState into the metronome data
    useEffect(() => data = stepData, [stepData])

    /**
     * Executes a step in the sequencer
     * @param time passed from Tone JS
     */
    const step = (time) => {

        // Check to see if we should play a sound on this step
        if(!data[currentStep].silent) {
            if(currentStep === 0 && currentLargeStep === 0 && currentSubStep === 0 && useReset === true) osc3.start(time).stop(time + 0.2);
            else if (currentLargeStep === 0 && currentSubStep === 0) osc.start(time).stop(time + 0.2);
            else if (currentSubStep === 0) osc2.start(time).stop(time + 0.2);
        }

        // Increment the step counters!
        if(currentSubStep < data[currentStep].base - 1) currentSubStep += 1;
        else {
            currentSubStep = 0;
            currentLargeStep += 1;
            if (currentLargeStep >= data[currentStep].length) {
                currentLargeStep = 0;
                if(currentStep >= data.length - 1) currentStep = 0
                else currentStep += 1;
                setActiveStep(currentStep)
            }
        }
    }

    /**
     * Resets the sequencer back to zero
     * @type {StepEngine}
     */
    const setToZero = () => {
        currentStep = 0;
        currentLargeStep = 0;
        currentSubStep = 0;
        setActiveStep(0)
    }

    /**
     * Starts the sequencer
      * @constructor
     */
    const start = () => {
        if(Tone.Transport.state === 'started') return

        // Reset the counters back to zero
        setToZero();

        // Schedules the clock
        Tone.Transport.scheduleRepeat((time) => step(time), "16n");

        // Start ToneJS
        Tone.start()
            .then(() => Tone.Transport.start())
            .catch(() => console.log('Error starting ToneJS'))
        setIsPlaying(true)
    }

    /**
     * Stops the sequencer
     * @constructor
     */
    const stop = () => {
        if(Tone.Transport.state === 'stopped') return
        Tone.Transport.cancel()
        Tone.Transport.stop();
        setIsPlaying(false)
    }

    /**
     * Updates the sound
     * @param primary
     * @param alt
     * @param reset
     */
    const updateSounds = (primary, alt, reset) => {

        // Store the values for when we want to save them later
        soundPrimary = primary;
        soundSecondary = alt;
        soundReset = reset;

        // Load the sounds into the sample players
        osc.load(`./${primary}`)
            .then(() => console.log('loaded primary'))
            .catch(() => console.log('could not load primary sample'))
        osc2.load(`./${alt}`)
            .then(() => console.log('loaded secondary'))
            .catch(() => console.log('could not load secondary sample'))
        osc3.load(`./${reset}`)
            .then(() => console.log('loaded reset'))
            .catch(() => console.log('could not load reset sample'))
    }

    /**
     * Check if we are ready to begin playback
     */
    // const checkIfReady = () => {
    //
    // }

    /**
     * Updates the global volume
     */
    const updateVolume = () => {

    }

    /**
     * Mutes the sounds
     * @param muted
     */
    const muteDownbeat = (muted) => osc.mute = muted;
    const muteUpbeat = (muted) => osc2.mute = muted;
    const muteRestart = (muted) => {
         useReset = !muted;
         osc3.mute = muted;
    }

    // JSX
    return (
        <Engine.Provider value={{
            data,
            activeStep,
            isPlaying,
            stepData,
            setStepData,
            start,
            stop,
            updateSounds,
            updateVolume,
            muteUpbeat,
            muteDownbeat,
            muteRestart,
            soundPrimary,
            soundSecondary,
            soundReset,
            osc,
            osc2,
            osc3
        }}>
            { children }
        </Engine.Provider>
    )
}