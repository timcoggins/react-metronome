/**
 * SideBar.js
 * Styled Component for placing the sidebar in the main window
 */
import styled from "styled-components";

// Styles
const SideBar = styled.div`
    //margin: 10px;
    width: 300px;
    @media only screen and (max-width: 360px) {
        margin: 10px 0 0 0;
        width: 100%;
    }
`

export default SideBar;