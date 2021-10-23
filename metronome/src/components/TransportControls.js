import styled from 'styled-components'
import {useState} from 'react'
import * as Tone from "tone";

const Container = styled.div`
  margin: 50px;
`

const Button = styled.button`
  margin: 5px;
  height: 50px;
  width: 50px;
`

const TransportControls = (props) => {

    const [tempo, setTempo] = useState(120)
    const [volume, setVolume] = useState(120)

    const playButtonHandler =() => {
        Tone.start();
        Tone.Transport.start();
    }

    const stopButtonHandler =() => Tone.Transport.stop();

    const tempoHandler = (event) => {
        setTempo(event.target.value)
        Tone.Transport.bpm.value = event.target.value;
    }

    const volumeHandler = (event) => {
        setVolume(event.target.value)
        //Tone.Volume
    }


    return (
        <>
            <Container>
                <Button onClick={playButtonHandler}>Play</Button>
                <Button>Pause</Button>
                <Button onClick={stopButtonHandler}>Stop</Button>
                <input type="range" min="20" max="300" value={tempo} onChange={tempoHandler} />
                <input type="range" min="-60" max="0" value={volume} onChange={volumeHandler} />
            </Container>
        </>
    )
}

export default TransportControls