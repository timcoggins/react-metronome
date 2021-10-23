import styled from 'styled-components'
import Block from "./Block";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
`

const StepBlock = (props) => {

    return(
        <>
    <Container>
        {props.blockTimes.map(item => <Block value={item} />)}
    </Container>
    </>
    )

}

export default StepBlock