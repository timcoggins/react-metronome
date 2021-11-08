/**
 * NoteValue.js
 * Displays the notes in the step editor
 */

import styled, {css} from "styled-components";

// Styles
const NoteValue =  styled.img`
    height: 30px;
    width: 30px;
    cursor: pointer;
    padding: 5px;

    ${props => props.active && css`
      background: #efefef;
    `}
`;

export default NoteValue