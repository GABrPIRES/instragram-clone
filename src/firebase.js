import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCMf9uF1DweeC-9M3nodMPQQTR1FIlsd5A",
    authDomain: "instagram-clone-curso-ede6b.firebaseapp.com",
    projectId: "instagram-clone-curso-ede6b",
    storageBucket: "instagram-clone-curso-ede6b.appspot.com",
    messagingSenderId: "262358788678",
    appId: "1:262358788678:web:7dbd8895f3459583493847",
    measurementId: "G-VXSLGPEYKK"
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();

export { db, auth, storage, functions };

