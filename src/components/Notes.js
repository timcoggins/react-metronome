import styled from 'styled-components'

const Container = styled.div`
  width: 250px;
  height: 230px;
  border-top: #224422 3px dashed;
  border-right: #224422 3px dashed;
  padding: 10px;
  margin: 0;
  text-align: left;
  p {
    word-wrap: break-word;
  }
`

const Notes = () => {
    return(
        <Container>
            <h3>Notes</h3>
            <p>Edits made will not be audible until the sequence has been stopped and started again</p>
            <p>Same goes for changing the sounds or muting</p>
            <p>Made by <a href='https://github.com/timcoggins'>Tim Coggins</a></p>
        </Container>
    );
}

export default Notes