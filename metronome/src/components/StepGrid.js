import styled from 'styled-components'
import Block from "./Block";

// Styles

const Container = styled.div`
  flex-grow: 1;
  padding: 10px;
  background: gainsboro;
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
`

// Component

const StepGrid = (props) => {

    // TODO Make it show which block is being actively edited with a different style

    return(
    <Container>
        {props.stepData.map(item =>
            <Block value={item} editStep={props.editStep}/>
        )}
    </Container>
    )
}

export default StepGrid