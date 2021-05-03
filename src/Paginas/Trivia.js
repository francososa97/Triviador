import React,{useContext,useState,useEffect} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {TriviadorContext} from '../Context/TriviadorContext';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import useStyles from '../Estilos/useStyles.js';

const Trivia = () => {

    const { generoElegido,usuario,SetPuntaje,triviasPorGeneroAleatorias}  = useContext(TriviadorContext);
    const classes = useStyles();

    const SiguientePregunta = () => {

            if(preguntaActual === 1 ){
                const {pregunta,opciones}= triviasPorGeneroAleatorias[2];
                return {"pregunta":pregunta,"opciones":opciones};
            }
            else{
                const {pregunta,opciones}= triviasPorGeneroAleatorias[preguntaActual];
                return {"pregunta":pregunta,"opciones":opciones}; 
            }
    }

    const [preguntaActual,SetPreguntaActual] = useState(1);
    const [finalizarTrivia,SetFinalizarTrivia] = useState(false);
    const [triviasAleatorias,SetTriviasAleatorias] = useState([]);
    const [triviaActual,SetTriviaActual] = useState(triviasPorGeneroAleatorias[preguntaActual]);

    const EvaluarRespuesta= (opcionCorrecta) =>{

        if(opcionCorrecta)
            SetPuntaje((state) => state + 10);

        if(preguntaActual < 10 ){
            SetPreguntaActual((state) => state + 1);
            SetTriviaActual(SiguientePregunta(preguntaActual));
        }
        else{
            SetFinalizarTrivia(true);
        }
    }

    return(
        <>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography className="titulo-home" component="h1" variant="h4" align="center">
                        {generoElegido.replace(/_|#|-|@|<>/g, " ")}
                    </Typography>
                    {
                        preguntaActual === 1 
                        ? <Typography  className="subtitulo-home"  component="h6" variant="h6" gutterBottom>{usuario} eligio el genero de {generoElegido.replace(/_|#|-|@|<>/g, " ")}</Typography>
                        : null 
                    }

                    {!finalizarTrivia ? 
                        <>
                            <Typography className="titulo" variant="h6" element="h6" gutterBottom>
                                {triviaActual.pregunta}
                            </Typography>
                            {triviaActual.opciones.map(opcion=>{
                                return(
                                    <Button 
                                        fullWidth
                                        disableElevation 
                                        type="submit"
                                        variant="contained" 
                                        color="primary" 
                                        className="opcion"
                                        onClick={() => EvaluarRespuesta(opcion.esVerdadera)}
                                    >
                                    {opcion.opcion}
                                    </Button>
                                );
                            })}
                        </>
                    :
                    <NavLink to='/puntaje' className="nav-link" activeClassName="active"> 
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Finalizar
                        </Button>
                    </NavLink>
                }
                </Paper>
                <Typography className="trivia-actual"variant="h3" element="h3" gutterBottom>
                    {preguntaActual}/{10}
                </Typography>
            </main>
        </>
    )
}
export default Trivia;