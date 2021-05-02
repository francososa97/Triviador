import React,{useContext,useState,useEffect} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {TriviadorContext} from '../Context/TriviadorContext';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Trivia = () => {

    const { generoElegido,usuario,SetPuntaje,triviasPorGeneroAleatorias}  = useContext(TriviadorContext);


    const SiguientePregunta = () => {

            if(preguntaActual ===1 ){
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
            SetPuntaje((state) => state + 100);

        if(preguntaActual < 10 ){
            SetPreguntaActual((state) => state + 1);
            console.log(`tu pregunta actual es la numero ${preguntaActual}`);
            SetTriviaActual(SiguientePregunta(preguntaActual));
        }
        else{
            SetFinalizarTrivia(true);
        }
       
    }

    return(
        <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
            <p>{usuario} eligio el genero de...</p>
            <Typography className="titulo" variant="h1" gutterBottom>
                {generoElegido.replace(/_|#|-|@|<>/g, " ")}
            </Typography>
            {!finalizarTrivia ?
                        <Paper>
                            <h3>{triviaActual.pregunta}</h3>
                            <ol>
                                {triviaActual.opciones.map(opcion=>{
                                    return(
                                        <li onClick={() => EvaluarRespuesta(opcion.esVerdadera)}>
                                            <Button variant="contained" color="primary" disableElevation>
                                            {opcion.opcion}
                                            </Button>
                                        </li>
                                    );
                                })}
                            </ol>
                            <span className="quiz_screen-counter">{preguntaActual}/{10}</span>
                        </Paper>
            :
                <Paper>
                    <NavLink to='/puntaje' className="nav-link" activeClassName="active"> <p className="white-text">Finalizar</p></NavLink>
                </Paper>
            }
        </Typography>
        <span className="quiz_screen-counter">{preguntaActual}/{10}</span>
        </Container>
    )
}
export default Trivia;