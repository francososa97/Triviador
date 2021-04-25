import React,{useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Paginas/Home.js';
import Puntaje from './Paginas/Puntaje.js';
import Trivia from './Paginas/Trivia.js';
import Genero from './Paginas/Genero.js';
import TriviadorContext from './Context/TriviadorContext';


const Trivador = () => {

  return(
    <>
      <TriviadorContext>
        <CssBaseline />
        <Container maxWidth="sm">
          <Router>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/genero" component={Genero} />
                <Route exact path="/puntaje" component={Puntaje} />
                <Route exact path="/trivia" component={Trivia} />
              </Switch>
          </Router>
        </Container>
      </TriviadorContext>
    </>
  );
}

export default Trivador;
