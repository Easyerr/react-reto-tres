import React from "react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';



export default function Register(){
    const [username, setUsername ] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ok, setOk] = useState(false)
    const navigate = useNavigate();

    const handleUserChange = (e) => {
        setUsername(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)    
}

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://p01--freezier-service--wvg6d2q5sfn9.code.run/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    username,
                    email,
                    password,
                })
            });

            if(response.ok) {
                console.log('usuario registrdo');
                setTimeout(()=>{
                    navigate('/cajones')
                },1500)
                
            } else {
                console.error('error al registrar');
            }
        } catch(error) {
            console.error('error al enviar solicitud', error);
        }
    }
    const handleRegister = async () => {
        navigate('/cajones');
    }
    return(
        <>
        
            <div id="register">
            <h2>Register</h2>

            <div id="form-registro">

            <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField id="filled-basic" label="Nombre" variant="filled" type="text" value={username} onChange={handleUserChange}>

                Username:
            </TextField>
                    
            <TextField id="filled-basic" label="Email" variant="filled" type="email" value={email} onChange={handleEmailChange}>

                    Email: 
            </TextField>
            <TextField id="filled-basic" label="Password" variant="filled" type="password" value={password} onChange={handlePasswordChange}>

                    Password:
            </TextField>
                    
                    <br/>
                    <Button type="submit" variant="contained" onClick={handleSubmit} >
                Register
            </Button>
            
                    
            </Box>
            </div>
            </div>
            {ok ? 
            <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert onClose={() => {}}>Elemento añadido!</Alert>
            
          </Stack>
            :''}
                
        
            </>
            
        )
    }