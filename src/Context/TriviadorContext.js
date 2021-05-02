import React, { createContext, useState, useEffect } from 'react';

export const TriviadorContext = createContext();

const TriviadorProvider = (props) => {

    const [generosDefinidos,SetGenerosDefinidos]= useState([]);
    const [trivias,SetTrivias]= useState({});
    const [generoElegido,SetGeneroElegido] = useState("");
    const [generosAleatorios,SetGenerosAleatorios] = useState([]);
    const [triviaPorGenero,SetTriviaPorGenero] = useState([]);
    const [triviasPorGeneroAleatorias,SetTriviasPorGeneroAleatorios]= useState([]);
    const [usuario,SetUsuario] = useState("");
    const [puntaje, SetPuntaje] = useState(0);
    const [tiempoInicial, SetTiempoInicial] = useState('');
    const [duracionTrivia,SetDuracionTrivia] = useState('');

    const DesordenarPreguntas = (preguntas) =>{

        let idPreguntas=[];
        for (let index = 1; index <= preguntas.length; index++) {
            idPreguntas[index]=index;
        }
        idPreguntas = idPreguntas.sort(function() {return Math.random() - 0.5});
        idPreguntas= idPreguntas.slice(0,11);
      
        let preguntasAleatorias =[];
        for (let index = 1; index < idPreguntas.length; index++) {
            if( preguntas[idPreguntas[index]] === undefined){
                let idPreguntaReserva = DesordenarPreguntas(preguntas);
                return idPreguntaReserva;
            }
            preguntasAleatorias[index] = preguntas[idPreguntas[index]];
        }
      return preguntasAleatorias;
    }

    const ObtenerPreguntasAleatorias = (preguntas) =>{
        let preguntasAleatorias= DesordenarPreguntas(preguntas);
        SetTriviasPorGeneroAleatorios(preguntasAleatorias);
    }
    
    const BuscarGeneroSeleccionado = (genero) =>{

        let teimpoActual= new Date();
        let tiempoInicio = `${teimpoActual.getHours()}:${teimpoActual.getUTCMinutes()}:${teimpoActual.getSeconds()}`;
        SetTiempoInicial(teimpoActual);
        SetGeneroElegido(genero);
        const propiedadesTrivia = Object.keys(trivias);
        propiedadesTrivia.forEach(trivia => {
            let esGeneroSeleccionado = trivia.includes(genero);
            if(esGeneroSeleccionado)
            {
                SetTriviaPorGenero(trivias[trivia]);
                ObtenerPreguntasAleatorias(trivias[trivia]);
            }
        });
    }

    return (
        <TriviadorContext.Provider
            value={
                {
                    trivias,
                    generosDefinidos,
                    generosAleatorios,
                    generoElegido,
                    triviaPorGenero,
                    usuario,
                    puntaje,
                    triviasPorGeneroAleatorias,
                    tiempoInicial,
                    duracionTrivia,
                    SetDuracionTrivia,
                    SetPuntaje,
                    SetUsuario,
                    SetTriviaPorGenero,
                    SetGeneroElegido,
                    SetTrivias,
                    SetGenerosAleatorios,
                    BuscarGeneroSeleccionado
                }
            }
        >
            {props.children}
        </TriviadorContext.Provider>
    )
}
export default TriviadorProvider;