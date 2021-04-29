import React,{useState,useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Paginas/Home.js';
import Puntaje from './Paginas/Puntaje.js';
import Trivia from './Paginas/Trivia.js';
import Genero from './Paginas/Genero.js';
import TriviadorContext from './Context/TriviadorContext';
import TablaPuntajes from './Paginas/TablaPuntajes.js';
import { db } from './Firebase/FirebaseConfig';


const Trivador = () => {

  const [trivias,SetTrivias]= useState({});
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
                  {
                      generosRandom[index]= generos[indiceGeneroRandom]; 
                      break;
                  }
              }
          }
          else{
              generosRandom[index]= generos[indiceGeneroRandom];
              if(generosRandom[4].length > 0){
                  break; 
              }
          }
      }
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
              let {trivias}=dataBaseOperation[0];
              SetTrivias(trivias);
          });
          
          generoReferencia.onSnapshot((snap) => {
              const dataBaseOperation = [];
              snap.forEach((snapChild) => {
                  dataBaseOperation.push(snapChild.data());
              });
              const generosRandom = ObtenerGenerosRandom(dataBaseOperation[0].Generos);
              SetGenerosAleatorios(generosRandom);
          });

      }
      ObtenerTriviador();
  });

  return(
    <>
      <TriviadorContext>
        <CssBaseline />
        <Container maxWidth="sm">
          <Router>
              <Switch>
                <Route exact path="/"   
                  render={ () => (
                        <Home 
                          trivias={trivias}
                          generosAleatorios={generosAleatorios}
                        />
                  )}/>
                <Route exact path="/genero" component={Genero} />
                <Route exact path="/puntaje" component={Puntaje} />
                <Route exact path="/trivia" component={Trivia} />
                <Route exact path="/tablapuntajes" component={TablaPuntajes} />
              </Switch>
          </Router>
        </Container>
      </TriviadorContext>
    </>
  );
}

export default Trivador;


/*
                <Route exact path="/productos" 
                       render={ () => (
                          <Productos 
                            productos={productos}
                            guardarRecargarProductos={guardarRecargarProductos}
                          />
                       ) } 
                  />
*/
