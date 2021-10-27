/**
 * Transport Controls
 * Display the navbar and transport controls
 */

// Imports

import styled from 'styled-components'
import {useState} from 'react'
import * as Tone from "tone";

// Styles

const Container = styled.div`
    background: white;
    margin: 0;
    display: flex;
    place-content: space-between;
    align-items: center;
    border-bottom: #886F68 1px solid;
  
    // Styles for the application title
    h1 {
        margin-left: 5px;
        padding: 0;
        font-size: 20px;
    }
`

const Site = styled.div`
  margin: 0 0 0 10px;
  display: flex;
  align-items: center;
`

const Controls = styled.div`
  display: flex;
  align-items: center;
`

const Button = styled.button`
  margin: 5px;
  height: 30px;
  width: 50px;
  display: grid;
  place-items: center;
  cursor: pointer;
`

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
`

/**
 * TransportControls Componenet
 * @param props
 * @returns {JSX.Element}
 */

const TransportControls = (props) => {

    // State Variables
    const [tempo, setTempo] = useState(120)
    const [volume, setVolume] = useState(-6)

    /**
     * Handles when the user changes the tempo slider
     * @param event
     */
    const tempoHandler = (event) => {
        setTempo(event.target.value)
        Tone.Transport.bpm.value = event.target.value;
    }

    /**
     * Handles when the user changes the volume slider
     * @param event
     */
    const volumeHandler = (event) => {
        setVolume(event.target.value)
        props.updateVolume(event.target.value)
    }

    // JSX

    return (
        <Container>
            {/* Site Title */}
            <Site>
                <span className="material-icons">timer</span>
                <h1>Programmable Metronome</h1>

            </Site>

            {/* Play Stop Tempo and Volume Controls */}
            <Controls>
                <Button onClick={props.playButtonHandler}><span className="material-icons" style={{color: "green"}}>play_arrow</span></Button>
                <Button onClick={props.stopButtonHandler}><span className="material-icons">stop</span></Button>
            </Controls>
            <Controls>
                <SliderContainer>
                    {tempo} bpm
                    <input type="range" min="10" max="350" value={tempo} onChange={tempoHandler} />
                </SliderContainer>
                <SliderContainer>
                    {volume}db
                    <input type="range" min="-60" max="0" value={volume} onChange={volumeHandler} />
                </SliderContainer>
            </Controls>
        </Container>
    )
}

export default TransportControls