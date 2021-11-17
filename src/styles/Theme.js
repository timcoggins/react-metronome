/**
 * Theme.js
 * Provides the theme for the app
 */
import React from "react";
import { ThemeProvider } from "styled-components";

// Styles
const lightTheme = {
    colors: {


        headingColor: "#000000",
        paragraphColor: "#313131",

        // Backgrounds
        contentBackground: "#FFFFFF",
        expandBackground: "#dcdcdc",
        buttonColor: "#313131",
        buttonBackground: "#dcdcdc",
        borderColor: "#886F68"

    },
    fonts: ["sans-serif", "Poppins"],
    fontSizes: {
        small: "1em",
        medium: "2em",
        large: "3em"
    }
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
        selectBackground: "#595959",

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

    },
    fonts: ["sans-serif", "Poppins"],
    fontSizes: {
        small: "1em",
        medium: "2em",
        large: "3em"
    }
};

const Theme = ({ children }) => (
    <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
);

export default Theme;
 