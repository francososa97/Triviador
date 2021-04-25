import React,{useContext} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import {TriviadorContext} from '../Context/TriviadorContext';

const Home = () =>{
    
    return(
        <Container maxWidth="sm">
            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
                <Typography className="titulo" variant="h1" gutterBottom>
                    Home
                </Typography>
                <NavLink 
                        to='/genero'
                        className="nav-link"
                        activeClassName="active"
                    >
                      <p className="white-text">Comenzar</p>
                </NavLink>
            </Typography>

      </Container>
    )
}
export default Home;