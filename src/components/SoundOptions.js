/**
 * SoundOptions.js
 * Component which provides the UI for sound selection and options
 */

// Imports

import { nanoid } from "nanoid";
import { useState, useEffect } from 'react'
import { Container, Expand, Heading, Controls } from './atoms/SideBar'
import sampleList from "../data/sampleList";

/**
 * Sound Options Component
 * @param props
 * @returns {JSX.Element}
 */

const SoundOptions = (props) => {

    // State variables for the dropdown selectors
    const [mainSound, setMainSound] = useState('cr78/Bongo_Hi1_Orig_CR78.wav')
    const [altSound, setAltSound] = useState('cr78/Rim_Orig_CR78.wav')
    const [resetSound, setResetSound] = useState('cr78/Cowb_Orig_CR78.wav')

    // State variables for the checkboxes
    const [toggleMuteAlt, setToggleMuteAlt] = useState(true);
    const [toggleReset, setToggleReset] = useState(true);

    // State variable for the fold down display
    const [display, setDisplay] = useState(false)

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
        <Container>
            {/* Title for the options */}
            <Heading onClick={() => setDisplay(!display)}>
                <h3>Sound Options</h3>
                <Expand><span className="material-icons">
                    {display === true ? 'expand_less' : 'expand_more'}
                </span></Expand>
            </Heading>

            {/* UI Element for choosing the main click sound */}
            {display === true && <div>
                <Controls>
                    <p>Main Sound:</p>
                    <select value={mainSound} onChange={(e) => setMainSound(e.target.value)}>
                        {sampleList.map(item => <option key={nanoid()} value={item.file}>{item.name}</option>)}
                    </select>
                </Controls>

                {/* UI Element for choosing the alternate click sound */}
                <Controls>
                    <p>Alt Sound:</p>
                    <input type='checkbox' checked={toggleMuteAlt} onChange={() => setToggleMuteAlt(!toggleMuteAlt)}/>
                    <select value={altSound} disabled={!toggleMuteAlt} onChange={(e) => setAltSound(e.target.value)}>
                        {sampleList.map(item => <option key={nanoid()} value={item.file}>{item.name}</option>)}
                    </select>
                </Controls>


                {/* UI Element for choosing the reset click sound */}
                <Controls>
                    <p>Reset Sound:</p>
                    <input type='checkbox' checked={toggleReset} onChange={() => setToggleReset(!toggleReset)}/>
                    <select value={resetSound} disabled={!toggleReset} onChange={(e) => setResetSound(e.target.value)}>
                        {sampleList.map(item => <option key={nanoid()} value={item.file}>{item.name}</option>)}
                    </select>
                </Controls>
            </div>}
        </Container>
    )
}

export default SoundOptions