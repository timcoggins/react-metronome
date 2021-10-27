/**
 * Notes.js
 * Displays simple usage notes to the user
 */

// Imports

import styled from 'styled-components'
import { useState } from 'react'
import {nanoid} from "nanoid";
import patternData from "../patternList";

// Styles

const Container = styled.div`
    width: 250px;
    border-bottom: #886F68 1px solid;
    border-right: #886F68 1px solid;
    background: white;  
    padding: 10px;
    margin: 0;
    text-align: left;
    p {
      word-wrap: break-word;
    }
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

const Controls = styled.div`
    display: flex;
    align-items: center;
    place-content: space-between;
  padding-bottom: 20px;
    select {
      border-radius: 5px;
      padding: 2px;
      width: 160px;
    }
`



/**
 * Notes Component
 * @returns {JSX.Element}
 */

const Patterns = (props) => {

    const [display, setDisplay] = useState(false)
    const [selected, setSelect] = useState(0)

    return(
        <Container>
            <Heading>
                <h3>Patterns</h3>
                <Expand onClick={() => setDisplay(!display)}><span className="material-icons">
                    {display === true ? 'expand_less' : 'expand_more'}
                </span></Expand>
            </Heading>
            {display === true && <div>
                <Controls>
                    <select value={selected} onChange={(e) => setSelect(e.target.value)}>
                        {patternData.map((item, index) =>
                            <option value={index}>{item.name}</option>
                        )}
                    </select>
                    <button onClick={() => props.setStepData(patternData[selected].data)}>Load</button>
                </Controls>
             </div>}
        </Container>
    );
}

export default Patterns