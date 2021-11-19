/**
 * User.js
 * Sidebar for user stuff like login
 */

// Imports
import { useMutation } from "react-query";
import axios from "axios";
import { useContext, useRef } from "react";
import UserContext from "../../contexts/UserContext";
import SideBarItem from "../molecules/SideBarItem";
import P from "../atoms/P"
import Button from "../atoms/Button";
import SideBarControls from "../atoms/SideBarControls";
import Input from "../atoms/Input"

const base = 'https://metronomic-backend.herokuapp.com'

/**
 * Notes Component
 * @returns {JSX.Element}
 */
const User = () => {

    const { userData, setUserData } = useContext(UserContext)
    const username = useRef(null);
    const password = useRef(null);

    //useEffect(() => console.log(userData), [userData])

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
            setUserData({
            jwt: data.data.jwt,
            id: data.data.user.id,
            name: data.data.user.username})
        } })

    /**
     *
     */
    const login = () => loginMutation.mutate();
    const logout = () => setUserData({
        id: null,
        jwt: null,
        name: null
    })
    return(
        <SideBarItem title={'User'}>
            {userData.jwt && <>
                <P>Hello {userData.name}!</P>
                <SideBarControls>
                    <Button onClick={logout}>Logout</Button>
                </SideBarControls>
            </>}

            {!userData.jwt && <>
                <P>Login to save patterns</P>
                <SideBarControls>
                    <P>User:</P><Input type={'text'} ref={username}/>
                </SideBarControls>
                <SideBarControls>
                    <P>Pass:</P><Input type={'password'} ref={password}/>
                </SideBarControls>
                <SideBarControls>
                    <Button onClick={login}>Login</Button>
                    <Button disabled>Create</Button>
                </SideBarControls>
            </>}
        </SideBarItem>
    );
}

export default User