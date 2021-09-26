import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
// import { collection, writeBatch, getDocs, addDoc } from "firebase/firestore";

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
export const db = getFirestore();

export const createUserProfileDocument = async (
  userAuth,
  ...additionalData
) => {
  if (!userAuth) return;

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

// Try to make firebase assign random IDs, Abdu ### Done
//--------------------------------------------
// export const addCollectionAndItsDocuments = async (
//   collectionKey,
//   objectsToAdd
// ) => {
//   const batch = writeBatch(db);
//   objectsToAdd.forEach(async (element, index, objectsToAdd) => {
//     const newDocRef = await addDoc(collection(db, collectionKey), element);
//     batch.set(newDocRef, element);
//     if (index === objectsToAdd.length - 1) {
//       await batch.commit();
//     }
//   });

// await batch.commit();
// };
//--------------------------------------------

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const convertCollectionsSnapshotToMap = (collectionSnapshot) => {
  const transformedCollection = collectionSnapshot.docs.map((collection) => {
    const { title, items } = collection.data();
    return {
      title,
      items,
      routeName: encodeURI(`shop/${title.toLowerCase()}`),
      id: collection.id,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    const title = collection.title.toLowerCase();
    accumulator[title] = collection;
    return accumulator;
  }, {});
};

export const auth = getAuth();

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prombt: "select_account" });

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};
