// import React, { createContext, useState , useEffect} from 'react'



// const AuthContext = createContext({
//     isAuthenticated: false,
//     setIsAuthenticated: () => { }
// })

// export const AuthProvider = ({ children }) => {

//     const storedUser = sessionStorage.getItem('user');
//     const decryptedUser = storedUser ? JSON.parse(CryptoJS.AES.decrypt(storedUser, secret_key).toString(CryptoJS.enc.Utf8)) : null;
//     const [isAuthenticated, setIsAuthenticated] = useState(false);


//     useEffect(() => {
//         if (decryptedUser && decryptedUser.username === "undecided.eth" && decryptedUser.password === "chutiya123") {
//             setIsAuthenticated(true);
//         } else {
//             setIsAuthenticated(false);
//         }
//     }, [storedUser]);

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export default AuthContext;