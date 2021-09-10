import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyBpfOUns2M260j-jrER9N8l-Daf0649lNY",
  authDomain: "crwn-db-76349.firebaseapp.com",
  projectId: "crwn-db-76349",
  storageBucket: "crwn-db-76349.appspot.com",
  messagingSenderId: "380624096565",
  appId: "1:380624096565:web:7921f0b47bc219e714907c",
  measurementId: "G-TFTRJRK671",
};

export const createUserProfileDocument = async (
  userAuth,
  ...additionalData
) => {
  if (!userAuth) return;

  const db = getFirestore();
  const docRef = doc(db, `users/${userAuth.uid}}`);
  const docSnapshot = await getDoc(docRef);
  if (!docSnapshot.exists()) {
    const { email, displayName } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(docRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error);
    }
  }
  return docRef;
};

initializeApp(config);

export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prombt: "select_account" });

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};
