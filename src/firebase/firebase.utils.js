import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

const config = {
  apiKey: "AIzaSyBpfOUns2M260j-jrER9N8l-Daf0649lNY",
  authDomain: "crwn-db-76349.firebaseapp.com",
  projectId: "crwn-db-76349",
  storageBucket: "crwn-db-76349.appspot.com",
  messagingSenderId: "380624096565",
  appId: "1:380624096565:web:7921f0b47bc219e714907c",
  measurementId: "G-TFTRJRK671",
};

initializeApp(config);

export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prombt: "select_account" });

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};
