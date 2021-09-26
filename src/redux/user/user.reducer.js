import { UserActionTypes } from "../user/user.types";

const INITIAL_STATE = {
  currentUser: null,
  isSigningin: false,
  isSigningOut: false,
  errorMessage: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.GOOGLE_SIGNIN_START:
      return { ...state, isSigningin: true };
    case UserActionTypes.EMAIL_SIGNIN_START:
      return { ...state, isSigningin: true };
    case UserActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        isSigningin: false,
        currentUser: action.payload,
        errorMessage: "",
      };
    case UserActionTypes.SIGN_OUT_START:
      return { ...state, isSigningOut: true };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        errorMessage: "",
        isSigningOut: false,
      };
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.SIGNIN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        isSigningin: false,
        errorMessage: action.payload,
        isSigningOut: false,
        isSigningUp: false,
      };
    case UserActionTypes.SIGN_UP_START:
      return {
        ...state,
        isSigningUp: true,
      };
    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
