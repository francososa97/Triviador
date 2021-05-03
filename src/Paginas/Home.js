import React,{useContext,useState,useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import {TriviadorContext} from '../Context/TriviadorContext';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useStyles from '../Estilos/useStyles.js';

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


    const classes = useStyles();

    return(
        <div className="home-paper">
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography className="titulo-home" component="h1" variant="h4" align="center">
                Triviador
              </Typography>
              <Typography  className="subtitulo-home"  component="h6" variant="h6" gutterBottom>
                Ingrese su nombre para comenzar la trivia.
              </Typography>
              <React.Fragment>
                  <React.Fragment>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                            required
                            variant="outlined"
                            fullWidth
                            name="Tu nombre"
                            label="Tu nombre"
                            value={usuario} 
                            onChange={(e) =>SetearNombre(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </React.Fragment>
              </React.Fragment>
            </Paper>
            <NavLink to='/genero' className="nav-link" activeClassName="active"> 
                <Button
                    type="submit"
                    fullWidth
                    variant={podesContinuar ?"contained":"disabled"}
                    color="primary"
                    className={classes.submit}
                >
                    Comenzar
                </Button>
            </NavLink>
          </main>
        </div>
    )
}
export default Home;