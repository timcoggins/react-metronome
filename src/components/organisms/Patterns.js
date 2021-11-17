/**
 * Notes.js
 * Displays simple usage notes to the user
 */

// Imports
import axios from "axios";
import { useState, useEffect } from 'react'
import { nanoid } from "nanoid";
import { useQuery, useMutation } from "react-query";
import SideBarItem from "../molecules/SideBarItem";
import SideBarControls from "../atoms/SideBarControls";
import Select from "../atoms/Select";
import Button from "../atoms/Button"
import P from "../atoms/P"

import { useContext } from "react";
import StepContext from "../../contexts/StepContext";

const base = 'https://metronomic-backend.herokuapp.com'

/**
 * Patterns Component
 * @returns {JSX.Element}
 */
const Patterns = (props) => {

    const { stepData, setStepData } = useContext(StepContext)

    // State variables
    const [patternList, setPatternList] = useState([])
    const [selected, setSelect] = useState(0)
    const [ patternName, setPatternName ] = useState('Pattern Name')


    const { isLoading, refetch } = useQuery('getAllPatterns', () => axios.get(`${base}/patterns`), {
        onSuccess: (res) => setPatternList(res.data)
    })

    const postPattern = useMutation(newTodo => {
        return axios.post(`${base}/patterns`, newTodo)
    }, { onSuccess: () => refetch() })


    const saveHandler = () => {postPattern.mutate({ name: patternName, author: 'Tim', data: stepData })}

    const handleNameChange = (e) => {setPatternName(e.target.value)}

    // JSX

    return(
        <SideBarItem title={'Patterns'}>
            <SideBarControls>
                <Select value={selected} onChange={(e) => setSelect(e.target.value)}>
                    {patternList.length !== 0 && patternList.map((item, index) =>
                        <option key={nanoid} value={index}>{item.name}</option>
                    )}
                </Select>
                <Button onClick={() => setStepData(patternList[selected].data)}>Load</Button>
            </SideBarControls>
            <SideBarControls>
            <input type={'text'} placeholder={'Name'} value={patternName} onChange={handleNameChange}/>
              <Button onClick={saveHandler}>Save</Button>
            </SideBarControls>
         </SideBarItem>
    );
}

export default Patterns