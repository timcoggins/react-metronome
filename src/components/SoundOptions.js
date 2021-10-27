/**
 * SoundOptions.js
 * Component which provides the UI for sound selection and options
 */

// Imports

import { nanoid } from "nanoid";
import { useState, useEffect } from 'react'
import styled from "styled-components";
import sampleList from "../sampleList";

// Styled Components

const Container = styled.div`
    border-bottom: #224422 2px dashed;
    border-right: #224422 2px dashed;
    padding: 10px;
    margin: 0;
    text-align: left;
    background: white;
`

const Controls = styled.div`
    display: flex;
    align-items: center;
    place-content: space-between;
`

const Heading = styled.div`
  display: flex;
  place-content: space-between;
  align-items: center;
  cursor: pointer;
`

const Expand = styled.div`
  color: white;
  width: 30px;
  height: 30px;
  padding: 1px;
  background: gainsboro;
  border-radius: 20px;
  display: grid;
  place-items: center;
`

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
            <Heading>
                <h3>Sound Options</h3>
                <Expand onClick={() => setDisplay(!display)}><span className="material-icons">
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
                    <select value={altSound} disabled={!toggleReset} onChange={(e) => setResetSound(e.target.value)}>
                        {sampleList.map(item => <option key={nanoid()} value={item.file}>{item.name}</option>)}
                    </select>
                </Controls>
            </div>}
        </Container>
    )
}

export default SoundOptions