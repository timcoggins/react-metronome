/**
 * UserContext.js
 * Provides a context to store the user data
 */
import { createContext, useState } from "react";

// Create the Context
const UserContext = createContext('')
export default UserContext

/**
 * Provides the context
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export const UserContextProvider = ({ children }) => {

    // State variable
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