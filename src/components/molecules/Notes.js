/**
 * Notes.js
 * Displays simple usage notes to the user
 */

// Imports

import styled from 'styled-components'
import { useState } from 'react'
import { Container, Heading, Expand } from '../atoms/SideBar'

// Styles

const BottomContainer = styled(Container)`
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
`;

/**
 * Notes Component
 * @returns {JSX.Element}
 */

const Notes = () => {

    const [display, setDisplay] = useState(false)

    return(
        <BottomContainer>
            <Heading onClick={() => setDisplay(!display)}>
                <h3>About</h3>
                <Expand><span className="material-icons">
                    {display === true ? 'expand_less' : 'expand_more'}
                </span></Expand>
            </Heading>
            {display === true && <div>
                <p>Edits made will not be audible until the sequence has been stopped and started again</p>
                <p>Same goes for changing the sounds or muting</p>
                <p>Made by <a href='https://github.com/timcoggins'>Tim Coggins</a></p>
            </div>}
        </BottomContainer>
    );
}

export default Notes