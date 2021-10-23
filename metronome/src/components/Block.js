import styled from "styled-components";
import {css} from 'styled-components'

const StyledBlock = styled.div`
  height: 70px;
  width: 70px;

  display: grid;
  place-items: center;
  border-radius: 4px;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(209, 213, 219, 0.3);

  ${props => props.active && css`
    border-width: 4px;
  `}
  &:hover {
    background-color: rgba(199, 199, 199, 0.75)
  }

`

const Block = (props) => {
    return(
        <>
            <StyledBlock>
                <h2>{props.value}</h2>
            </StyledBlock>
        </>
    )
}

export default Block