/**
 * Notes.js
 * Displays simple usage notes to the user
 */

// Imports
import axios from "axios";
import { useState, useEffect } from 'react'
import {nanoid} from "nanoid";
import SideBarItem from "../molecules/SideBarItem";
import SideBarControls from "../atoms/SideBarControls";
import Select from "../atoms/Select";
import Button from "../atoms/Button"

/**
 * Patterns Component
 * @returns {JSX.Element}
 */
const Patterns = (props) => {

    // State variables
    const [patternList, setPatternList] = useState([])
    const [selected, setSelect] = useState(0)

    /**
     * Axios request to get the patterns
     */
    const getPatternList = () => {
        // Make a request for a user with a given ID
        axios.get('https://metronomic-backend.herokuapp.com/patterns')
            .then(response => setPatternList([...response.data]))
            .catch(error => console.log(error));
    }

    useEffect(() => getPatternList(), [])

    /**
     * Axios post to save a pattern
     */
    //const saveHandler = () => {

        //const name = prompt('Name of the pattern')
        //const author = prompt('Author')

        /*axios.post('http://localhost/patterns', {
            name: name,
            author: author,
            data: props.stepData
        })
            .then(response => console.log(response))
            .catch(error => console.log(error));
        getPatternList();*/
    //}

    // JSX

    return(
        <SideBarItem title={'Patterns'}>
            <SideBarControls>
                <Select value={selected} onChange={(e) => setSelect(e.target.value)}>
                    {patternList.length !== 0 && patternList.map((item, index) =>
                        <option key={nanoid} value={index}>{item.name}</option>
                    )}
                </Select>
                <Button onClick={() => props.updateStepData(patternList[selected].data)}>Load</Button>
                {/*<button onClick={saveHandler}>Save</button>*/}
            </SideBarControls>
         </SideBarItem>
    );
}

export default Patterns