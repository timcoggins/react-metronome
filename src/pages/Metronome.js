/**
 * Metronome.js
 * Main top level component for the app
 */

// Imports
import axios from 'axios'
import * as Tone from "tone";
import StepEngine from "../utils/StepEngine";
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useState, useEffect } from "react";
import patternList from "../assets/data/patternList";

import UserMessage from '../components/molecules/UserMessage'

import MainWindow from "../components/atoms/MainWindow";
import SideBar from "../components/atoms/SideBar";
import NavBar from "../components/molecules/NavBar";
import StepGrid from "../components/organisms/StepGrid";
import StepEditor from "../components/organisms/StepEditor";
import SoundOptions from "../components/organisms/SoundOptions";
import Patterns from "../components/organisms/Patterns";
import Drone from "../components/organisms/Drone";
import Notes from '../components/organisms/Notes'
import TransportControls from "../components/organisms/TransportControls";

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

    // TODO Axios request to get pattern data
    const { isLoading, data, isError } = useQuery(
        // query key: an array with a name and a variable used in the endpoint
        ["Fetch Pattern"],
        // note that we are importing an axios instance with base URL so we only need to change the endpoint
        () => {
            if(id === undefined) return axios.get(`http://localhost:80/patterns/2`)
            return axios.get(`http://localhost:80/patterns/${id}`)
        },
        {
            enabled: true, // this stops the query from running automatically
            retry: 1,
        }
    );

    // When the data arrives update the data in the application
    useEffect(() => {
        if(!isLoading && !isError) updateStepData(data.data.data)
    }, [data, isLoading, isError])


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

    return (
    <>
        <NavBar>
            <TransportControls
                tone={Tone}
                playStopButtonHandler={playStopButtonHandler}
                engine={engine}
            />
        </NavBar>
        { isLoading && <UserMessage title={'Loading'}>Please wait</UserMessage>}
        { isError && <UserMessage title={'Error'}>Could not load pattern</UserMessage>}
        { !isLoading && !isError && <MainWindow>

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
        </MainWindow>}
    </>
    )
}

export default Metronome
