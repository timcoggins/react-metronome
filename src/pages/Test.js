/**
 * Metronome Component
 * @returns {JSX.Element}
 * @constructor
 */

import StepEngine from "../utils/StepEngine";
import patternList from "../assets/data/patternList";

const Test = () => {

    const engine = new StepEngine(patternList[0].data)

    const buttonThing = () =>{
        engine.step()
    }

return(

    <button onClick={buttonThing}>Hello</button>

)

}
export default Test