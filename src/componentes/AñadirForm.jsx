import { useState } from "react";
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AñadirForm({ onAddForm }) {

    const [nombre, setNombre] = useState('')
    const [tipo, setTipo] = useState('')
    const [imagen, setImagen] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [entra, setEntra] = useState('')
    const [out, setOut] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [notas, setNotas] = useState('')
    const [ok, setOk] = useState(false)
    

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")

        const addElemento = {
            nombre,
            tipo,
            imagen,
            ubicacion,
            entra,
            out,
            cantidad,
            notas
        }

        try {
            const response = await fetch('http://localhost:3000/congelador/add', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(addElemento),
            })
            if (response.ok) {
                

                setNombre('')
                setTipo('')
                setImagen('')
                setUbicacion('')
                setEntra('')
                setOut('')
                setCantidad('')
                setNotas('')
                setOk(true)
                
                setTimeout(()=>{
                    navigate('/cajones')
                },1500)
            } else {
                console.error('error al agregar');
            }
        } catch (error) {
            console.error('error solicitud', error);
        }

    }

    const handleAtras= async () => {
        navigate('/cajones');
    }
    
    return (

        <>
        

    
  
<div id="formulario">
<Button onClick={handleAtras} variant="contained" >
                Atras
            </Button>
    <h1>Añadir comida</h1>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            >


            <TextField id="outlined-basic" label="Nombre" variant="outlined" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}>
                Nombre:
            

            </TextField>
            <br />
            <TextField id="outlined-basic" label="Tipo" variant="outlined" type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} >
                Tipo:

            </TextField>
            <br />
        

            
            <TextField id="outlined-basic"  defaultValue="/logos/patascapon.png" helperText="/logos/patascapon.png" label="Imagen" variant="outlined" type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} >
                Imagen:

            </TextField>
            <br />

            
            <TextField id="outlined-basic" label="Nº de Cajon" variant="outlined" type="number" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} >
                Nº de Cajon:

            </TextField>
            <br />
            <TextField id="outlined-basic" label="Fecha de entrada" variant="outlined" type="date" InputLabelProps={{ shrink: true, }} value={entra} onChange={(e) => setEntra(e.target.value)} >
                Fecha de entrada:

            </TextField>
            <br />
            <TextField id="outlined-basic" label="Fecha de salida" type="date" InputLabelProps={{ shrink: true, }} value={out} onChange={(e) => setOut(e.target.value)} >
                Fecha de salida:

            </TextField>
            <br />
            <TextField id="outlined-basic" label="Cantidad" variant="outlined" type="text" value={cantidad} onChange={(e) => setCantidad(e.target.value)}>
                Cantidad:

            </TextField>
            <br />
            <TextField id="outlined-basic" label="Notas" variant="outlined" type="text" value={notas} onChange={(e) => setNotas(e.target.value)} >
                Notas:

            </TextField>
            <br />

            <Button type="submit" variant="contained" >
                Añadir elemento
            </Button>
            
            </Box>
            </div>
            {ok ? 
            <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert onClose={() => {}}>Elemento añadido!</Alert>
            
          </Stack>
            :''}

            </>
    )
}