/**
 * Options.js
 * Displays user options, switch dark mode at the moment
 */

// Imports
import { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext";

import SideBarItem from "../molecules/SideBarItem";
import P from "../atoms/P"
import SideBarControls from "../atoms/SideBarControls";
import Button from "../atoms/Button";

/**
 * Options Component
 * @returns {JSX.Element}
 */
const Options = () => {
    const { darkMode, setDarkMode } = useContext(ThemeContext);
    return(
        <SideBarItem title={'Options'}>
            <SideBarControls>
                <P>Theme:</P><Button onClick={() => setDarkMode(!darkMode)}>Switch</Button>
            </SideBarControls>
            <SideBarControls>
                <P>Made by <a href='https://github.com/timcoggins'>Tim Coggins</a></P>
            </SideBarControls>
        </SideBarItem>
    );
}

export default Options