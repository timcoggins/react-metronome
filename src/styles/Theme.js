/**
 * Theme.js
 * Provides the theme for the app
 */
import React from "react";
import { ThemeProvider } from "styled-components";

// Styles
const theme = {
    colors: {
        powderWhite: "#FFFDF9",
        persianGreen: "#06B49A",
        lightBlue: "#AFDBD2",
        onyx: "#36313D",
        middleGreen: "#224422",
        darkGreen: "#113311",

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

const Theme = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
