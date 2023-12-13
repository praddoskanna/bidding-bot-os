import React, { createContext, useState, useEffect, useContext } from 'react'

import CryptoJS from "crypto-js";
import { secret_key } from '../constants';

const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => { }
})



export const AuthProvider = ({ children }) => {


    // console.log(storedUser, "storedUser");
    const storedUser = sessionStorage.getItem('user');
    const decryptedUser = storedUser ? JSON.parse(CryptoJS.AES.decrypt(storedUser, secret_key).toString(CryptoJS.enc.Utf8)) : null;
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        if (decryptedUser && decryptedUser.username === "undecided.eth" && decryptedUser.password === "chutiya123") {
            console.log("decrypted data true");
            setIsAuthenticated(true);
        } else {
            console.log("decrypted data false");
            setIsAuthenticated(false);
        }
    }, [decryptedUser]);

    
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {console.log(isAuthenticated,"isAuthenticated context")}
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;