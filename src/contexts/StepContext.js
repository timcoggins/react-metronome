import { createContext, useState } from "react";

const StepContext = createContext({

})

export default StepContext

export const StepContextProvider = ({ children }) => {
    const [ activeStep, setActiveStep ] = useState(0);

    return (
        <StepContext.Provider value={{ activeStep, setActiveStep }}>
            { children }
        </StepContext.Provider>
    )

}