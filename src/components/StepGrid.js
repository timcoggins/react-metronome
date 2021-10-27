import styled from 'styled-components'
import Block from "./Block";
import { nanoid } from 'nanoid'

// Styles

const Container = styled.div`
  flex-grow: 1;
  padding: 10px;
  background: gainsboro;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 5px;
  height: 93vh;

  background-color: #113311;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 20 20'%3E%3Cg %3E%3Cpolygon fill='%23242' points='20 10 10 0 0 0 20 20'/%3E%3Cpolygon fill='%23242' points='0 10 0 20 10 20'/%3E%3C/g%3E%3C/svg%3E");
  `

// Component

const StepGrid = (props) => {

    return(
        <Container>
            {props.stepData.map((item, index) =>
                <Block key={nanoid()} value={item} editStep={props.editStep} currentStep={props.currentStep} index={index} selectedStep={props.selectedStep}/>
            )}
        </Container>
    )
}

export default StepGrid