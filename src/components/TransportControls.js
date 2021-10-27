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
  
  border-bottom: #224422 3px dashed;
  
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
`

// Component

const TransportControls = (props) => {

    // State Variables
    const [tempo, setTempo] = useState(120)
    const [volume, setVolume] = useState(120)



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
            <Site>
                <span className="material-icons">timer</span>
                <h1>Programmable Metronome</h1>

            </Site>


            <Controls>
                <Button onClick={props.playButtonHandler}><span className="material-icons" style={{color: "green"}}>play_arrow</span></Button>
                <Button onClick={props.stopButtonHandler}><span className="material-icons">stop</span></Button>
                BPM: {tempo} <input type="range" min="20" max="300" value={tempo} onChange={tempoHandler} />
                Volume:<input type="range" min="-60" max="0" value={volume} onChange={volumeHandler} />
            </Controls>
        </Container>
    )
}

export default TransportControls