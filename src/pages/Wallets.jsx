import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../constants';

// Design Components
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import OutlinedInput from "@mui/material/OutlinedInput";

import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DoneIcon from '@mui/icons-material/Done';

import Modal from 'react-bootstrap/Modal';



const Wallets = () => {

  const [wallets, setWallets] = useState([])
  const [walletData, setWalletData] = useState({
    privateKey: '',
    publicKey: '',
    walletName: ''
  });

  const [loading, setLoading] = useState(true);
  const [pasteIcon, setPasteIcon] = React.useState(true);
  const [addWalletModalShow, setAddWalletModalShow] = useState(false);


  useEffect(() => {
    getAllWallets();
  }, []);


  const getAllWallets = async () => {
    try {
      const response = await axios.get(`${apiUrl}wallets`);
      // console.log("API RESPONSE", response.data);
      setWallets(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching wallets:', error);
    }
  }

  const deleteWallet = async (id) => {
    try {
      await axios.delete(`${apiUrl}wallets/${id}`);
      getAllWallets(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting wallet:', error);
    }
  };


  const handleEditWallet = (id) => {
    console.log("Edit", id);

  }


  const handleDeleteWallet = (id) => {
    // console.log("Delete", id);
    setLoading(true);
    deleteWallet(id);
  }

  const handlePasteData = async () => {
    const clipboardText = await navigator.clipboard.readText();
    setWalletData(prevData => ({
      ...prevData,
      privateKey: clipboardText,
    }));
    setPasteIcon(false);
    setTimeout(() => {
      setPasteIcon(true);
    }, 2000);

  }



  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#646cff",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function createData(name, privateKey, publicKey, eth, weth) {
    return { name, privateKey, publicKey, eth, weth };
  }

  const rows = [
    createData('Primary', "0x3b1e20Aea65D5dC0b7948258f3B0b41618a96c6basdasdasdas", "0x3b1e20Aea65D5dC0b7948258f3B0b41618a96c6b", 1.254, 3.2),
    createData('Secondary', "0x3b1e20Aea65D5dC0b7948258f3B0b41618a96c6basdasdasdas", "0x3b1e20Aea65D5dC0b7948258f3B0b41618a96c6b", 1.254, 3.2),
    createData('Burner', "0x3b1e20Aea65D5dC0b7948258f3B0b41618a96c6basdasdasdas", "0x3b1e20Aea65D5dC0b7948258f3B0b41618a96c6b", 1.254, 3.2),
  ];


  return (
    <>
      <div className='mt-4'>
        <Button sx={{ float: "right" }} variant="contained" onClick={() => { setAddWalletModalShow(true) }}> + Add Wallet</Button>
      </div>
      <br />

      {loading ?
        <>
          <div style={{ width: '100%' }} >
            <br />
            <br />
            <h5 className='mx-auto'>Loading . . . </h5>
          </div>
        </>
        :
        <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Wallet Name</StyledTableCell>
                <StyledTableCell align="center">Private Key </StyledTableCell>
                <StyledTableCell align="center">Public Key&nbsp;</StyledTableCell>
                <StyledTableCell align="center">Eth Balance&nbsp;(ETH)</StyledTableCell>
                <StyledTableCell align="center">WETH Balance&nbsp;(WETH)</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wallets.map((row, index) => (
                <StyledTableRow key={row.walletName}>
                  <StyledTableCell component="th" scope="row">
                    {row.walletName}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.privateKey.slice(0, 5)}...{row.privateKey.slice(-5)}</StyledTableCell>
                  <StyledTableCell align="center">{row.publicKey}</StyledTableCell>
                  <StyledTableCell align="center">{row.eth}</StyledTableCell>
                  <StyledTableCell align="center">{row.weth}</StyledTableCell>
                  <StyledTableCell align="center" ><Button color='warning' sx={{ cursor: "pointer" }} onClick={() => handleEditWallet(row._id)}>Edit</Button><Button color='error' sx={{ cursor: "pointer" }} onClick={() => handleDeleteWallet(row._id)}>Delete</Button></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer >
      }



      <Modal backdrop="static" show={addWalletModalShow} onHide={() => setAddWalletModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Wallet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="private key">Private Key </InputLabel>
            <OutlinedInput id="private key" name="private key"
              type='text'
              value={walletData.privateKey}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handlePasteData} edge="end" >
                    {pasteIcon ? <ContentPasteIcon /> : <DoneIcon />}
                  </IconButton>
                </InputAdornment>
              }
              label="private key"
            />
          </FormControl>

          <TextField margin="normal" fullWidth
            id="wallet name" label="Wallet Name" name="Wallet Name"
            autoComplete="wallet name" autoFocus
          />

        </Modal.Body>
        <Button color='success' variant='contained' sx={{ cursor: "pointer", width: '20%', justifyContent: "center", margin:'auto' }} onClick={() => handleAddWallet()}>Add Wallet</Button>
        <br /><br />
      </Modal>
    </>

  )
}

export default Wallets