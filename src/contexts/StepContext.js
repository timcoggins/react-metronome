/**
 * StepContext.js
 * Provides the context for holder the step data
 */
import { createContext, useState } from "react";
import patternList from "../assets/data/patternList";

const initialData = patternList[0].data // Load the initial pattern

// Create the context
const StepContext = createContext()
export default StepContext

/**
 * Provides the Step Context
 * @param children
 * @returns {JSX.Element}
 */
export const StepContextProvider = ({ children }) => {

    // State variables
    const [ stepData, setStepData ] = useState(initialData);

    // JSX
    return (
        <StepContext.Provider value={{ stepData, setStepData }}>
            { children }
        </StepContext.Provider>
    )
}