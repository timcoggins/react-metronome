/**
 * UserContext.js
 * Provides a context to store the user data
 */
import { createContext, useState } from "react";

// Create the Context
const UserContext = createContext('')
export default UserContext

// TODO Store the userdata in local storage and retrieve

/**
 * Provides the context
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export const UserContextProvider = ({ children }) => {

    // State variable to store the data
    const [ userData, setUserData ] = useState({
        userId: '',
        userJWT: '',
        userName: ''
    });

    // JSX
    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            { children }
        </UserContext.Provider>
    )
}