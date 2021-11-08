/**
 * Transport Controls
 * Display the navbar and transport controls
 */

// Imports
import { useState, useEffect } from 'react'
import TransportContainer from "../atoms/TransportContainer";
import TransportButton from "../atoms/TransportButton";
import SliderContainer from "../atoms/SliderContainer";
import * as Tone from "tone";
import Input from "../atoms/Input";

/**
 * TransportControls Component
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
            <TransportContainer>
                <TransportButton onClick={props.playStopButtonHandler}>
                    <span
                        className="material-icons"
                        style={isPlaying === true ? {color: 'black'} : {color: 'green'}}
                    >
                        {isPlaying === true ? 'stop' : 'play_arrow'}
                    </span>
                </TransportButton>
            </TransportContainer>
            <TransportContainer>
                <SliderContainer>
                    {tempo} bpm
                    <Input type="range" min="10" max="350" value={tempo} onChange={tempoHandler} />
                </SliderContainer>
                <SliderContainer>
                    {volume}db
                    <Input type="range" min="-40" max="0" value={volume} onChange={volumeHandler} />
                </SliderContainer>
            </TransportContainer>
        </>
    )
}

export default TransportControls