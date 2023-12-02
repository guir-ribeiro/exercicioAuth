import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyBC0PcTs2UnNGggI-rg3PVy0PgKjMpJeIY",
    authDomain: "sujeito-eb352.firebaseapp.com",
    databaseURL: "https://sujeito-eb352-default-rtdb.firebaseio.com",
    projectId: "sujeito-eb352",
    storageBucket: "sujeito-eb352.appspot.com",
    messagingSenderId: "147910218364",
    appId: "1:147910218364:web:10360f6b694255252e6ff9",
    measurementId: "G-Z98GD34337"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;