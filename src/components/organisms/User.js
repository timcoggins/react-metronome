/**
 * User.js
 * Sidebar for user stuff like login
 */

// Imports
import axios from "axios";
import { useMutation } from "react-query";
import { useContext, useRef } from "react";
import UserContext from "../../contexts/UserContext";
import SideBarItem from "../molecules/SideBarItem";
import P from "../atoms/P"
import Button from "../atoms/Button";
import SideBarControls from "../atoms/SideBarControls";
import Input from "../atoms/Input"

// Backend url
const base = 'https://metronomic-backend.herokuapp.com'

/**
 * User Component
 * @returns {JSX.Element}
 */
const User = () => {

    // Declare
    const { userData, setUserData } = useContext(UserContext)
    const username = useRef(null);
    const password = useRef(null);

    /**
     * Query to save a pattern
     * @type
     */
    const loginMutation = useMutation(loginMutation => {
        return axios.post(`${base}/auth/local`, {
            identifier: username.current.value,
            password: password.current.value,
        })
    }, { onSuccess: (data) => {
            // Store the users JWT
            setUserData({
                jwt: data.data.jwt,
                id: data.data.user.id,
                name: data.data.user.username
            })
        } })


    /**
     * Clears the user data to logout
     */
    const logout = () => setUserData({
        id: null,
        jwt: null,
        name: null
    })

    // JSX
    return(
        <SideBarItem title={'User'}>

            {/*When the user is logged in*/}
            {userData.jwt && <>
                <P>Hello {userData.name}!</P>
                <SideBarControls>
                    <Button onClick={logout}>Logout</Button>
                </SideBarControls>
            </>}

            {/*When the user is not logged in*/}
            {!userData.jwt && <>
                <P>Login to save patterns</P>
                <SideBarControls>
                    <P>User:</P><Input type={'text'} ref={username}/>
                </SideBarControls>
                <SideBarControls>
                    <P>Pass:</P><Input type={'password'} ref={password}/>
                </SideBarControls>
                <SideBarControls>
                    <Button onClick={() => loginMutation.mutate()}>Login</Button>
                    <Button disabled>Create</Button>
                </SideBarControls>
            </>}

        </SideBarItem>
    );
}

export default User