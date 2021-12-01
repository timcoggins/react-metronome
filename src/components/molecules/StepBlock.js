/**
 * StepBlock.js
 * Component for rendering a single step block
 */

// Import
import { useContext } from "react";
import StepContext from "../../contexts/StepContext";
import EngineContext from "../../contexts/EngineContext";

import Note from "../atoms/Note";
import Block from "../atoms/Block";
import BlockButton from "../atoms/BlockButton"
import Heading1 from "../atoms/H1";

import quaver from '../../assets/images/quaver.png'
import semiquaver from '../../assets/images/semiquaver.png'
import crochet from '../../assets/images/crotchet.png'
import minim from '../../assets/images/minim.png'

/**
 * StepBlock Component
 * @param props
 * @returns {JSX.Element}
 */
const StepBlock = (props) => {

    const { stepData, setStepData } = useContext(StepContext)
    const { currentStep } = useContext(EngineContext)

    /**
     * Changes the number of repetitions
     */
    const changeRepetitions = () => {
        setStepData(stepData.map(item => {
            if (item.id === props.value.id) {
                if (item.length < 8) item.length += 1;
                else item.length = 1;
            }
            return item
        }))
    }

    /**
     * Toggles the silence parameter for a step
     */
    const changeSilence = () => {
        setStepData(stepData.map(item => {
            if (item.id === props.value.id) item.silent = !item.silent
            return item
        }))
    }

    /**
     * Deletes a Step
     */
    const deleteStep = () => setStepData(stepData.filter(item => item.id !== props.value.id))

    /**
     * Changes a duration value to the next division
     */
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

    // JSX
    return(
        <Block
            //active={props.index === currentStep}
            disabled={props.value.silent}
        >
            <BlockButton onClick={changeRepetitions}><Heading1>{props.value.length} x</Heading1></BlockButton>
            <BlockButton onClick={changeDuration}><Note src={findNote(props.value.base)} /></BlockButton>
            <BlockButton onClick={changeSilence}>{ props.value.silent ? '🔇' : '🔉'}</BlockButton>
            <BlockButton onClick={deleteStep}>❌</BlockButton>
        </Block>
    )
}

export default StepBlock