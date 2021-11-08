/**
 * Metronome.js
 * Main top level component for the app
 */

// Imports
import * as Tone from "tone";
import StepEngine from "../utils/StepEngine";
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useQuery } from 'react-query'
import patternList from "../assets/data/patternList";
import { Container, SideBar } from "../components/atoms/MainWindow";

import NavBar from "../components/NavBar";
import StepGrid from "../components/StepGrid";
import StepEditor from "../components/StepEditor";
import SoundOptions from "../components/SoundOptions";
import Patterns from "../components/Patterns";
import Drone from "../components/Drone";
import Notes from '../components/Notes'

// Globals
const initialData = patternList[0].data // Load the initial pattern

// Create the metronome engine
const engine = new StepEngine(initialData);

/**
 * Metronome Component
 * @returns {JSX.Element}
 * @constructor
 */
const Metronome = () => {

    // Get the pattern ID from the router params
    const { id } = useParams();
    const { isLoading, isError, data, error } = useQuery('fetchPattern', fetchPattern(id))



    // TODO Axios request to get pattern data

    // State variable to hold the step data
    const [stepData, setStepData] = useState(initialData)
    const [stepSelected, setStepSelected] = useState(stepData[0])
    const [stepActive, setStepActive] = useState(0)

    /**
     * Update Step Data
     */
    const updateStepData = (newStepData) => {
        setStepData(newStepData);
        engine.data = newStepData;
    }

    /**
     * Handles the play button
     */
    const playStopButtonHandler = () => {
        if(Tone.Transport.state === 'stopped') {
            // Reset back to zero
            engine.setToZero()
            setStepActive(0)
            // Schedules the clock
            Tone.Transport.scheduleRepeat((time) => {
                engine.step(time)
                setStepActive(engine.currentStep)
            }, "16n");
            // Start ToneJS
            Tone.start()
                .then(() => Tone.Transport.start())
             engine.isPlaying = true;
        } else if(Tone.Transport.state === 'started') {
            Tone.Transport.cancel()
            Tone.Transport.stop();
            engine.isPlaying = false;
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
    const updateStep = (step) => {
        const updatedData = stepData.map(item => step.id === item.id ? step : item)
        updateStepData(updatedData)
    }

    /**
     * Adds a new step with the data from the edit window
     * @param step
     */
    const addStep = (step) => updateStepData([...stepData, step])

    /**
     * Removes a step based on the id, reset the step edit back to the first step
     * @param id
     */
    const removeStep = (id) => {
        setStepData(stepData.filter(item => item.id !== id))
        setStepSelected(stepData[0])
    }

    // JSX

    return(<>
        <NavBar
            tone={Tone}
            playStopButtonHandler={playStopButtonHandler}
            engine={engine}
        />
        <Container>

            <SideBar>
                {stepSelected && <StepEditor
                    step={stepSelected}
                    updateStep={updateStep}
                    addStep={addStep}
                    removeStep={removeStep}/>}
                <SoundOptions
                    changeSound={engine.changeSound}
                    muteAltSound={engine.muteAltSound}
                    toggleResetSound={engine.toggleResetSound}
                />
                <Patterns
                    stepData={stepData}
                    updateStepData={updateStepData}
                />
                <Drone/>
                <Notes />
            </SideBar>

            <StepGrid
                stepData = {stepData}
                selectedStep={stepSelected}
                currentStep={stepActive}
                editStep={editStep}
                addStep={addStep}
            />
        </Container>
    </>)
}

export default Metronome
