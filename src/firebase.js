import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD70BuTTyUNu9D88P0DHa_6I0KWVDbPmv4",
  authDomain: "react-shopping-app-d4dff.firebaseapp.com",
  projectId: "react-shopping-app-d4dff",
  storageBucket: "react-shopping-app-d4dff.appspot.com",
  messagingSenderId: "948812494727",
  appId: "1:948812494727:web:4c8c17d2159dadbe6ec522",
  measurementId: "G-619NDP0NT7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
