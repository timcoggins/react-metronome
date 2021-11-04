/**
 * Drone.js
 * Component for playing back drones from the sidebar
 */

// Imports

import { Container, Expand, Heading, Controls } from './atoms/SideBar'
import { SliderContainer} from "./atoms/TopBar";
import { useState } from "react";
import * as Tone from "tone";
import {Button} from "./atoms/TopBar";
import droneList from "../assets/data/droneList";


// Globals

const droneVolume = new Tone.Volume().toDestination();
const dronePlayer = new Tone.Player(droneList[0].file).connect(droneVolume);
dronePlayer.loop = true;

/**
 * Drone Component
 * @param props
 * @returns {JSX.Element}
 */

const Drone = () => {

    // State for the fold down display
    const [display, setDisplay] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [fileLoaded, setFileLoaded] = useState('./drones/03 Cello Drone D.mp3')
    const [isLoading, setIsLoading] = useState(false)
    const [volume, setVolume] = useState(-6)

    /**
     * Handles the play button
     */
    const playButtonHandler = () => {
        if(dronePlayer.state === 'stopped') {
            dronePlayer.start()
            setIsPlaying(true)
        } else {
            dronePlayer.stop()
            setIsPlaying(false)
        }
    }

    /**
     * Handles when the user changes the volume slider
     * @param event
     */
    const volumeHandler = (event) => {
        setVolume(event.target.value)
        droneVolume.volume.value = event.target.value;
    }

    const droneHandler = (event) => {
        setIsLoading(true)
        setFileLoaded(event.target.value)
        dronePlayer.load(event.target.value)
            .then(() => setIsLoading(false))
            .catch(() => {setFileLoaded('Error Loading File')})

    }

    return(
        <Container>
            <Heading onClick={() => setDisplay(!display)}>
                <h3>Drones</h3>
                <Expand><span className="material-icons">
                    {display === true ? 'expand_less' : 'expand_more'}
                </span></Expand>
            </Heading>

            {display === true && <>
                <Controls>
                    <p>Key</p>
                    <select onChange={droneHandler}>
                        {droneList.map(item => <option value={item.file}>{item.name}</option>)}
                    </select>
                    <Button disabled={isLoading} onClick={playButtonHandler}>
                        <span className="material-icons" style={isPlaying === true ? {color: 'black'} : {color: 'green'}}>
                            {isPlaying === true ? 'stop' : 'play_arrow'}
                        </span>
                    </Button>
                </Controls>

                <Controls>
                    <p>Volume</p>
                    <SliderContainer>
                        {volume}db
                        <input type="range" min="-40" max="0" value={volume} onChange={volumeHandler} />
                    </SliderContainer>
                </Controls>

                <Controls>
                    {isLoading && <p>Loading: {fileLoaded}</p>}
                </Controls>
            </>
            }

        </Container>
    )

}

export default Drone