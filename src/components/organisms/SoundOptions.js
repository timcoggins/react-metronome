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
import Input from "../atoms/Input";

/**
 * Sound Options Component
 * @param props
 * @returns {JSX.Element}
 */
const SoundOptions = (props) => {

    const [sampleList, setSampleList] = useState([])

    // State variables for the dropdown selectors
    const [downbeatSound, setDownbeatSound] = useState('samples/BD CR78 MPC60 05.wav.wav')
    const [upbeatSound, setUpbeatSound] = useState('samples/Clave CR78 MPC60 10.wav')
    const [restartSound, setRestartSound] = useState('samples/CH CR78 B MPC60 07.wav')

    // State variables for the checkboxes
    const [toggleDownbeat, setToggleDownbeat] = useState(true);
    const [toggleUpbeat, setToggleUpbeat] = useState(true);
    const [toggleRestart, setToggleRestart] = useState(true);

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
    useEffect(() => props.engine.updateSounds(downbeatSound, upbeatSound, restartSound), [downbeatSound, upbeatSound, restartSound]);

    // Update the mute states in the step engine when a change is made
    // eslint-disable-next-line
    useEffect(() => props.engine.muteDownbeat(!toggleDownbeat), [toggleDownbeat]);
    // eslint-disable-next-line
    useEffect(() => props.engine.muteUpbeat(!toggleUpbeat), [toggleUpbeat]);
    // eslint-disable-next-line
    useEffect(() => props.engine.muteRestart(!toggleRestart), [toggleRestart]);


    // JSX Element
    return(
        <SideBarItem title={'Sound Options'}>

            {/* UI Element for choosing the main click sound */}
            <SideBarControls>
                Downbeat sound:
            </SideBarControls>
            <SideBarControls>
                <Select value={downbeatSound} disabled={!toggleDownbeat} onChange={(e) => setDownbeatSound(e.target.value)}>
                    {sampleList.length !== 0 && sampleList.map(item => <option key={nanoid()} value={item.file}>{item.name}</option>)}
                </Select>
                <Input type='checkbox' checked={toggleDownbeat} onChange={() => setToggleDownbeat(!toggleDownbeat)}/>
            </SideBarControls>

            {/* UI Element for choosing the alternate click sound */}
            <SideBarControls>
                Upbeat sound:
            </SideBarControls>
            <SideBarControls>
                <Select value={upbeatSound} disabled={ !toggleUpbeat } onChange={(e) => setUpbeatSound(e.target.value)}>
                    {sampleList.length !== 0 && sampleList.map(item => <option key={nanoid()} value={item.file}>{item.name}</option>)}
                </Select>
                <Input type='checkbox' checked={toggleUpbeat} onChange={() => setToggleUpbeat(!toggleUpbeat)}/>
            </SideBarControls>

            {/* UI Element for choosing the reset click sound */}
            <SideBarControls>
                Restart sound:
            </SideBarControls>
            <SideBarControls>
                <Select value={restartSound} disabled={!toggleRestart} onChange={(e) => setRestartSound(e.target.value)}>
                    {sampleList.length !== 0 && sampleList.map(item => <option key={nanoid()} value={item.file}>{item.name}</option>)}
                </Select>
                <Input type='checkbox' checked={toggleRestart} onChange={() => setToggleRestart(!toggleRestart)}/>
            </SideBarControls>
        </SideBarItem>
    )
}

export default SoundOptions