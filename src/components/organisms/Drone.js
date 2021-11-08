/**
 * Drone.js
 * Component for playing back drones from the sidebar
 */

// Imports
import * as Tone from "tone";
import { useState } from "react";

import SideBarItem from "../molecules/SideBarItem";
import SliderContainer from "../atoms/SliderContainer";
import TransportButton from "../atoms/TransportButton";
import SideBarControls from "../atoms/SideBarControls";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import P from "../atoms/P"

import droneList from "../../assets/data/droneList";

// Globals
const droneVolume = new Tone.Volume().toDestination();
const dronePlayer = new Tone.Player(droneList[0].file).connect(droneVolume);
dronePlayer.loop = true;

/**
 * Drone Component
 * @returns {JSX.Element}
 */
const Drone = () => {

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

    /**
     * Handles when the user changes the drone
     * @param event
     */
    const droneHandler = (event) => {
        setIsLoading(true)
        setFileLoaded(event.target.value)
        dronePlayer.load(event.target.value)
            .then(() => setIsLoading(false))
            .catch(() => {setFileLoaded('Error Loading File')})
    }

    return(
        <SideBarItem title={'Drones'}>
            <SideBarControls>
                <Select onChange={droneHandler}>
                    {droneList.map(item => <option value={item.file}>{item.name}</option>)}
                </Select>
                <TransportButton disabled={isLoading} onClick={playButtonHandler}>
                    <span className="material-icons" style={isPlaying === true ? {color: 'black'} : {color: 'green'}}>
                        {isPlaying === true ? 'stop' : 'play_arrow'}
                    </span>
                </TransportButton>
            </SideBarControls>
            <SideBarControls>
                <P>Volume</P>
                <SliderContainer>
                    {volume}db
                    <Input type="range" min="-40" max="0" value={volume} onChange={volumeHandler} />
                </SliderContainer>
            </SideBarControls>
            <SideBarControls>
                {isLoading && <P>Loading: {fileLoaded}</P>}
            </SideBarControls>
        </SideBarItem>
    )
}

export default Drone