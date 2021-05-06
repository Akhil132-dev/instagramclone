import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCrLb_VvLhp4BK6UGXPgEwSvablVis60lM",
    authDomain: "tinder-clone-d3782.firebaseapp.com",
    databaseURL: "https://tinder-clone-d3782.firebaseio.com",
    projectId: "tinder-clone-d3782",
    storageBucket: "tinder-clone-d3782.appspot.com",
    messagingSenderId: "621041266591",
    appId: "1:621041266591:web:af68ffc7bebf37415597aa",
    measurementId: "G-MNHDXKDL2L"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };