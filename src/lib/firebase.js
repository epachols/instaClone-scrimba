// import { seedDatabase } from "../seed.js";

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyCR918eXld13xuetC4KYfJtlziMpcnp_Zo",
  authDomain: "instaclone-scrim-ev.firebaseapp.com",
  databaseURL: "https://instaclone-scrim-ev-default-rtdb.firebaseio.com",
  projectId: "instaclone-scrim-ev",
  storageBucket: "instaclone-scrim-ev.appspot.com",
  messagingSenderId: "591566058071",
  appId: "1:591566058071:web:c04445bc69f8f90a87e912",
};

const firebase = window.firebase.initializeApp(config);

const { FieldValue } = window.firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
