/**
 * Expand.js
 * Styled Component for a expand button on the sidebar
 */
import styled from "styled-components";

// Styles
const Expand = styled.div`
    color: white;
    width: 30px;
    height: 30px;
    padding: 1px;
  
    background: ${props => props.theme.colors.expandBackground};
    border-radius: 20px;
  
    display: grid;
    place-items: center;
`;

export default Expand;