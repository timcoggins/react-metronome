/**
 * Block.js
 * Component for rendering a single step block
 */

// Import

import styled from "styled-components";
import { css } from 'styled-components'

import quaver from '../assets/images/noun_quaver_1688935.png'
import semiquaver from '../assets/images/noun_Sixteenth Note_88567.png'
import crochet from '../assets/images/noun_quarter note_88568.png'
import minim from '../assets/images/noun_Half Note_88569.png'

// Styles

const StyledBlock = styled.div`
  width: 70px;
  height: 120px;
  border-radius: 4px;
  border: 1px solid rgba(209, 213, 219, 0.3);

  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.9;

  cursor: pointer;

  backdrop-filter: blur(25px) saturate(191%);
  -webkit-backdrop-filter: blur(25px) saturate(191%);
  background-color: rgba(255, 255, 255, 0.62);

  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  

  &:hover {
    background-color: rgb(97, 141, 92)
  }

  ${props => props.disabled && css`
    background: #6d736d;
    color: white;
  `}

  ${props => props.primary && css`
    background: #477147;
    color: white;
  `}

  ${props => props.active && css`
      background: cornflowerblue;
      color: white;
    `}
`

const Note = styled.img`
    height: 40px;
    width: 40px;
`

/**
 * Block Component
 * @param props
 * @returns {JSX.Element}
 */

const Block = (props) => {

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
        <StyledBlock
            primary={props.value.id === props.selectedStep.id}
            active={props.index === props.currentStep}
            onClick={() => props.editStep(props.value.id)}
            disabled={props.value.silent}
        >
             <h2>{props.value.length}</h2>
            <Note src={findNote(props.value.base)}/>
        </StyledBlock>
    )
}

export default Block