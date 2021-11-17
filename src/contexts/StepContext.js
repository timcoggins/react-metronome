import { createContext, useState } from "react";
import patternList from "../assets/data/patternList";

const initialData = patternList[0].data // Load the initial pattern

const StepContext = createContext()

export default StepContext

export const StepContextProvider = ({ children }) => {
    const [ stepData, setStepData ] = useState(initialData);

    return (
        <StepContext.Provider value={{ stepData, setStepData }}>
            { children }
        </StepContext.Provider>
    )

}