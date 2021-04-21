import React,{useState} from 'react';
import Generos from '../Helpers/Generos';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const Genero = (props) => {
    const {SetGeneroSeleccionado} = props;

    const ObtenerGenerosRandom = () =>{
        let generosRandom=["","","","",""];
        for (let index = 0; index < generosRandom.length; index++) {

            let indiceGeneroRandom = Math.abs(Math.floor(Math.random() * (0 - (Generos.length - 1))) + 0);
            let contieneGenero = generosRandom.includes(Generos[indiceGeneroRandom]);
            while (contieneGenero) {
                indiceGeneroRandom = Math.abs(Math.floor(Math.random() * (0 - (Generos.length - 1))) + 0);
                contieneGenero = generosRandom.includes(Generos[indiceGeneroRandom]);
            }
            if(Generos[indiceGeneroRandom] === undefined)
            {
                console.log(Generos[indiceGeneroRandom]);
                debugger;
            }
            generosRandom[index]= Generos[indiceGeneroRandom]; 
        }
        console.log(generosRandom);
        return generosRandom;
    }
    const [generos,SetGeneros]= useState(ObtenerGenerosRandom());

    return(
        <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
            <Typography className="titulo" variant="h1" gutterBottom>
            Genero
            </Typography>
            <Grid container spacing={3}>
       
            {generos.map(genero=>{
                return(
                    <>
                        <Grid item xs={12}>
                            <Paper>
                                <Button variant="contained" color="primary" disableElevation onClick={() => SetGeneroSeleccionado(genero)}>
                                    <NavLink 
                                        to='/trivia'
                                        className="nav-link"
                                        activeClassName="active"
                                        onClick={() => SetGeneroSeleccionado(genero)}
                                    >
                                        {genero}
                                    </NavLink>
                                </Button>
                            </Paper>
                        </Grid>

                    </>
                );
            })}
            </Grid>
        </Typography>

        </Container>
    )
}
export default Genero;