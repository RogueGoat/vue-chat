//we use this to reference firebase because it's installed vs called
//import firebase
import firebase from 'firebase'
//import firestore
import firestore from 'firebase/firestore'


// Initialize Firebase
var config = {
  apiKey: "AIzaSyBbaZ-5oWgF-7MU2clJDuk5WmimQxna6wA",
  authDomain: "proof-chat-vue.firebaseapp.com",
  databaseURL: "https://proof-chat-vue.firebaseio.com",
  projectId: "proof-chat-vue",
  storageBucket: "proof-chat-vue.appspot.com",
  messagingSenderId: "462978650656"
};
const firebaseApp = firebase.initializeApp(config);
//this negates errors thrown by updates in firebase for timestamps - just a fix for firebase issues in the console
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();
