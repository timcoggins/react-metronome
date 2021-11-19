/**
 * Notes.js
 * Displays simple usage notes to the user
 */

// Imports
import * as Tone from "tone";
import axios from "axios";
import { useState, useEffect, useContext } from 'react'
import { nanoid } from "nanoid";
import { useQuery, useMutation } from "react-query";

import StepContext from "../../contexts/StepContext";
import UserContext from "../../contexts/UserContext";
import EngineContext from "../../contexts/EngineContext";

import shallowEqual from "../../utils/shallowEqual";

import SideBarItem from "../molecules/SideBarItem";
import SideBarControls from "../atoms/SideBarControls";
import Select from "../atoms/Select";
import Button from "../atoms/Button"
import P from '../atoms/P'
import Input from '../atoms/Input'

const base = 'https://metronomic-backend.herokuapp.com'

/**
 * Patterns Component
 * @returns {JSX.Element}
 */
const Patterns = () => {

    // Consume the contexts
    const { engine } = useContext(EngineContext)
    const { userData } = useContext(UserContext)
    const { stepData, setStepData } = useContext(StepContext)

    // State variables
    const [ patternId, setPatternId ] = useState(0)
    const [ hasChanged, setHasChanged ] = useState(false)

    const [ patternList, setPatternList ] = useState([])
    const [ selected, setSelect ] = useState(0)
    const [ patternName, setPatternName ] = useState('Pattern Name')



    /**
     * Query to get all of the patterns from the api
     */
    const { refetch } = useQuery('getAllPatterns', () => axios.get(`${base}/patterns`,
    //     {
    //     headers: {
    //         Authorization:
    //             `Bearer ${userData.jwt}`,
    //     }
    // }
    ), {
        onSuccess: (res) => setPatternList(res.data)
    })

    // Check if the the user has modified the pattern
    useEffect(()=> {
        if(patternList[selected]) setHasChanged(!shallowEqual(stepData, patternList[selected].data))
    }, [stepData])

    /**
     * Query to update a pattern
     * @type
     */
    const updatePattern = useMutation(newTodo => {
        return axios.put(`${base}/patterns/${patternId}`, newTodo, {
            headers: {
                Authorization:
                    `Bearer ${userData.jwt}`,
            }
        })
    }, { onSuccess: () => refetch() })

    /**
     * Query to update a pattern
     * @type
     */
    const deletePattern = useMutation(newTodo => {
        return axios.delete(`${base}/patterns/${patternId}`, {
            headers: {
                Authorization:
                    `Bearer ${userData.jwt}`,
            }
        })
    }, { onSuccess: () => refetch() })

    /**
     * Query to save a pattern
     * @type
     */
    const postPattern = useMutation(newTodo => {
        return axios.post(`${base}/patterns`, newTodo, {
            headers: {
                Authorization:
                    `Bearer ${userData.jwt}`,
            }
        })
    }, { onSuccess: () => refetch() })

    /**
     * Save as Handler for the Save button
     */
    const saveAsHandler = () => {
        postPattern.mutate({
            name: patternName,
            author: userData.name,
            sound_primary: engine.soundPrimary,
            sound_secondary: engine.soundSecondary,
            sound_reset: engine.soundReset,
            tempo: Tone.Transport.bpm.value,
            mute_primary: engine.osc.mute,
            mute_secondary: engine.osc2.mute,
            mute_reset: engine.osc3.mute,
            data: stepData
        })
    }

    /**
     * Save Handler for the Save button
     */
    const updateHandler = () => {

        updatePattern.mutate({
                name: patternName,
                author: 'Tim',
                sound_primary: engine.soundPrimary,
                sound_secondary: engine.soundSecondary,
                sound_reset: engine.soundReset,
                tempo: parseInt(Tone.Transport.bpm.value),
                mute_primary: engine.osc.mute,
                mute_secondary: engine.osc2.mute,
                mute_reset: engine.osc3.mute,
                data: stepData
        })
    }

    /**
     * Delete Handler for the Save button
     */
    const deleteHandler = () => {
        deletePattern.mutate({
            id: patternId
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

        if(pattern.name === null) return
        if(pattern.sound_primary === null) return
        if(pattern.sound_secondary === null) return
        if(pattern.sound_reset === null) return
        if(pattern.tempo === null) return
        if(pattern.mute_primary === null) return
        if(pattern.mute_secondary === null) return
        if(pattern.mute_reset === null) return

        setPatternId(pattern.id)
        setPatternName(pattern.name)
        engine.updateSounds(pattern.sound_primary, pattern.sound_secondary, pattern.sound_reset)
        Tone.Transport.bpm.value = pattern.tempo
        engine.osc.mute = pattern.mute_primary
        engine.osc2.mute = pattern.mute_secondary
        engine.osc3.mute = pattern.mute_reset
        setStepData(pattern.data);
    }


    // JSX
    return(
        <SideBarItem title={'Patterns'}>
            <SideBarControls>
                <Select value={selected} onChange={(e) => setSelect(e.target.value)}>
                    {patternList.length !== 0 && patternList.map((item, index) =>
                        <option key={nanoid()} value={index}>{item.name}</option>
                    )}
                </Select>
                <Button onClick={loadHandler}>Load</Button>
            </SideBarControls>

            {/* Show if the user is logged in */}
            {userData.jwt && <div>
                <P>{patternName} {hasChanged ? '(edited)' : null}</P>
                <SideBarControls>
                    <P>Name:</P> <Input type={'text'} placeholder={'Name'} value={patternName} onChange={handleNameChange}/>
                </SideBarControls>
                <SideBarControls>
                    <Button onClick={updateHandler}>Update</Button>
                    <Button onClick={saveAsHandler}>Save As</Button>
                    <Button onClick={deleteHandler}>Delete</Button>
                </SideBarControls>
            </div>}

            {postPattern.isError && <P>An error occurred: {postPattern.error.message}</P>}
            {postPattern.isSuccess && <P>Pattern added!</P>}
            {updatePattern.isError && <P>An error occurred: {updatePattern.error.message}</P>}
            {updatePattern.isSuccess && <P>Pattern Updated!</P>}
            {deletePattern.isError && <P>An error occurred: {deletePattern.error.message}</P>}
            {deletePattern.isSuccess && <P>Pattern Deleted!</P>}
         </SideBarItem>
    );
}

export default Patterns