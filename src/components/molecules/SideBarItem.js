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

    // State which handles if the side bar item is open or closed
    const [isOpen, setIsOpen] = useState(false)

    return(
        <SideBarContainer>
            <SideBarHeading onClick={() => setIsOpen(!isOpen)}>
                <Heading3>{props.title}</Heading3>
                <Expand><span className="material-icons">
                    {isOpen === true ? 'expand_less' : 'expand_more'}
                </span></Expand>
            </SideBarHeading>
            {isOpen === true && <div>{props.children}</div>}
        </SideBarContainer>
    );
}

export default SideBarItem