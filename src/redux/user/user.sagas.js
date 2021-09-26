import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  signinFailure,
  signinSuccess,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
  signUpSuccess,
} from "./user.actions";
import UserActionTypes from "./user.types";

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";
import { getDoc } from "@firebase/firestore";
import { clearAllCart } from "../cart/cart.actions";

function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield getDoc(userRef);
    yield put(
      signinSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data(),
      })
    );
  } catch (error) {
    yield put(signinFailure(error.message));
  }
}

// ######### GOOGLE
export function* signinWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth, googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signinFailure(error.message));
  }
}

export function* onGoogleSigninStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, signinWithGoogle);
}

// ######### EMAIL
function* signinWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield signInWithEmailAndPassword(auth, email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signinFailure(error.message));
  }
}

export function* onEmailSigninStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGNIN_START, signinWithEmail);
}

// ######### USER SESSION
function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signinFailure(error.message));
  }
}

export function* checkUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

//  ######### USER SIGN OUT
function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error.message));
  }
}

export function* onUserSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

// ############# USER SIGN UP

function* signUp({ payload: { displayName, email, password } }) {
  try {
    const { user } = yield createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    user.displayName = displayName;
    yield createUserProfileDocument(user);
    yield put(signUpSuccess(user));
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signUpFailure(error.message));
  }
}

export function* onUserSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

// ############# USER SAGA
export function* userSagas() {
  yield all([
    call(onGoogleSigninStart),
    call(onEmailSigninStart),
    call(checkUserSession),
    call(onUserSignOutStart),
    call(onUserSignUpStart),
  ]);
}
