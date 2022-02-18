import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAv900SumUA-T-xckO75ecICdDffHamgn8",
  authDomain: "letmeask-dfffa.firebaseapp.com",
  databaseURL: "https://letmeask-dfffa-default-rtdb.firebaseio.com",
  projectId: "letmeask-dfffa",
  storageBucket: "letmeask-dfffa.appspot.com",
  messagingSenderId: "724526857899",
  appId: "1:724526857899:web:c42e1aa674db4c193441ee"
};

  firebase.initializeApp(firebaseConfig);

    const database = firebase.database();
    const auth = firebase.auth();

  export { firebase, auth, database }