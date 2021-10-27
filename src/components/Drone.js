// Styled Components

import styled from "styled-components";
import { useState } from "react";
//import * as Tone from "tone";

const Container = styled.div`
    border-bottom: #886F68 1px solid;
    border-right: #886F68 1px solid;
    padding: 10px;
    margin: 0;
    text-align: left;
    background: white;
`

const Controls = styled.div`
    display: flex;
    align-items: center;
    place-content: space-around;
`

const Heading = styled.div`
  display: flex;
  place-content: space-between;
  align-items: center;
  cursor: pointer;
`

const Expand = styled.div`
  color: white;
  width: 30px;
  height: 30px;
  padding: 1px;
  background: gainsboro;
  border-radius: 20px;
  display: grid;
  place-items: center;
  margin-right: 10px;
`

const droneFiles = [
    {
        file: './drones/01 Cello Drone C.mp3',
        name: 'C'
    }/*,
    {
        file: './drones/02 Cello Drone G.mp3',
        name: 'G'
    },
    {
        file: './drones/03 Cello Drone D.mp3',
        name: 'D'
    },
    {
        file: './drones/03 Cello Drone A.mp3',
        name: 'A'
    },
    {
        file: './drones/03 Cello Drone E.mp3',
        name: 'E'
    }*/
]


const Drone = (props) => {
    // State for the fold down display
    const [display, setDisplay] = useState(false)

    //const dronePlayer = new Tone.Player("./drones/03 Cello Drone D.mp3").toDestination();



    return(
        <Container>
            <Heading>
                <h3>Drones</h3>
                <Expand onClick={() => setDisplay(!display)}><span className="material-icons">
                    {display === true ? 'expand_less' : 'expand_more'}
                </span></Expand>
            </Heading>
            {display === true && <Controls>
                <p>Key</p>
                <select onChange={(e) => {
                    console.log(e.target.value)
                    //dronePlayer.load(e.target.value)
                        //.then(res => console.log(res))
                }}>
                    {droneFiles.map(item => <option value={item.file}>{item.name}</option>)}
                </select>
                {/*<button onClick={() => dronePlayer.start()}><span className="material-icons" style={{color: "green"}}>play_arrow</span></button>
                <button onClick={() => dronePlayer.stop()}><span className="material-icons">stop</span></button>*/}
            </Controls>}

        </Container>
    )

}

export default Drone