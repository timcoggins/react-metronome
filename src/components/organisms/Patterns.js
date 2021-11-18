/**
 * Notes.js
 * Displays simple usage notes to the user
 */

// Imports
import * as Tone from "tone";
import axios from "axios";
import { useState, useEffect } from 'react'
import { nanoid } from "nanoid";
import { useQuery, useMutation } from "react-query";
import SideBarItem from "../molecules/SideBarItem";
import SideBarControls from "../atoms/SideBarControls";
import Select from "../atoms/Select";
import Button from "../atoms/Button"
import P from '../atoms/P'
import Input from '../atoms/Input'

import { useContext } from "react";
import StepContext from "../../contexts/StepContext";

const base = 'https://metronomic-backend.herokuapp.com'

function shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (object1[key] !== object2[key]) {
            return false;
        }
    }
    return true;
}

/**
 * Patterns Component
 * @returns {JSX.Element}
 */
const Patterns = (props) => {

    const { stepData, setStepData } = useContext(StepContext)
    const [ patternId, setPatternId ] = useState(0)
    const [hasChanged, setHasChanged ] = useState(false)

    // State variables
    const [patternList, setPatternList] = useState([])
    const [selected, setSelect] = useState(0)
    const [ patternName, setPatternName ] = useState('Pattern Name')






    /**
     * Query to get all of the patterns from the api
     */
    const { isLoading, refetch } = useQuery('getAllPatterns', () => axios.get(`${base}/patterns`), {
        onSuccess: (res) => setPatternList(res.data)
    })

    useEffect(()=> {
        if(patternList[selected]) {
            setHasChanged(!shallowEqual(stepData, patternList[selected].data))
        }
    }, [stepData])


    /**
     * Query to update a pattern
     * @type
     */
    const updatePattern = useMutation(newTodo => {
        return axios.put(`${base}/patterns/${patternId}`, newTodo)
    }, { onSuccess: () => refetch() })

    /**
     * Query to save a pattern
     * @type
     */
    const postPattern = useMutation(newTodo => {
        return axios.post(`${base}/patterns`, newTodo)
    }, { onSuccess: () => refetch() })

    /**
     * Save as Handler for the Save button
     */
    const saveAsHandler = () => {postPattern.mutate({
        name: patternName,
        author: 'Tim',
        sound_primary: props.engine.soundPrimary,
        sound_secondary: props.engine.soundSecondary,
        sound_reset: props.engine.soundReset,
        tempo: Tone.Transport.bpm.value,
        mute_primary: props.engine.osc.mute,
        mute_secondary: props.engine.osc2.mute,
        mute_reset: props.engine.osc3.mute,
        data: stepData
    })}

    /**
     * Save Handler for the Save button
     */
    const updateHandler = () => {

        updatePattern.mutate({
                name: patternName,
                author: 'Tim',
                sound_primary: props.engine.soundPrimary,
                sound_secondary: props.engine.soundSecondary,
                sound_reset: props.engine.soundReset,
                tempo: parseInt(Tone.Transport.bpm.value),
                mute_primary: props.engine.osc.mute,
                mute_secondary: props.engine.osc2.mute,
                mute_reset: props.engine.osc3.mute,
                data: stepData
        })
    }

    /**
     * Manages the state of the pattern name
     * @param e
     */
    const handleNameChange = (e) => {setPatternName(e.target.value)}

    /**
     * Handle Loading a pattern
     */
    const loadHandler = () => {

        const pattern = patternList[selected]

        console.log(pattern)

        if(pattern.name === null) return
        if(pattern.sound_primary === null) return
        if(pattern.sound_secondary === null) return
        if(pattern.sound_reset === null) return
        if(pattern.tempo === null) return
        if(pattern.mute_primary === null) return
        if(pattern.mute_secondary === null) return
        if(pattern.mute_reset === null) return
        //if(pattern.data) return

        setPatternId(pattern.id)
        setPatternName(pattern.name)
        props.engine.updateSounds(pattern.sound_primary, pattern.sound_secondary, pattern.sound_reset)
        Tone.Transport.bpm.value = pattern.tempo
        props.engine.osc.mute = pattern.mute_primary
        props.engine.osc2.mute = pattern.mute_secondary
        props.engine.osc3.mute = pattern.mute_reset
        setStepData(pattern.data);
    }


    // JSX
    return(
        <SideBarItem title={'Patterns'}>
            <SideBarControls>
                <Select value={selected} onChange={(e) => setSelect(e.target.value)}>
                    {patternList.length !== 0 && patternList.map((item, index) =>
                        <option key={() => nanoid()} value={index}>{item.name}</option>
                    )}
                </Select>
                <Button onClick={loadHandler}>Load</Button>
            </SideBarControls>
            <P>{patternName} {hasChanged ? '(edited)' : null}</P>
            <SideBarControls>
                <P>Name:</P> <Input type={'text'} placeholder={'Name'} value={patternName} onChange={handleNameChange}/>
            </SideBarControls>
            {hasChanged && <SideBarControls>
                <Button onClick={updateHandler}>Update</Button>
                <Button onClick={saveAsHandler}>Save As</Button>
            </SideBarControls>}
            {postPattern.isError && <P>An error occurred: {postPattern.error.message}</P>}
            {postPattern.isSuccess && <P>Pattern added!</P>}
            {updatePattern.isError && <P>An error occurred: {updatePattern.error.message}</P>}
            {updatePattern.isSuccess && <P>Pattern Updated!</P>}
         </SideBarItem>
    );
}

export default Patterns