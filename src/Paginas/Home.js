import React,{useContext,useState,useEffect} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import {TriviadorContext} from '../Context/TriviadorContext';
import Button from '@material-ui/core/Button';


const Home = (props) =>{

    const {generosAleatorios,trivias} = props;

    const { usuario,SetUsuario,SetGenerosAleatorios,SetTrivias} = useContext(TriviadorContext);
    
    const [podesContinuar,SetPodesContinuar] = useState(false);

    useEffect(() =>{
        SetGenerosAleatorios(generosAleatorios);
        SetTrivias(trivias);
    });
    
    const SetearNombre = (nombreUsuario) =>{
        SetUsuario(nombreUsuario);
        const puedeContinuar = (nombreUsuario.lenght === 0 || nombreUsuario === "" ) ? false : true;
        SetPodesContinuar(puedeContinuar);
    }

    return(
        <Container maxWidth="sm">
            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
                <Typography className="titulo" variant="h1" gutterBottom>
                    Home
                </Typography>
                <TextField id="name" label="Tu nombre" value={usuario} onChange={(e) =>SetearNombre(e.target.value)}/>
                {
                podesContinuar ?
                    <Button variant="contained" color="primary" href="#contained-buttons">
                        <NavLink 
                            to='/genero'
                            className="nav-link"
                            activeClassName="active"
                        >
                        <p className="white-text">Comenzar</p>
                        </NavLink>
                    </Button>
                :
                <Button variant="contained" disabled>
                    <NavLink 
                        to='/genero'
                        className="nav-link"
                        activeClassName="active"
                    >
                        <p className="white-text">Comenzar</p>
                    </NavLink>
                </Button>
                
                }
            </Typography>

      </Container>
    )
}
export default Home;