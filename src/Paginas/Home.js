import React,{useContext,useState,useEffect} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import {TriviadorContext} from '../Context/TriviadorContext';
import Button from '@material-ui/core/Button';


import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';


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

    const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(3),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));

      const classes = useStyles();

    return(
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Triviador
        </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <TextField
                color = "secondary"
                id="name"
                variant="outlined"
                required
                fullWidth
                name="Tu nombre"
                label="Tu nombre"
                type="Tu nombre"
                id="name"
                value={usuario} 
                onChange={(e) =>SetearNombre(e.target.value)}
              />
            </Grid>
            </Grid>
            {  podesContinuar ?
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Comenzar
                </Button>
                    
                    :
                <Button
                type="submit"
                fullWidth
                variant="disabled"
                color="primary"
                className={classes.submit}
                >
                    Comenzar
                </Button>

            }
          </form>
        </div>
      </Container>
  
    )
}
export default Home;


/*
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField id="name" label="Tu nombre" value={usuario} onChange={(e) =>SetearNombre(e.target.value)}/>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>




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

*/