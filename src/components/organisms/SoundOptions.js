/**
 * SoundOptions.js
 * Component which provides the UI for sound selection and options
 */

// Imports

import { nanoid } from "nanoid";
import { useState, useEffect } from 'react'
import { useContext } from "react";
import EngineContext from "../../contexts/EngineContext";

import SideBarItem from "../molecules/SideBarItem";
import SideBarControls from "../atoms/SideBarControls";
import Select from "../atoms/Select";
import Input from "../atoms/Input";
import P from "../atoms/P"

// Sample List
import samples from '../../assets/data/sampleList'

/**
 * Sound Options Component
 * @param props
 * @returns {JSX.Element}
 */
const SoundOptions = () => {

    // Consume the engine context
    const { engine } = useContext(EngineContext)

    // State variables for the dropdown selectors
    const [downbeatSound, setDownbeatSound] = useState('samples/BD CR78 MPC60 05.wav')
    const [upbeatSound, setUpbeatSound] = useState('samples/Clave CR78 MPC60 10.wav')
    const [restartSound, setRestartSound] = useState('samples/CH CR78 B MPC60 07.wav')

    // State variables for the checkboxes
    const [toggleDownbeat, setToggleDownbeat] = useState(true);
    const [toggleUpbeat, setToggleUpbeat] = useState(true);
    const [toggleRestart, setToggleRestart] = useState(true);

    // Update the sounds if the user changed something
    // eslint-disable-next-line
    useEffect(() => engine.updateSounds(downbeatSound, upbeatSound, restartSound), [downbeatSound, upbeatSound, restartSound]);

    // Update the mute states in the step engine when a change is made
    // eslint-disable-next-line
    useEffect(() => engine.muteDownbeat(!toggleDownbeat), [toggleDownbeat]);
    // eslint-disable-next-line
    useEffect(() => engine.muteUpbeat(!toggleUpbeat), [toggleUpbeat]);
    // eslint-disable-next-line
    useEffect(() => engine.muteRestart(!toggleRestart), [toggleRestart]);


    // JSX Element
    return(
        <SideBarItem title={'Sound Options'}>

            {/* UI Element for choosing the main click sound */}
            <SideBarControls>
                <P>Downbeat sound:</P>
            </SideBarControls>
            <SideBarControls>
                <Select value={downbeatSound} disabled={!toggleDownbeat} onChange={(e) => setDownbeatSound(e.target.value)}>
                    {samples.length !== 0 && samples.map(item => <option key={nanoid()} value={item.file}>{item.name}</option>)}
                </Select>
                <Input type='checkbox' checked={toggleDownbeat} onChange={() => setToggleDownbeat(!toggleDownbeat)}/>
            </SideBarControls>

            {/* UI Element for choosing the alternate click sound */}
            <SideBarControls>
                <P>Upbeat sound:</P>
            </SideBarControls>
            <SideBarControls>
                <Select value={upbeatSound} disabled={ !toggleUpbeat } onChange={(e) => setUpbeatSound(e.target.value)}>
                    {samples.length !== 0 && samples.map(item => <option key={nanoid()} value={item.file}>{item.name}</option>)}
                </Select>
                <Input type='checkbox' checked={toggleUpbeat} onChange={() => setToggleUpbeat(!toggleUpbeat)}/>
            </SideBarControls>

            {/* UI Element for choosing the reset click sound */}
            <SideBarControls>
                <P>Restart sound:</P>
            </SideBarControls>
            <SideBarControls>
                <Select value={restartSound} disabled={!toggleRestart} onChange={(e) => setRestartSound(e.target.value)}>
                    {samples.length !== 0 && samples.map(item => <option key={nanoid()} value={item.file}>{item.name}</option>)}
                </Select>
                <Input type='checkbox' checked={toggleRestart} onChange={() => setToggleRestart(!toggleRestart)}/>
            </SideBarControls>
        </SideBarItem>
    )
}

export default SoundOptions