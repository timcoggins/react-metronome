/**
 * NoteValue.js
 * Displays the notes in the step editor
 */

import styled, {css} from "styled-components";

// Styles
const NoteValue =  styled.img`
    height: 40px;
    width: 40px;
    cursor: pointer;
    padding: 5px;

    ${props => props.active && css`
      background: ${props => props.theme.colors.activeNoteBackground};
    `}
`;

export default NoteValue