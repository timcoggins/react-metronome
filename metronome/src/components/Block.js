import styled from "styled-components";
import { css } from 'styled-components'

import quaver from './../noun_quaver_1688935.png'
import semiquaver from './../noun_Sixteenth Note_88567.png'
import crochet from './../noun_quarter note_88568.png'
import minim from './../noun_Half Note_88569.png'

// Styles

const StyledBlock = styled.div`
  width: 70px;

  display: grid;
  place-items: center;
  border-radius: 4px;

  background-color: white;
  border: 1px solid rgba(209, 213, 219, 0.3);

  ${props => props.active && css`
    border-width: 4px;
  `}
  &:hover {
    background-color: rgba(199, 199, 199, 0.75)
  }
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
        if(noteType === 2) return minim;
        if(noteType === 4) return crochet;
        if(noteType === 8) return quaver;
        if(noteType === 16) return semiquaver;
        return;
    }

    // JSX

    return(
        <>
            <StyledBlock onClick={() => props.editStep(props.value.id)}>
                <h2>{props.value.length}</h2>
                <Note src={findNote(props.value.base)}/>
            </StyledBlock>
        </>
    )
}

export default Block