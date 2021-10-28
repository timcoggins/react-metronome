import styled from 'styled-components'


const Container = styled.div`
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

const Site = styled.div`
  margin: 0 0 0 10px;
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  height: 30px;
  width: 30px;
  padding: 0 8px 0 0;
`

const Controls = styled.div`
  display: flex;
  align-items: center;
`

const Button = styled.button`
  margin: 5px;
  height: 30px;
  width: 50px;
  display: grid;
  place-items: center;
  cursor: pointer;
`

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  align-items: center;
`

export { Container, Site, Logo, Controls, Button, SliderContainer }