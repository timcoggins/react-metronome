/**
 * User.js
 * Sidebar for user stuff like login
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
        <SideBarItem title={'User'}>
            <P>Login</P>
            <P>Sign Up</P>
        </SideBarItem>
    );
}

export default Notes