/**
 * Notes.js
 * Displays simple usage notes to the user
 */

// Imports

import styled from 'styled-components'
import { useState } from 'react'

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
`

/**
 * Notes Component
 * @returns {JSX.Element}
 */

const Notes = () => {

    const [display, setDisplay] = useState(false)

    return(
        <Container>
            <Heading>
                <h3>Notes</h3>
                <Expand onClick={() => setDisplay(!display)}><span className="material-icons">
                    {display === true ? 'expand_less' : 'expand_more'}
                </span></Expand>
            </Heading>
            {display === true && <div>
                <p>Edits made will not be audible until the sequence has been stopped and started again</p>
                <p>Same goes for changing the sounds or muting</p>
                <p>Made by <a href='https://github.com/timcoggins'>Tim Coggins</a></p>
            </div>}
        </Container>
    );
}

export default Notes