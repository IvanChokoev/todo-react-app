import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyCqV3plNRpgRnFHTIsBtGvUeM7O5zqlvEg",
    authDomain: "my-app-2022-1414d.firebaseapp.com",
    databaseURL: "https://my-app-2022-1414d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "my-app-2022-1414d",
    storageBucket: "my-app-2022-1414d.appspot.com",
    messagingSenderId: "209363898441",
    appId: "1:209363898441:web:4cb280c5a871c7b1a32f98"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export default db ;

