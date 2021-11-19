/**
 * Notes.js
 * Displays simple usage notes to the user
 */

// Imports
import SideBarItem from "../molecules/SideBarItem";
import P from "../atoms/P"
import SideBarControls from "../atoms/SideBarControls";
import Button from "../atoms/Button";
import { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext";

/**
 * Notes Component
 * @returns {JSX.Element}
 */
const Options = () => {
    const { darkMode, setDarkMode } = useContext(ThemeContext);
    return(
        <SideBarItem title={'Options'}>
            <SideBarControls>
                <P>Theme:</P><Button onClick={() => setDarkMode(!darkMode)}>Switch</Button>

            </SideBarControls>
        </SideBarItem>
    );
}

export default Options