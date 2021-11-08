/**
 * NavBarContainer.js
 * Styled Component for the NavBar Container
 */
import styled from 'styled-components'

// Styles
const NavBarContainer = styled.div`
    background: white;
    margin: 0;
    display: flex;
    place-content: space-between;
    align-items: center;
    border-bottom: #886F68 1px solid;
  
    // Styles for the application title
    h1 {
        margin-left: 5px;
        padding: 0;
        font-size: 22px;
    }

    @media only screen and (max-width: 360px) {
        /*flex-direction: column;*/
        flex-wrap: wrap;
        place-content: space-around;
        padding-bottom: 10px;
        
        h1 {
          font-size: 18px;
        }
    }
`

export default NavBarContainer;