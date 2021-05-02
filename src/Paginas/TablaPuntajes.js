import React,{useContext,useState,useEffect} from 'react';
import { db } from '../Firebase/FirebaseConfig';
import {TriviadorContext} from '../Context/TriviadorContext';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


const VistaPuntajes = () => {

    const { usuario,puntaje,duracionTrivia}  = useContext(TriviadorContext);

    const [mejoresPuntajes,SetMejoresPuntajes]= useState([]);
    const [rellamado,SetRellamado]= useState(true);

    const classes = useStyles();


    const ObtenerMEjoresPuntajes = (puntajesUsuarios) => {
        let mejoresPuntajes = [];
        puntajesUsuarios.sort((a, b) => a.fecha - b.fecha);
        mejoresPuntajes = [...puntajesUsuarios];
        mejoresPuntajes = mejoresPuntajes.slice(0,9);
        SetMejoresPuntajes(mejoresPuntajes);
    }

    useEffect(() => {

        let dateActualy= new Date();
        let dateConsultation = `${dateActualy.getDate()}/${dateActualy.getMonth()+1}/${dateActualy.getFullYear()} ${dateActualy.getHours()}:${dateActualy.getUTCMinutes()}`;

        let puntajeUsuario={
            "nombre":usuario,
            "puntaje":puntaje,
            "duracion":duracionTrivia,
            "fecha":dateConsultation,
        }
        db.collection(`puntajes`).add(puntajeUsuario);
  
        const puntajeReferencia = db.collection(`puntajes`);
        puntajeReferencia.onSnapshot((snap) => {
            let dataBaseOperation = [];
            snap.forEach((snapChild) => {
                dataBaseOperation.push(snapChild.data());
            });
            let puntajesUsuarios = dataBaseOperation;
            ObtenerMEjoresPuntajes(puntajesUsuarios);
            SetRellamado(false);
        });

    },[rellamado]);

    const MejoresPuntajes = (puntajesUsuarios) => {

        const {puntajes} = puntajesUsuarios;
        return(
            <>  
                {puntajes.length === 0 ? <TableRow key={0}><TableCell align="right">No tenemos ningun Puntaje registrado</TableCell></TableRow>
                :   puntajes.map(puntaje =>
                    {
                        return(
                            <TableRow key={puntaje.name}>
                                <TableCell component="th" scope="row">{puntaje.nombre}</TableCell>
                                <TableCell align="right">{puntaje.puntaje}</TableCell>
                                <TableCell align="right">{puntaje.duracion}</TableCell>
                            </TableRow>
                        );
                    })
                }
                
            </>
        )
    }
  
    return(
      <>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
            <Typography className="titulo" variant="h1" gutterBottom>
                Mejores puntajes
            </Typography>
            <Typography className="titulo" variant="h" gutterBottom>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Usuario</TableCell>
                                <TableCell align="right">Puntaje</TableCell>
                                <TableCell align="right">Duracion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <MejoresPuntajes puntajes={mejoresPuntajes} />
                         
                        </TableBody>
                    </Table>
                </TableContainer>
            </Typography>
                <NavLink to='/' className="nav-link" activeClassName="active"> <p className="white-text"> Volver al inicio</p></NavLink> 
        </Typography>
      </>
    );
  }
  export default VistaPuntajes;