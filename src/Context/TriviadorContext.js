import React, { createContext, useState, useEffect } from 'react';
import { db } from '../Firebase/FirebaseConfig';


export const TriviadorContext = createContext();

const TriviadorProvider = (props) => {

    const [generosDefinidos,SetGenerosDefinidos]= useState([]);
    const [trivias,SetTrivias]= useState({});
    const [generoElegido,SetGeneroElegido] = useState("");
    const [generosAleatorios,SetGenerosAleatorios] = useState([]);

    const  ObtenerGenerosRandom = (generos) =>{
        let generosRandom=["","","","",""];
        for (let index = 0; index < generosRandom.length; index++) {
            let indiceGeneroRandom = Math.abs(Math.floor(Math.random() * (0 - (generos.length - 1))) + 0);
            let contieneGenero = generosRandom.includes(generos[indiceGeneroRandom]);
            if(contieneGenero)
            {
                while (contieneGenero) {
                    indiceGeneroRandom = Math.abs(Math.floor(Math.random() * (0 - (generos.length - 1))) + 0);
                    contieneGenero = generosRandom.includes(generos[indiceGeneroRandom]);
                    if(!contieneGenero)
                        generosRandom[index]= generos[indiceGeneroRandom]; 
                }
            }
            else{
                generosRandom[index]= generos[indiceGeneroRandom]; 
            }
           

        }
        /*
        for (let index = 0; index < generosRandom.length; index++) {

            let indiceGeneroRandom = Math.abs(Math.floor(Math.random() * (0 - (generos.length - 1))) + 0);
            let contieneGenero = generosRandom.includes(generos[indiceGeneroRandom]);
            while (contieneGenero) {
                indiceGeneroRandom = Math.abs(Math.floor(Math.random() * (0 - (generos.length - 1))) + 0);
                contieneGenero = generosRandom.includes(generos[indiceGeneroRandom]);
            }
            console.log(`se va a guardar ${generos[indiceGeneroRandom]} en ${generosRandom[index]}`)
            generosRandom[index]= generos[indiceGeneroRandom]; 

        }*/
        generosRandom.forEach(genero => {
            genero.replace(/_|#|-|@|<>/g, " ");
        })
        return generosRandom;
    }

    useEffect(() => {
        const ObtenerTriviador = () =>{
            const triviaReferencia = db.collection(`trivias`);
            const generoReferencia = db.collection(`genero`);

            triviaReferencia.onSnapshot((snap) => {
                const dataBaseOperation = [];
                snap.forEach((snapChild) => {
                    dataBaseOperation.push(snapChild.data());
                });
                SetTrivias(dataBaseOperation[0]);
            });
            
            generoReferencia.onSnapshot((snap) => {
                const dataBaseOperation = [];
                snap.forEach((snapChild) => {
                    dataBaseOperation.push(snapChild.data());
                });
                SetGenerosDefinidos(dataBaseOperation[0].Generos);
                const generosRandom = ObtenerGenerosRandom(dataBaseOperation[0].Generos);
                SetGenerosAleatorios(generosRandom);
            });

        }
        ObtenerTriviador();
    });

    return (
        <TriviadorContext.Provider
            value={
                {
                    trivias,
                    generosDefinidos,
                    generosAleatorios,
                    generoElegido,
                    SetGeneroElegido,
                    SetTrivias
                }
            }
        >
            {props.children}
        </TriviadorContext.Provider>
    )
}
export default TriviadorProvider;