/**
 * Theme.js
 * Provides the theme for the app
 */
import { ThemeProvider } from "styled-components";
import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

// TODO Theme Colours


// Styles
const lightTheme = {
    colors: {
        headingColor: "#ffffff",
        paragraphColor: "#313131",

        // Backgrounds
        contentText: "#FFFFFF",
        contentBackground: "#414C50",
        navbarBackground: "#39ABE7",

        expandArrow: "#FFFFFF",
        expandBackground: "#2D383C",

        buttonText: "#ffffff",
        buttonBackground: "#2D383C",

        buttonTextDisabled: "#414C50",
        buttonBackgroundDisabled: "#192428",

        selectText: "#ffffff",
        selectBackground: "#2D383C",

        activeNoteBackground: "#949494",

        // Block

        blockBackground: "#0683B5",
        blockText: "#ffffff",
        blockBackgroundHover: "#39ABE7",
        blockTextHover: "#ffffff",
        blockBackgroundDisabled: "#2D383C",
        blockTextDisabled: "#ffffff",
        blockBackgroundPrimary: "#0683B5",
        blockTextPrimary: "#ffffff",
        blockBackgroundActive: "#85d2ad",
        blockTextActive: "#ffffff",

        borderColor: "#192428"
    }
    // fonts: ["sans-serif", "Poppins"],
    // fontSizes: {
    //     small: "1em",
    //     medium: "2em",
    //     large: "3em"
    // }
};

const darkTheme = {
    colors: {

        headingColor: "#ffffff",
        paragraphColor: "#313131",

        // Backgrounds
        contentText: "#FFFFFF",
        contentBackground: "#343434",
        navbarBackground: "#0e3a27",

        expandArrow: "#FFFFFF",
        expandBackground: "#5b5b5b",

        buttonText: "#ffffff",
        buttonBackground: "#595959",

        selectText: "#ffffff",
        selectBackground: "#313131",

        activeNoteBackground: "#949494",

        // Block

        blockBackground: "#20503a",
        blockText: "#ffffff",
        blockBackgroundHover: "#2b6c4f",
        blockTextHover: "#ffffff",
        blockBackgroundDisabled: "#3f3f3f",
        blockTextDisabled: "#ffffff",
        blockBackgroundPrimary: "#20503a",
        blockTextPrimary: "#ffffff",
        blockBackgroundActive: "#85d2ad",
        blockTextActive: "#ffffff",

        borderColor: "#181818"
    }
    // fonts: ["sans-serif", "Poppins"],
    // fontSizes: {
    //     small: "1em",
    //     medium: "2em",
    //     large: "3em"
    // }
};

const Theme = ({ children }) => {
    const { darkMode } = useContext(ThemeContext);
    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>{children}</ThemeProvider>
    );
}


export default Theme;
 