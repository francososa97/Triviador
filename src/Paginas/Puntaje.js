import React,{useContext,useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import {TriviadorContext} from '../Context/TriviadorContext';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import useStyles from '../Estilos/useStyles.js';


const Puntaje = () =>{

    const { usuario,puntaje,tiempoInicial,duracionTrivia,SetDuracionTrivia}  = useContext(TriviadorContext);
    const classes = useStyles();

    const GetDuracionTiempo = (FechaInicio) => {

        let FechaFin= new Date();
        let duracion,minutos,segundos ="";
        if(FechaInicio.getSeconds() > FechaFin.getSeconds()){
            minutos = Math.abs((FechaFin.getMinutes() - FechaInicio.getMinutes()) -1 );
            segundos = Math.abs(60 + (FechaFin.getSeconds() - FechaInicio.getSeconds()));
            duracion = `${minutos}:${segundos}`;
        }
        duracion = `${Math.abs(FechaFin.getMinutes() - FechaInicio.getMinutes())}:${Math.abs(FechaFin.getSeconds() - FechaInicio.getSeconds())}`;
        SetDuracionTrivia(duracion);
    }

    useEffect(()=>{
        GetDuracionTiempo(tiempoInicial);
    });

    return(

        <div className="fin-trivia">
            <Paper className={classes.paper}>
                <Typography className="titulo-home" component="h1" variant="h4" align="center">
                    Tu puntaje
                </Typography>
                <Typography  className="subtitulo-home"  component="h6" variant="h6" gutterBottom>
                    El puntaje de {usuario} fue de {puntaje} y tardo {duracionTrivia}
                </Typography>
                <NavLink to='/tablapuntajes' className="nav-link" activeClassName="active"> 
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Ver tabla de puntajes
                    </Button>
                </NavLink>
            </Paper>
        </div>
    )
}
export default Puntaje;