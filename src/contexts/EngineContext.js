/**
 * EngineContext.js
 * Main top level component for the app
 */
import { createContext, useState } from "react";
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

    // TODO Get the page to rerender to update the active step
    // Using a useState causes strange side effects
    // Problem 1: play stop button used to stop working
    // Problem 2: changing any data in the stepData won't be heard until the player is started/stopped
    //
    // TODO See if the issue can be fixed by not making it a class, but into this component EnginerProvider
    // Maybe having a useEffect set a useState to follow the current step of the engine
    // I don't think this will work as a hook, but its an idea
    //
    // TODO Sounds arent updating anymore when playing, weirldly resets back to the default
    // Changing the data also isn't working when playing back


    const [ currentStep, setCurrentStep ] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false)

    //const currentStep = useRef(0)
    //const test = useCallback((pos) => console.log(pos), [])
    //const test = useCallback((pos) => setCurrentStep(pos), [])
    //const test = (pos) => setCurrentStep(pos)

    // Create the metronome engines
    const engine = new StepEngine(patternList[0].data)

    // JSX
    return (
        <Engine.Provider value={{ engine, currentStep, isPlaying, setIsPlaying }}>
            { children }
        </Engine.Provider>
    )
}