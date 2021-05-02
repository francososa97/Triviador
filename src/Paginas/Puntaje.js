import React,{useContext,useEffect,useState} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import {TriviadorContext} from '../Context/TriviadorContext';
import Button from '@material-ui/core/Button';



const Puntaje = () =>{

    const { usuario,puntaje,tiempoInicial,duracionTrivia,SetDuracionTrivia}  = useContext(TriviadorContext);

    useEffect(()=>{
        let tiempoFinal= new Date();
        let tiempoDuracion = `${tiempoFinal.getMinutes() - tiempoInicial.getMinutes()} : ${tiempoFinal.getSeconds() - tiempoInicial.getSeconds()}`
        SetDuracionTrivia(tiempoDuracion);
    })
    return(
        <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
            <Typography className="titulo" variant="h1" gutterBottom>
                Puntaje
            </Typography>
            <Typography className="titulo" variant="h" gutterBottom>
                {`El puntaje de ${usuario} fue de ${puntaje}`}
            </Typography>
                <Button variant="contained" color="primary" disableElevation>
                    <NavLink to='/tablapuntajes' className="nav-link" activeClassName="active"> <p className="white-text"> Ver tabla de puntajes</p></NavLink> 
                </Button>
        </Typography>
  </Container>
    )
}
export default Puntaje;