import React from 'react'
// import Button from 'react-bootstrap/Button';
import Button from '@mui/material/Button';
import Header from '../components/Header';
import { Container } from '@mui/material';

const Dashboard = ({ setIsAuthenticated }) => {
  return (
    <Container >
      <Header />
      <Button variant="contained" onClick={() => { sessionStorage.removeItem('user'), setIsAuthenticated(false) }}>Logout</Button>
    </Container>
  )
}

export default Dashboard