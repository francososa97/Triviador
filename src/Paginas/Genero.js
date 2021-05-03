import React,{useState,useContext} from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {TriviadorContext} from '../Context/TriviadorContext';
import useStyles from '../Estilos/useStyles.js';


const Genero = (props) => {

    const { SetGeneroElegido, generosAleatorios,SetTriviaPorGenero,trivias,BuscarGeneroSeleccionado}  = useContext(TriviadorContext);
    const classes = useStyles();

    return(
        <>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
            <Typography className="titulo-home" component="h1" variant="h4" align="center">
                Genero
              </Typography>
              {generosAleatorios.map(genero=>{
                return(
                     <Grid item xs={12}>
                        <NavLink 
                            to='/trivia'
                            className="nav-link"
                            activeClassName="active"
                            fullWidth
                            onClick={() => BuscarGeneroSeleccionado(genero)}
                        >
                            <Button 
                                fullWidth
                                disableElevation 
                                type="submit"
                                variant="contained" 
                                color="primary" 
                                className={classes.submit}
                                onClick={() => BuscarGeneroSeleccionado(genero)}
                            >
                                {genero.replace(/_|#|-|@|<>/g, " ")}
                            </Button>
                        </NavLink>
                     </Grid>
                );
            })}
            </Paper>
        </main>
        </>
    )
}
export default Genero;