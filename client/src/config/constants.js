import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDdA-wN1hL5GuoktyMwgMC-Egi1oKTkVOI",
  authDomain: "fun-food-friends-3a96a.firebaseapp.com",
  databaseURL: "https://fun-food-friends-3a96a.firebaseio.com",
}

firebase.initializeApp(config)

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;