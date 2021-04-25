import React,{useState,useContext} from 'react';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {TriviadorContext} from '../Context/TriviadorContext';

const Genero = (props) => {

    const { SetGeneroElegido, generosAleatorios}  = useContext(TriviadorContext);

    const [generos,SetGeneros]= useState(generosAleatorios);

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
                                <Button variant="contained" color="primary" disableElevation onClick={() => SetGeneroElegido(genero)}>
                                    <NavLink 
                                        to='/trivia'
                                        className="nav-link"
                                        activeClassName="active"
                                        onClick={() => SetGeneroElegido(genero)}
                                    >
                                        {genero.replace(/_|#|-|@|<>/g, " ")}
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