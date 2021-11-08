/**
 * SideBarControls.js
 * Styled Component for placing controls in the sidebar
 */
import styled from 'styled-components'

// Styles
const SideBarControls = styled.div`
    display: flex;
    align-items: center;
    place-content: space-between;
    padding-bottom: 20px;
  
    select {
        border-radius: 5px;
        padding: 2px;
        width: 160px;
    }
    input[type="number"] {
        width: 60px;
        cursor: pointer;
    }
    button {
        margin: 10px 3px;
        cursor: pointer;
    }
`

export default SideBarControls;