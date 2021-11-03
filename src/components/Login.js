import NavBar from "./NavBar";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: grid;
  place-items: center;
  margin: 30px;
`
const Box = styled.div`
  background: white;
  width: 320px;
  padding: 20px;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input {
    margin: 10px;
    width: 200px;
  }
`




const Login = () => {

    const HandleSubmit = (e) => {
        e.preventDefault();
        axios
            . post('http://localhost/auth/local', {
                identifier: e.target[0].value,
                password: e.target[1].value,
            })
            .then(response => {
                console.log('User profile', response.data.user);
                console.log('User token', response.data.jwt);
                localStorage.setItem('usertoken', response.data.jwt);
            })
            .catch(error => {
                console.log('An error occurred:', error.response);
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
                        <input type='submit'/>
                    </form>

                    <button onClick={() => {
                        const value = localStorage.getItem('usertoken');
                        console.log(value)
                    }}>check</button>
                </Box>
            </Container>

        </>

    )
}

export default Login