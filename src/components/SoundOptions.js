/**
 * SoundOptions.js
 * Component which provides the UI for sound selection and options
 */

// Imports

import { nanoid } from "nanoid";
import { useState, useEffect } from 'react'
import { Container, Expand, Heading, Controls } from './atoms/SideBar'
import axios from "axios";



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

    // State variable for the fold down display
    const [display, setDisplay] = useState(false)


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
                        {sampleList.length !== 0 && sampleList.map(item => <option key={nanoid()} value={item.file}>{item.name}</option>)}
                    </select>
                </Controls>

                {/* UI Element for choosing the alternate click sound */}
                <Controls>
                    <p>Alt Sound:</p>
                    <input type='checkbox' checked={toggleMuteAlt} onChange={() => setToggleMuteAlt(!toggleMuteAlt)}/>
                    <select value={altSound} disabled={!toggleMuteAlt} onChange={(e) => setAltSound(e.target.value)}>
                        {sampleList.length !== 0 && sampleList.map(item => <option key={nanoid()} value={item.file}>{item.name}</option>)}
                    </select>
                </Controls>


                {/* UI Element for choosing the reset click sound */}
                <Controls>
                    <p>Reset Sound:</p>
                    <input type='checkbox' checked={toggleReset} onChange={() => setToggleReset(!toggleReset)}/>
                    <select value={resetSound} disabled={!toggleReset} onChange={(e) => setResetSound(e.target.value)}>
                        {sampleList.length !== 0 && sampleList.map(item => <option key={nanoid()} value={item.file}>{item.name}</option>)}
                    </select>
                </Controls>
             </div>}
        </Container>
    )
}

export default SoundOptions