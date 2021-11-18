/**
 * MainWindow.js
 * Styled Component for main window container
 */
import styled from 'styled-components'

// Styles
const MainWindow = styled.div`
    display: flex;
    margin: 0 auto;
    
    // Put the sidebar down the bottom on mobile devices
    @media only screen and (max-width: 360px) {
        flex-direction: column-reverse;
    }
`

export default MainWindow;