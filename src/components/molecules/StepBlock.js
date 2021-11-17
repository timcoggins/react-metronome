/**
 * StepBlock.js
 * Component for rendering a single step block
 */

// Import
import { useState, useEffect } from 'react'
import Note from "../atoms/Note";
import Block from "../atoms/Block";
import BlockButton from "../atoms/BlockButton"
import Heading2 from "../atoms/H2";

import { useContext } from "react";
import StepContext from "../../contexts/StepContext";

import quaver from '../../assets/images/noun_quaver_1688935.png'
import semiquaver from '../../assets/images/noun_Sixteenth Note_88567.png'
import crochet from '../../assets/images/noun_quarter note_88568.png'
import minim from '../../assets/images/noun_Half Note_88569.png'

/**
 * StepBlock Component
 * @param props
 * @returns {JSX.Element}
 */

const StepBlock = (props) => {

    const { stepData, setStepData } = useContext(StepContext)
    const [active, setActive] = useState(0)

    const changeRepetitions = () => {
        setStepData(stepData.map(item => {
            if (item.id === props.value.id) {
                if (item.length < 8) {
                    item.length += 1;
                } else {
                    item.length = 1;
                }
            }
            return item
        }))
    }

    const changeSilence = () => {
        setStepData(stepData.map(item => {
            if (item.id === props.value.id) {
                item.silent = !item.silent
            }
            return item
        }))
    }

    const deleteStep = () => {
        setStepData(stepData.filter(item => {
            if (item.id === props.value.id) {
                return false
            }
            return true
        }))
    }


    const changeDuration = () => {
        setStepData(stepData.map(item => {
            if (item.id === props.value.id) {
                if(item.base === 1) item.base = 2;
                else if(item.base === 2) item.base = 4;
                else if(item.base === 4) item.base = 8;
                else if(item.base === 8) item.base = 1;
            }
            return item
        }))
    }

    /**
     * Converts the numeric base number to the image location
     * @param noteType
     * @returns {*}
     */
    const findNote = (noteType) => {
        if(noteType === 8) return minim;
        if(noteType === 4) return crochet;
        if(noteType === 2) return quaver;
        if(noteType === 1) return semiquaver;
    }

    useEffect(() => setActive(props.activeStep), [props.activeStep])

    // JSX

    return(
        <Block
            //primary={props.value.id === props.selectedStep.id}
            //active={props.index === active}
            //onClick={() => props.editStep(props.value.id)}
            disabled={props.value.silent}
        >
             <BlockButton onClick={changeRepetitions}><Heading2>{props.value.length}</Heading2></BlockButton>
            <BlockButton onClick={changeDuration}><Note src={findNote(props.value.base)} /></BlockButton>
            <BlockButton onClick={changeSilence}>{ props.value.silent ? '🔇' : '🔉'}</BlockButton>
            <BlockButton onClick={deleteStep}>❌</BlockButton>
        </Block>
    )
}

export default StepBlock