/**
 * User Message.js
 * Component for rendering a messagebox to the user
 */

// Imports

import styled from 'styled-components'
import Heading3 from "../atoms/H3";

// Styles
// TODO This should probably be split, although I think this component is redundant now, will probably be used when registering
const MessageContainer = styled.div`
  //background-color: ${props => props.theme.colors.middleGreen};
  display: grid;
  place-items: center;
`

const MessageBox = styled.div`
  margin-top: 40px;
  width: 360px;
  background: white;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
`

/**
 * UserMessage Component
 * @returns {JSX.Element}
 */

const UserMessage = (props) => {
    return (
        <MessageContainer>
            <MessageBox>
                <Heading3>{props.title}</Heading3>
                <p>{props.children}</p>
            </MessageBox>
        </MessageContainer>
    )
}

export default UserMessage