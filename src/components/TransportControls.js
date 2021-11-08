/**
 * Transport Controls
 * Display the navbar and transport controls
 */

// Imports

import { useState, useEffect } from 'react'
import { Controls, Button, SliderContainer } from './atoms/TopBar'
import * as Tone from "tone";

/**
 * TransportControls Componenet
 * @param props
 * @returns {JSX.Element}
 */

const TransportControls = (props) => {

    // State Variables
    const [tempo, setTempo] = useState(120)
    const [volume, setVolume] = useState(-6)

    const [isPlaying, setIsPlaying] = useState(false)
    useEffect(() => setIsPlaying(props.engine.isPlaying), [props.engine.isPlaying])

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
        props.engine.updateVolume(event.target.value)
    }

    // JSX

    return (
        <>
            <Controls>
                <Button onClick={props.playStopButtonHandler}>
                    <span
                        className="material-icons"
                        style={isPlaying === true ? {color: 'black'} : {color: 'green'}}
                    >
                        {isPlaying === true ? 'stop' : 'play_arrow'}
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
        </>
    )
}

export default TransportControls