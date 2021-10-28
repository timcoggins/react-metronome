/**
 * Notes.js
 * Displays simple usage notes to the user
 */

// Imports

import { useState } from 'react'
import {nanoid} from "nanoid";
import patternData from "../data/patternList";
import { Container, Expand, Heading, Controls } from './atoms/SideBar'

/**
 * Patterns Component
 * @returns {JSX.Element}
 */

const Patterns = (props) => {

    const [display, setDisplay] = useState(false)
    const [selected, setSelect] = useState(0)

    return(
        <Container>
            <Heading onClick={() => setDisplay(!display)}>
                <h3>Patterns</h3>
                <Expand><span className="material-icons">
                    {display === true ? 'expand_less' : 'expand_more'}
                </span></Expand>
            </Heading>
            {display === true && <div>
                <Controls>
                    <select value={selected} onChange={(e) => setSelect(e.target.value)}>
                        {patternData.map((item, index) =>
                            <option key={nanoid} value={index}>{item.name}</option>
                        )}
                    </select>
                    <button onClick={() => props.setStepData(patternData[selected].data)}>Load</button>
                </Controls>
             </div>}
        </Container>
    );
}

export default Patterns