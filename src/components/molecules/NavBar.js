
import { Container, Site, Logo} from '../atoms/TopBar'
import logoImage from "../../images/music.svg";

/**
 * Component for the Navbar (not used on metronome page)
 * @constructor
 */

const NavBar = () => {
    return (
        <Container>
            {/* Site Title */}
            <Site>
                <Logo src={logoImage} />
                <h1>Metronomical</h1>
            </Site>
        </Container> )
}

export default NavBar