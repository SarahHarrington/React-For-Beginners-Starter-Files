import Rebase from 're-base';
import firebase from 'firebase';


// This creates the firebase app
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBV2Gg_W43rxGmXWTkAwgkuO4p7mlnDhX4",
    authDomain: "catch-of-the-day-sarahdoestech.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-sarahdoestech.firebaseio.com",
})

// this creates the rebase bindings
const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;