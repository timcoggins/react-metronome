/**
 * SoundOptions.js
 * Component which provides the UI for sound selection and options
 */

// Imports
import axios from "axios";
import { nanoid } from "nanoid";
import { useState, useEffect } from 'react'
import SideBarItem from "../molecules/SideBarItem";
import SideBarControls from "../atoms/SideBarControls";
import Select from "../atoms/Select";
import P from "../atoms/P"
import Input from "../atoms/Input";

/**
 * Sound Options Component
 * @param props
 * @returns {JSX.Element}
 */
const SoundOptions = (props) => {

    // State variables for the dropdown selectors
    const [mainSound, setMainSound] = useState('samples/BD CR78 MPC60 05.wav.wav')
    const [altSound, setAltSound] = useState('samples/Clave CR78 MPC60 10.wav')
    const [resetSound, setResetSound] = useState('samples/CH CR78 B MPC60 07.wav')
    const [sampleList, setSampleList] = useState([])

    // State variables for the checkboxes
    const [toggleMuteAlt, setToggleMuteAlt] = useState(true);
    const [toggleReset, setToggleReset] = useState(true);

    /**
     * Axios request to get the samples
     */
    const getSampleList = () => {
        // Make a request for a user with a given ID
        axios.get('http://localhost/samples')
            .then(response => setSampleList([...response.data]))
            .catch(error => console.log(error));
    }

    // Get the list of samples when the component mounts
    useEffect(() => getSampleList(), [])

    // Update the sounds if the user changed something
    // eslint-disable-next-line
    useEffect(() => props.changeSound(mainSound, altSound, resetSound), [mainSound, altSound, resetSound]);

    // Update the state of the mute alternate sound if the toggles
    // eslint-disable-next-line
    useEffect(() => props.muteAltSound(!toggleMuteAlt), [toggleMuteAlt]);

    // Update the state of the reset sound if the user toggles
    // eslint-disable-next-line
    useEffect(() => props.toggleResetSound(toggleReset), [toggleReset]);


    // JSX Element
    return(
        <SideBarItem title={'Sound Options'}>

            {/* UI Element for choosing the main click sound */}
            <SideBarControls>
                <P>Main Sound:</P>
                <Select value={mainSound} onChange={(e) => setMainSound(e.target.value)}>
                    {sampleList.length !== 0 && sampleList.map(item => <option key={nanoid()} value={item.file}>{item.name}</option>)}
                </Select>
            </SideBarControls>

            {/* UI Element for choosing the alternate click sound */}
            <SideBarControls>
                <P>Alt Sound:</P>
                <Input type='checkbox' checked={toggleMuteAlt} onChange={() => setToggleMuteAlt(!toggleMuteAlt)}/>
                <Select value={altSound} disabled={!toggleMuteAlt} onChange={(e) => setAltSound(e.target.value)}>
                    {sampleList.length !== 0 && sampleList.map(item => <option key={nanoid()} value={item.file}>{item.name}</option>)}
                </Select>
            </SideBarControls>

            {/* UI Element for choosing the reset click sound */}
            <SideBarControls>
                <P>Reset Sound:</P>
                <Input type='checkbox' checked={toggleReset} onChange={() => setToggleReset(!toggleReset)}/>
                <Select value={resetSound} disabled={!toggleReset} onChange={(e) => setResetSound(e.target.value)}>
                    {sampleList.length !== 0 && sampleList.map(item => <option key={nanoid()} value={item.file}>{item.name}</option>)}
                </Select>
            </SideBarControls>
        </SideBarItem>
    )
}

export default SoundOptions