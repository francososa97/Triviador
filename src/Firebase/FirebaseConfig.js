import firebase from "firebase/app";
import 'firebase/auth'
import "firebase/firestore";
import trivias from '../Helpers/PreguntasTrivia';

const firebaseConfig = {
  apiKey: "AIzaSyDh44Totr9SHhPBkG-uepbgdzNK5GiUVNw",
  authDomain: "puntajetrivias.firebaseapp.com",
  projectId: "puntajetrivias",
  storageBucket: "puntajetrivias.appspot.com",
  messagingSenderId: "678303257113",
  appId: "1:678303257113:web:b20990406d56f157d85088",
  measurementId: "G-87B8B6478V"
};

const googleProvider= new firebase.auth.GoogleAuthProvider()

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


export { firebase, db, googleProvider };