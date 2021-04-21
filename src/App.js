import React,{useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Paginas/Home.js';
import Puntaje from './Paginas/Puntaje.js';
import Trivia from './Paginas/Trivia.js';
import Genero from './Paginas/Genero.js';

const App = () => {

  const [generoSeleccionado,SetGeneroSeleccionado] = useState("");
  return(
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Router>
            <Switch>
            <Route exact path="/" 
                       render={ () => (
                          <Home/>
                       ) } 
                  />
            <Route exact path="/genero" 
              render={ () => (
                <Genero
                SetGeneroSeleccionado={SetGeneroSeleccionado}
                />
              ) } 
            />
            <Route exact path="/puntaje" 
              render={ () => (
                <Puntaje/>
              ) } 
            />
            <Route exact path="/trivia" 
              render={ () => (
                <Trivia
                  generoSeleccionado={generoSeleccionado}
                />
              ) } 
            />
            </Switch>
        </Router>
      </Container>
    </>

  );

}

export default App;
