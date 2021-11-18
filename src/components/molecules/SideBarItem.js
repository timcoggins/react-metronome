/**
 * Notes.js
 * Displays simple usage notes to the user
 */

// Imports

import { useState } from 'react'
import Heading3 from '../atoms/H3'
import SideBarContainer from "../atoms/SideBarContainer";
import SideBarHeading from "../atoms/SideBarHeading";
import Expand from '../atoms/Expand'

/**
 * SideBarItem Component
 * @returns {JSX.Element}
 */

const SideBarItem = (props) => {

    const [display, setDisplay] = useState(false)

    return(
        <SideBarContainer>
            <SideBarHeading onClick={() => setDisplay(!display)}>
                <Heading3>{props.title}</Heading3>
                <Expand><span className="material-icons">
                    {display === true ? 'expand_less' : 'expand_more'}
                </span></Expand>
            </SideBarHeading>
            {display === true && <div>{props.children}</div>}
        </SideBarContainer>
    );
}

export default SideBarItem