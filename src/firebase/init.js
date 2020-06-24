import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDo1sBWbliGWrWa_wvgHHpyP-FveVBDDf0",
  authDomain: "resepi-c1243.firebaseapp.com",
  databaseURL: "https://resepi-c1243.firebaseio.com",
  projectId: "resepi-c1243",
  storageBucket: "resepi-c1243.appspot.com",
  messagingSenderId: "820341944328",
  appId: "1:820341944328:web:51595c40a12a541d7b21bd",
  measurementId: "G-10V7YVRGJH",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
