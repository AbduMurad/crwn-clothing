import { UserActionTypes } from "./user.types";

export const googleSigninStart = () => ({
  type: UserActionTypes.GOOGLE_SIGNIN_START,
});

export const signinSuccess = (user) => ({
  type: UserActionTypes.SIGNIN_SUCCESS,
  payload: user,
});
export const signinFailure = (errorMessage) => ({
  type: UserActionTypes.SIGNIN_FAILURE,
  payload: errorMessage,
});

export const emailSigninStart = (user) => ({
  type: UserActionTypes.EMAIL_SIGNIN_START,
  payload: user,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});
export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});
export const signOutFailure = (errorMessage) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: errorMessage,
});

export const signUpStart = (user) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: user,
});
export const signUpSuccess = (user) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: user,
});
export const signUpFailure = (errorMessage) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: errorMessage,
});
