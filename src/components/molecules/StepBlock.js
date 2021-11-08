/**
 * StepBlock.js
 * Component for rendering a single step block
 */

// Import

import Heading2 from "../atoms/H2";
import Note from "../atoms/Note";
import Block from "../atoms/Block";

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
            primary={props.value.id === props.selectedStep.id}
            active={props.index === props.currentStep}
            onClick={() => props.editStep(props.value.id)}
            disabled={props.value.silent}
        >
             <Heading2>{props.value.length}</Heading2>
            <Note src={findNote(props.value.base)}/>
        </Block>
    )
}

export default StepBlock