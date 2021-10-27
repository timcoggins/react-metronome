import styled from "styled-components";
import { css } from 'styled-components'

//import { useEffect } from 'react'

import quaver from './../noun_quaver_1688935.png'
import semiquaver from './../noun_Sixteenth Note_88567.png'
import crochet from './../noun_quarter note_88568.png'
import minim from './../noun_Half Note_88569.png'

// Styles

const StyledBlock = styled.div`
  width: 70px;

  /*display: grid;
  place-items: center;*/
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  height: 120px;
  cursor: pointer;

  backdrop-filter: blur(25px) saturate(191%);
  -webkit-backdrop-filter: blur(25px) saturate(191%);
  background-color: rgba(255, 255, 255, 0.62);
  
  /*background-color: white;*/
  border: 1px solid rgba(209, 213, 219, 0.3);

  &:hover {
    background-color: rgba(199, 199, 199, 0.75)
  }
    
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
  width: 40px
`



// Component

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
        return;
    }

    // TODO HMM
    //useEffect(() => console.log(props.currentStep), [props.currentStep])
    //useEffect(() => console.log(props.selectedStep.id), [props.selectedStep])
    // JSX

    return(
        <>
            <StyledBlock primary={props.value.id === props.selectedStep.id} active={props.index === props.currentStep} onClick={() => props.editStep(props.value.id)}>
                <h2>{props.value.length}</h2>
                <Note src={findNote(props.value.base)}/>
            </StyledBlock>
        </>
    )
}

export default Block