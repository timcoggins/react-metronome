/**
 * Metronome.js
 * Main top level component for the app
 */

// Imports
import MainWindow from "../components/atoms/MainWindow";
import SideBar from "../components/atoms/SideBar";
import NavBar from "../components/molecules/NavBar";
import StepGrid from "../components/organisms/StepGrid";
import SoundOptions from "../components/organisms/SoundOptions";
import Patterns from "../components/organisms/Patterns";
import Drone from "../components/organisms/Drone";
import User from '../components/organisms/User'
import TransportControls from "../components/organisms/TransportControls";
import Options from "../components/organisms/Options";

/**
 * Metronome Component
 * @returns {JSX.Element}
 * @constructor
 */
const Metronome = () => {
    // JSX
    return (
        <>
            <NavBar>
                <TransportControls/>
            </NavBar>
            <MainWindow>
                <SideBar>
                    <SoundOptions/>
                    <Patterns/>
                    <User />
                    <Drone/>
                    <Options />
                </SideBar>
                <StepGrid/>
            </MainWindow>
        </>
    )
}

export default Metronome
