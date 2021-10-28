import styled from 'styled-components'

const Container = styled.div`

    padding: 0 15px;
    margin: 0;
  
    border-bottom: #886F68 1px solid;
    border-right: #886F68 1px solid;
    background: white;  

    text-align: left;
  
    p {
        word-wrap: break-word;
    }
`;

const Heading = styled.div`
    display: flex;
    place-content: space-between;
    align-items: center;
    cursor: pointer;
`;

const Expand = styled.div`
    color: white;
    width: 30px;
    height: 30px;
    padding: 1px;
    background: gainsboro;
    border-radius: 20px;
    display: grid;
    place-items: center;
    /*margin-right: 10px;*/
`;

const Controls = styled.div`
    display: flex;
    align-items: center;
    place-content: space-between;
    padding-bottom: 20px;
    select {
        border-radius: 5px;
        padding: 2px;
        width: 160px;
    }
    input[type="number"] {
        width: 60px;
        cursor: pointer;
    }
    button {
        margin: 10px 3px;
        cursor: pointer;
    }
`;

export { Container, Expand, Heading, Controls }