import styled from 'styled-components'
import {useState} from 'react'
import * as Tone from "tone";

// Styles

const Container = styled.div`
  background: white;
  margin: 0;
  display: flex;
  
  h1 {
    margin: 0;
    padding: 0;
    font-size: 20px;
  }
`

const Button = styled.button`
  margin: 5px;
  height: 30px;
  width: 50px;
`

// Component

const TransportControls = (props) => {

    // State Variables
    const [tempo, setTempo] = useState(120)
    const [volume, setVolume] = useState(120)

    /**
     * Handles the play button
     */
    const playButtonHandler =() => {
        Tone.start();
        Tone.Transport.start();
    }

    /**
     * Handles the stop button
     * @returns {Transport}
     */
    const stopButtonHandler =() => Tone.Transport.stop();

    /**
     * Handles when the user changes the tempo slider
     * @param event
     */
    const tempoHandler = (event) => {
        setTempo(event.target.value)
        Tone.Transport.bpm.value = event.target.value;
    }

    // TODO Also display the specific BPM
    // TODO Implement a better slider

    /**
     * Handles when the user changes the volume slider
     * @param event
     */
    const volumeHandler = (event) => setVolume(event.target.value)

    // JSX

    return (
        <Container>
            <h1>Metronome</h1>
            <Button onClick={playButtonHandler}>Play</Button>
            <Button>Pause</Button>
            <Button onClick={stopButtonHandler}>Stop</Button>
            Tempo:<input type="range" min="20" max="300" value={tempo} onChange={tempoHandler} />
            Volume:<input type="range" min="-60" max="0" value={volume} onChange={volumeHandler} />
        </Container>
    )
}

export default TransportControls