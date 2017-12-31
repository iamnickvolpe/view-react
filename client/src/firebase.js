import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyDdA-wN1hL5GuoktyMwgMC-Egi1oKTkVOI",
    authDomain: "fun-food-friends-3a96a.firebaseapp.com",
    databaseURL: "https://fun-food-friends-3a96a.firebaseio.com",
    projectId: "fun-food-friends-3a96a",
    storageBucket: "fun-food-friends-3a96a.appspot.com",
    messagingSenderId: "842727730490"
  };
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;