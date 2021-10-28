/**
 * Transport Controls
 * Display the navbar and transport controls
 */

// Imports

import {useState} from 'react'
import { Container, Site, Logo, Controls, Button, SliderContainer } from './atoms/TopBar'
import * as Tone from "tone";
import logoImage from '../images/music.svg'

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
                {/*<span className="material-icons">timer</span>*/}
                <Logo src={logoImage} />
                <h1>Metronomical</h1>

            </Site>

            {/* Play Stop Tempo and Volume Controls */}
            <Controls>
                <Button onClick={props.playStopButtonHandler}>
                    <span
                        className="material-icons"
                        style={props.isPlaying === true ? {color: 'black'} : {color: 'green'}}
                    >
                        {props.isPlaying === true ? 'stop' : 'play_arrow'}
                    </span>
                </Button>
            </Controls>
            <Controls>
                <SliderContainer>
                    {tempo} bpm
                    <input type="range" min="10" max="350" value={tempo} onChange={tempoHandler} />
                </SliderContainer>
                <SliderContainer>
                    {volume}db
                    <input type="range" min="-40" max="0" value={volume} onChange={volumeHandler} />
                </SliderContainer>
            </Controls>
        </Container>
    )
}

export default TransportControls