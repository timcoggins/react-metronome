import {nanoid} from "nanoid";
import { useState, useEffect } from 'react'
import styled from "styled-components";
import sampleList from "../sampleList";

const Container = styled.div`
  height: 230px;
  border-right: #224422 3px dashed;
  padding: 10px;
  margin: 0;
  text-align: left;
  
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  place-content: space-between;
`


const SoundOptions = (props) => {

    // State variables for the dropdown selectors
    const [mainSound, setMainSound] = useState('cr78/Bongo_Hi1_Orig_CR78.wav')
    const [altSound, setAltSound] = useState('cr78/Rim_Orig_CR78.wav')
    const [muteAlt, setMuteAlt] = useState(false);

    // Update the sounds if the user changed something
    useEffect(() => {
        console.log('sound changed')
        props.changeSound(mainSound, altSound);
    }, [mainSound, altSound])

    // Update the state of the mute thingy if the user changes something
    useEffect(() => {
        props.muteAltSound(muteAlt)
    }, [muteAlt]);

    return(
        <Container>
            <h3>Sound Options</h3>
            <Controls>
                <p>Main Sound:</p>
                <select value={mainSound} onChange={(e) => setMainSound(e.target.value)}>
                    {sampleList.map(item => <option key={nanoid()} value={item.file}>{item.name}</option>)}
                </select>
            </Controls>
            <Controls>
                <p>Alt Sound:</p>
                <select value={altSound} onChange={(e) => setAltSound(e.target.value)}>
                    {sampleList.map(item => <option key={nanoid()} value={item.file}>{item.name}</option>)}
                </select>
            </Controls>
            <Controls>
                <p>Mute Alt Sound</p>
                <input type='checkbox' value={muteAlt} onChange={() => setMuteAlt(!muteAlt)}/>
            </Controls>

        </Container>
    )
}

export default SoundOptions