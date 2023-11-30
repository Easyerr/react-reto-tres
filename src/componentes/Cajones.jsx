import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import {  useNavigate } from "react-router-dom";





export default function Cajones() {
    const [cajones, setCajones] = useState([]);
    const [cajonSeleccionado, setCajonSeleccionado] = useState(null);
    const [cajonData, setCajonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [elementoAEliminar, setElementoAEliminar] = useState(null)

    const navigate = useNavigate()



    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:3000/congelador/all',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`}})
            .then(response => response.json())
            .then(data => {
                setCajones(data);
                setLoading(false);
                console.log(data);
                
            })
            .catch(error => {
                console.error('Error fetching cajones', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (cajonSeleccionado !== null) {
            setLoading(true);
            setCajonData(null)
            fetch(`http://localhost:3000/congelador/cajon/${cajonSeleccionado}`)
                .then(response => response.json())
                .then(data => {
                    setCajonData(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching cajon data', error);
                    setLoading(false);
                });
        }
    }, [cajonSeleccionado]);

    const handleCajonChange = (e) => {
        setCajonSeleccionado(e.target.value);
    };
 
    const handlePlussButton = (e) => {
        navigate('/añadir')
    }

    const eliminarElemento = async (i) => {
        console.log(cajonData.elementos, i);
        try {
            const response = await fetch(`http://localhost:3000/congelador/eat/${cajonData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cajonData.elementos[i]),
            })
            if (!response.ok) {
                throw Error(`error al eliminar ${response.status}`)
            }
            // Clonar el array usando spread opetator NO modificamos el estado existente; sino con una copia
            const nuevosElementos = [...cajonData.elementos];
            // Elimina el elemento en la posición i
            nuevosElementos.splice(i, 1);
            // Actualizar el estado local `cajonData` con la nueva lista de elementos
            setCajonData({ ...cajonData, elementos: nuevosElementos });
            
        }
        catch (error) {
            console.error('Error al eliminar elemento:', error);

        }
    }



    return (
        <>

        <div id="cajones">

            <h1>Mi Congelador</h1>

            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab color="primary" aria-label="add">
                    <AddIcon onClick={handlePlussButton}/>
                </Fab>
            </Box>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Cajones</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={null}
                    label="Cajones"
                    onChange={handleCajonChange}
                    >
                    {cajones.map((cajon, i) => (
                        <MenuItem key={i} value={cajon.Cajon}>{cajon.Cajon}</MenuItem>))}

                </Select>
            </FormControl>
                        </div>

            {loading && <p>Loading...</p>}
            <div id="elementos-cajon">

            {cajonData && (
                <>
                    <h2>Elementos de cajon {cajonSeleccionado}</h2>
                    {Array.isArray(cajonData.elementos) && cajonData.elementos.length > 0 ? (
                        <Grid container spacing={2}>
                            {cajonData.elementos.map((elemento, i) => (
                                <Grid item key={i} xs={12} sm={6} md={5} lg={4}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia
                                            sx={{ height: 140 }}
                                            image={elemento.imagen}
                                            title="green iguana"
                                            />
                                        <CardContent>
                                            <Typography gutterBottom variant="h4" component="div">
                                                {elemento.nombre}
                                            </Typography>
                                            <Typography variant="h6" color="text.secondary">
                                                {elemento.tipo}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Caducidad: {elemento.out}
                                            </Typography>
                                            <CardActions>
                                                <Button onClick={() => eliminarElemento(i)} variant="red" startIcon={<DeleteIcon />}>

                                                </Button>
                                                {/* <Button onClick={() => eliminarElemento(i)}>Eliminar</Button> */}
                                            </CardActions>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <p>No hay elementos disponibles</p>
                        
                        )}
        </>
    )
    
}
                        </div>

</>)}
