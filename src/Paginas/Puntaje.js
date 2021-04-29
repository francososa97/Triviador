import React,{useContext} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import {TriviadorContext} from '../Context/TriviadorContext';
import Button from '@material-ui/core/Button';



const Puntaje = () =>{

    const { usuario,puntaje}  = useContext(TriviadorContext);
    return(
        <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
            <Typography className="titulo" variant="h1" gutterBottom>
                Puntaje
            </Typography>
            <Typography className="titulo" variant="h" gutterBottom>
                {`El puntaje de ${usuario} fue de ${puntaje}`}
            </Typography>


        </Typography>

  </Container>
    )
}
export default Puntaje;