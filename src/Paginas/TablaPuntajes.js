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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from '../Estilos/useStyles.js';

const VistaPuntajes = () => {

    const { usuario,puntaje,duracionTrivia}  = useContext(TriviadorContext);
    const [mejoresPuntajes,SetMejoresPuntajes] = useState([]);
    const [rellamado,SetRellamado] = useState(true);
    const [Nombre,SetNombre] = useState('');
    const [Email,SetEmail] = useState('');
    const [Feedback,SetFeedback] = useState('');
    const [FeedbackNotificacion,SetNotificacion] = useState(false);
    const [puntajeAgregado,SetPuntajeAgregado] = useState({});

    const classes = useStyles();

    const ObtenerMEjoresPuntajes = (puntajesUsuarios) => {
        puntajesUsuarios.sort((a, b) => b.puntaje - a.puntaje);
        let mejoresPuntajes = [...puntajesUsuarios];
        mejoresPuntajes = mejoresPuntajes.filter(x=> x.puntaje > 0);
        mejoresPuntajes = mejoresPuntajes.slice(0,9);
        SetMejoresPuntajes(mejoresPuntajes);
    }

    const PostPuntajes = () =>{
        let dateActualy= new Date();
        let dateConsultation = `${dateActualy.getDate()}/${dateActualy.getMonth()+1}/${dateActualy.getFullYear()} ${dateActualy.getHours()}:${dateActualy.getUTCMinutes()}`;

        let puntajeUsuario={
            "nombre":usuario,
            "puntaje":puntaje,
            "duracion":duracionTrivia,
            "fecha":dateConsultation,
        }
        let mismoPuntaje = (puntajeAgregado.nombre === puntajeUsuario.nombre) 
                        && (puntajeAgregado.puntaje === puntajeUsuario.puntaje) 
                        && (puntajeAgregado.duracionTrivia === puntajeUsuario.duracionTrivia) 
                        && (puntajeAgregado.dateConsultation === puntajeUsuario.dateConsultation ) 
        ? true : false;

        if(!mismoPuntaje)
        {
            db.collection(`puntajes`).add(puntajeUsuario);
            SetPuntajeAgregado(puntajeUsuario);
        }

    }

    useEffect(() => {

        PostPuntajes();

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
            puntajes.length === 0 
            ? <TableRow key={0}><TableCell align="right">No tenemos ningun Puntaje registrado</TableCell></TableRow>
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
        )
    }

    const EnviarFeedback = () => {
        let feedback = {Nombre,Email,Feedback};
        db.collection(`feedback`).add(feedback);
        SetNombre('');
        SetEmail('');
        SetFeedback('');
        SetNotificacion(true);
    }

    const Alert = (props) => {
        return <MuiAlert className="notificacion-feedback" elevation={6} variant="filled" {...props} />;
    }

    return(
        <>
        <main className={classes.layout}>
                <Typography className="titulo-tabla-puntajes" component="h1" variant="h4" align="center">
                    Top 10 Mejores puntajes
                </Typography>
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

                <NavLink to='/' className="btn-volver" activeClassName="active"> 
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="btn-volver"
                        >
                            Volver al inicio
                        </Button>
                    </NavLink>

            </main>

            <main className={classes.layout}>
                <Paper className={classes.paper}> 
                    <Typography className="titulo-feedback" component="h1" variant="h4" align="center">
                        ¿Nos darías tu opinión de que te parece la aplicación web?
                    </Typography>
                    <Grid className="container-feedback" container spacing={3}> 
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="firstName"
                                name="nombre"
                                label="Nombre (opcional)"
                                fullWidth
                                value={Nombre}
                                onChange={(e) => SetNombre(e.target.value)} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="lastName"
                                label="Email (opcional)"
                                fullWidth
                                value={Email}
                                onChange={(e) =>SetEmail(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <textarea 
                            class="form-control"
                            placeholder="Tu feedback..."
                            id="exampleFormControlTextarea1"
                            rows="3"
                            value={Feedback}
                            onChange={(e) =>SetFeedback(e.target.value)}/>
                    </Grid>

                    {
                        FeedbackNotificacion
                        ? <Alert severity="success">Se envio su Feedback, Gracias!</Alert>
                        :null 
                    }
                    <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="btn-feedback"
                            onClick={() => EnviarFeedback()}
                        >
                            Enviar Feedback
                    </Button>

                   
                </Paper>
            </main>
        </>
    );
  }
  export default VistaPuntajes;