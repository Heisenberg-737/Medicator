import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyC3jT8YdgfhOqImIi7ws2cjMF-fszBCXOw",
  authDomain: "vaccinometer-1907a.firebaseapp.com",
  projectId: "vaccinometer-1907a",
  storageBucket: "vaccinometer-1907a.appspot.com",
  messagingSenderId: "278242398461",
  appId: "1:278242398461:web:0c0d3aa9bdca221ab42e94",
  measurementId: "G-NRVCF5TC07",
});

export const auth = app.auth();
export default app;
