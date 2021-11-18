/**
 * NavBar.js
 * Component for the NavBar
 */

import NavBarContainer from "../atoms/NavBarContainer";
import NavBarSiteContainer from "../atoms/NavBarSiteContainer";
import NavBarLogo from "../atoms/NavBarLogo";
import H1 from "../atoms/H1";

import logoImage from "../../assets/images/musicwhite.svg";

const NavBar = (props) => {

    // JSX

    return (
        <NavBarContainer>
            {/* Site Title */}
            <NavBarSiteContainer>
                <NavBarLogo src={logoImage}/>
                <H1>Metronomical</H1>
            </NavBarSiteContainer>
            { props.children }
        </NavBarContainer>
    )
}
export default NavBar