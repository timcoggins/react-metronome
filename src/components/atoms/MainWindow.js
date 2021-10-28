import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  margin: 0 auto;

  // Put the sidebar down the bottom on mobile devices
  @media only screen and (max-width: 360px) {
    flex-direction: column-reverse;
  }
`

const SideBar = styled.div`
  margin: 10px;
  width: 250px;
  @media only screen and (max-width: 360px) {
    margin: 10px 0 0 0;
    width: 100%;
  }
`

export { Container, SideBar }