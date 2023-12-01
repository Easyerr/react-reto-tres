import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AñadirForm from "./AñadirForm"

export default function Login(){

    const [username, setUsername ] = useState('')
    const [email, setEmail ] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()


    const handleUserChange = (e) => {
        setUsername(e.target.value);
    
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
    

        try {
            const response = await fetch('p01--freezier-service--wvg6d2q5sfn9.code.run/auth/login', {
                method: 'POST',
                headers: {//token
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            })

            if (response.ok) {
                console.log('Usuario registrado');
                let data = await response.json()
                localStorage.setItem("token", data.access_token)
                console.log(data);
                navigate('/cajones', '/añadir')
                //REDIRIGIR A CONGELADOR
            } else{
                console.error(('ERROR'));
            } 
        }catch (error){
                console.error('Error al realizar solicitud',error);
            }
        }
    
    
    
        return(

            <>

            <div id="login">
            <h2>Login</h2>
          
            <div id="form-login">
            <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off" onSubmit={handleSubmit}>

            
            <TextField id="filled-basic" label="Nombre" variant="filled" type="text" value={username} onChange={handleUserChange}>

                     Username:
            </TextField>

            <TextField id="filled-basic" label="Email" variant="filled" type="text" value={email} onChange={handleEmailChange}>
            Email:
            </TextField>

            <TextField id="filled-basic" label="Password" variant="filled" type="password" value={password} onChange={handlePasswordChange}>
                Password
            </TextField>
            <br/>

            <Button type="submit" variant="contained" onClick={handleSubmit} >
                Login
            </Button>
                    
            </Box>

           
            </div>
            </div>
                
                </>
                
        )
    
};
                {/* 
                <input type="text" value={email} onChange={handleEmailChange}></input>
                
                Password:
                <input type="password" value={password} onChange={handlePasswordChange}></input>
                </label>
                <br/>
            <button type="submit" onClick={handleSubmit}>Login</button> */}