import React,{useContext,useState,useEffect} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {TriviadorContext} from '../Context/TriviadorContext';
import { NavLink } from 'react-router-dom';

const Trivia = () => {

    const { generoElegido,triviaPorGenero,usuario,SetPuntaje }  = useContext(TriviadorContext);
    const [preguntaActual,SetPreguntaActual] = useState(1);
    const [finalizarTrivia,SetFinalizarTrivia] = useState(false);
    const [triviasFiltradas,SetTriviasFiltradas] = useState([]);
    const [triviaActual,SetTriviaActual] = useState({});

    const ObtenerTriviasFiltradas = () =>{

        let preguntasTriviaElegida=[];
            for (let index = 0; index < 10; index++) {
                let indiceTriviaAleatoria = Math.abs(Math.floor(Math.random() * (0 - (15))) + 0);
                let contienePregunta = preguntasTriviaElegida.includes(triviaPorGenero[indiceTriviaAleatoria]);
                if(contienePregunta)
                {
                    while (contienePregunta) {
                        indiceTriviaAleatoria = Math.abs(Math.floor(Math.random() * (0 - (15))) + 0);
                        contienePregunta = preguntasTriviaElegida.includes(triviaPorGenero[indiceTriviaAleatoria]);
                        if(!contienePregunta)
                        {
                            debugger;
                            preguntasTriviaElegida[index]= triviaPorGenero[indiceTriviaAleatoria]; 
                            break;
                        }
                    }
                }
                else
                    preguntasTriviaElegida[index]= triviaPorGenero[indiceTriviaAleatoria]; 
    
            }
            SetTriviasFiltradas(preguntasTriviaElegida);
            return preguntasTriviaElegida;
    }

    const EvaluarRespuesta= (opcionCorrecta) =>{
        if(opcionCorrecta)
            SetPuntaje((state) => state + 1);
        SetPreguntaActual((state) => state + 1);
        if(preguntaActual === 10)
            SetFinalizarTrivia(true)
    }

    useEffect(() => {
        const preguntasTrivia = ObtenerTriviasFiltradas();
        debugger;
        SetTriviaActual(preguntasTrivia[preguntaActual]);

    });

    return(
        <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
            <p>{usuario} eligio el genero de...</p>
            <Typography className="titulo" variant="h1" gutterBottom>
                {generoElegido.replace(/_|#|-|@|<>/g, " ")}
            </Typography>
            <Paper>
                <h3>{triviaActual.pregunta}</h3>
                <div>
                    <ul>
                        {
                        triviaActual.opciones.map(opcion=>{
                            console.log(triviaActual);
                            return(
                                <li onClick={() => EvaluarRespuesta(opcion.esVerdadera)}>{opcion.opcion}</li>
                            );
                        })}
                    </ul>
                </div>
            </Paper>
            {finalizarTrivia
            ?   <NavLink to='/puntaje' className="nav-link" activeClassName="active"> <p className="white-text">Finalizar</p></NavLink>
            : null }
        </Typography>
        <span className="quiz_screen-counter">{preguntaActual}/{10}</span>
        </Container>
    )
}
export default Trivia;


/*
 {triviaActual === undefined ? null 
                :  
                    <>
                        <h3>{triviaActual.pregunta}</h3>
                        <div>
                            <ul>
                                {
                                triviaActual.opciones.map(opcion=>{
                                    console.log(triviaActual);
                                    return(
                                        <li onClick={() => EvaluarRespuesta(opcion.esVerdadera)}>{opcion.opcion}</li>
                                    );
                                })}
                            </ul>
                        </div>
                    </>
                }
*/