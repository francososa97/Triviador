import React,{useContext,useState} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {TriviadorContext} from '../Context/TriviadorContext';
import { NavLink } from 'react-router-dom';

const Trivia = () => {

    const { generoElegido,triviaPorGenero,usuario,SetPuntaje }  = useContext(TriviadorContext);
    const [preguntaActual,SetPreguntaActual] = useState(1);
    const [finalizarTrivia,SetFinalizarTrivia] = useState(false);
    const triviaActual = triviaPorGenero[preguntaActual];

    const EvaluarRespuesta= (opcionCorrecta) =>{
        if(opcionCorrecta)
            SetPuntaje((state) => state + 1);
        SetPreguntaActual((state) => state + 1);
        if(preguntaActual === 10)
            SetFinalizarTrivia(true)
    }

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
                        {triviaActual.opciones.map(opcion=>{
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
                    <Pregunta/>

                {triviaPorGenero.map(trivia => {
                        console.log(trivia);
                        return(
                            <>
                                <p>{trivia.pregunta}</p>
                                <ol>
                                    {trivia.opciones.map(opcion => {
                                        return(
                                            <>
                                                <li>
                                                {opcion.opcion}
                                                </li>
                                            </>
                                        )
                                    })}
                                </ol>
                            </>
                        )
                    })}
*/