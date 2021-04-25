import React,{useContext,useState} from 'react';
import Generos from '../Helpers/Generos';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {TriviadorContext} from '../Context/TriviadorContext';

const Trivia = () => {
    const { generoElegido,trivias }  = useContext(TriviadorContext);
    const [triviaPorGenero,SetTriviaPorGenero] = useState({});
    const propiedadesTrivia = Object.keys(trivias);
    propiedadesTrivia.forEach(trivia => {
        let esGeneroSeleccionado = trivia.includes(generoElegido);
        if(esGeneroSeleccionado){
            console.log(propiedadesTrivia);
        }
    });
    return(
        <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
            <Typography className="titulo" variant="h1" gutterBottom>
            Trivia
            </Typography>
            <Grid container spacing={3}>
                <p>{generoElegido}</p>
            </Grid>
        </Typography>
        <NavLink 
                to='/puntaje'
                className="nav-link"
                activeClassName="active"
            >
                <p className="white-text">Finalizar</p>
        </NavLink>
        </Container>
    )
}
export default Trivia;