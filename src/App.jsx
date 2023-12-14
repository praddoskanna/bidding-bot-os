import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import AuthContext, { AuthProvider } from "./context/AuthContext";

//PAGE COMPONENTS
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";


// CSS IMPORTS
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import CryptoJS from "crypto-js";
import { secret_key } from './constants';

function App() {


  const storedUser = sessionStorage.getItem('user');
  const decryptedUser = storedUser ? JSON.parse(CryptoJS.AES.decrypt(storedUser, secret_key).toString(CryptoJS.enc.Utf8)) : null;
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    if (decryptedUser && decryptedUser.username === "undecided.eth" && decryptedUser.password === "chutiya123") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [storedUser]);


  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/login" exact element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes >)
        :
        (
          <Routes>
            <Route path="/" exact element={<Dashboard setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes >)
      }

    </Router>
  )
}

export default App;
