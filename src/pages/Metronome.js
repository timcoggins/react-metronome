/**
 * Metronome.js
 * Main top level component for the app
 */

// Imports
import * as Tone from "tone";
import StepEngine from "../utils/StepEngine";
import { useEffect } from "react";
import { useContext } from "react";
import StepContext from "../contexts/StepContext";

import MainWindow from "../components/atoms/MainWindow";
import SideBar from "../components/atoms/SideBar";
import NavBar from "../components/molecules/NavBar";
import StepGrid from "../components/organisms/StepGrid";
import SoundOptions from "../components/organisms/SoundOptions";
import Patterns from "../components/organisms/Patterns";
import Drone from "../components/organisms/Drone";
import User from '../components/organisms/User'
import TransportControls from "../components/organisms/TransportControls";

import patternList from "../assets/data/patternList";

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

    // Import the context
    const { stepData } = useContext(StepContext)

    // Update the data in the engine
    useEffect(() => engine.data = stepData, [stepData])

    // JSX
    return (
        <>
            <NavBar>
                <TransportControls tone={Tone} engine={engine}/>
            </NavBar>
            <MainWindow>
                <SideBar>
                    <SoundOptions engine={engine}/>
                    <Patterns engine={engine}/>
                    <User />
                    <Drone/>
                </SideBar>
                <StepGrid engine={engine}/>
            </MainWindow>
        </>
    )
}

export default Metronome
