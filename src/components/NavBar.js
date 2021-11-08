import {Container, Logo, Site} from "./atoms/TopBar";
import logoImage from "../assets/images/music.svg";
import TransportControls from "./TransportControls";
import * as Tone from "tone";


const NavBar = (props) => {
    // JSX

    return (
        <Container>
            {/* Site Title */}
            <Site>
                {/*<span className="material-icons">timer</span>*/}
                <Logo src={logoImage}/>
                <h1>Metronomical</h1>
            </Site>
            {/* Transport Controls */}
            {props.engine && <TransportControls
                tone={Tone}
                playStopButtonHandler={props.playStopButtonHandler}
                engine={props.engine}
            />}
        </Container>
    )
}
export default NavBar