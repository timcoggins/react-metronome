/**
 * EngineContext.js
 * Main top level component for the app
 */
import { createContext, useEffect, useState, useCallback } from "react";
import StepEngine from '../utils/StepEngine'
import patternList from "../assets/data/patternList";

// Export the context
const Engine = createContext()
export default Engine

/**
 * EngineProvider - Provides the engine context
 * @param children
 * @returns {JSX.Element}
 */
export const EngineProvider = ({ children }) => {

    // Declare variables?
    const [ currentStep, setCurrentStep ] = useState(0);
    //const currentStep = useRef(0)

    const test = useCallback((pos) => console.log(pos), [])
    //const test = useCallback((pos) => setCurrentStep(pos), [])

    // Create the metronome engine
    const engine = new StepEngine(patternList[0].data, test)

    // Not working
    useEffect(() => console.log(currentStep), [currentStep])

    // JSX
    return (
        <Engine.Provider value={{ engine, currentStep }}>
            { children }
        </Engine.Provider>
    )
}