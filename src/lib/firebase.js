// <!-- The core Firebase JS SDK is always required and must be listed first -->
{
  /* <script src="https://www.gstatic.com/firebasejs/8.2.8/firebase-app.js"></script>   */
}

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

export { firebase, FieldValue };
