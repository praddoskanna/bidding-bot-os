import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthContext, { AuthProvider } from "./context/AuthContext";

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


function App() {

  const { isAuthenticated } = useContext(AuthContext);


  console.log(isAuthenticated, "isAuthenticated appjs");

  return (
    <Router>
      <AuthProvider>
        {!isAuthenticated ? (
          <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes >)
          // </AuthProvider>)
          :
          (
            // <AuthProvider>
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes >)
        }
      </AuthProvider>

    </Router>
  )
}

export default App;
