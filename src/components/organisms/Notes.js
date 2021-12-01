// LEGACY
/**
 * Notes.js
 * Displays simple usage notes to the user
 */

// Imports
import SideBarItem from "../molecules/SideBarItem";
import P from "../atoms/P"

/**
 * Notes Component
 * @returns {JSX.Element}
 */
const Notes = () => {
    return(
        <SideBarItem title={'Notes'}>
            <P>Made by <a href='https://github.com/timcoggins'>Tim Coggins</a></P>
        </SideBarItem>
    );
}

export default Notes