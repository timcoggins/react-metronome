import NavBar from "./NavBar";
import styled from "styled-components";
import { useState } from 'react';
import axios from "axios";

const Container = styled.div`
  display: grid;
  place-items: center;
  margin: 30px;
`
const Box = styled.div`
  text-align: center;
  background: white;
  width: 300px;
  padding: 20px;
  border-radius: 4px;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input {
    margin: 10px;
    height: 25px;
    width: 100%;
    border: 1px gainsboro solid;
    border-radius: 4px;
  }
`

const UserMessage = styled.p`
  color: #000000;
  background: #ffcccc;
  border-radius: 4px;
  padding: 5px;
`




const Login = () => {

    const [resMessage, setResMessage] = useState('')

    const HandleSubmit = (e) => {
        e.preventDefault();

        if(e.target[0].value === '' || e.target[1].value === '') {
            setResMessage('Email or Password field is empty')
            return;
        }

        axios
            . post('http://localhost/auth/local', {
                identifier: e.target[0].value,
                password: e.target[1].value,
            })
            .then(response => {
                console.log('User profile', response.data.user);
                console.log('User token', response.data.jwt);
                localStorage.setItem('usertoken', response.data.jwt);
                setResMessage('');
                window.location.href = "http://localhost:3000/";
            })
            .catch(error => {
                console.log('An error occurred:', error.response);
                setResMessage(error.response.data.message[0].messages[0].message)
            });
    }


    return(
        <>
            <NavBar />
            <Container>
                <Box>
                    <h2>Login</h2>
                    <form onSubmit={HandleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input id='username' type='text' placeholder='Username'/>
                        <label htmlFor="password">Password</label>
                        <input id='password' type='password' placeholder='Password'/>
                        <input type='submit' value={'Login'}/>
                    </form>
                    {resMessage && <UserMessage>{resMessage}</UserMessage>}
                </Box>
            </Container>
        </>
    )
}

export default Login