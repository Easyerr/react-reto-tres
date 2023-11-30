
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AcUnitIcon from '@mui/icons-material/AcUnit';

export default function Header() {


  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }
  const handleRegisterClick = () => {
    navigate('/register')
  }
  const handleCajonesClick = () => {
    navigate('/cajones')
  }



  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="">
        <Toolbar>
        <Button onClick={handleLoginClick} color="inherit">
          <Typography edge="start" color="black"variant="h5" component="div" sx={{ flexGrow: 3 }}>
            
            Freezier
          </Typography>
          </Button>
          <div id="botones">
          <Button onClick={handleCajonesClick} color="inherit">Comida!</Button>
          <Button onClick={handleLoginClick} color="inherit">Login</Button>
          <Button onClick={handleRegisterClick} color="inherit">Register</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>


    

    )
}