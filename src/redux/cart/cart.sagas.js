import { takeLatest, all, call, put } from "redux-saga/effects";
import UserActionTypes from "../user/user.types";
import { clearCart } from "./cart.actions";

function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onClearCart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSaga() {
  yield all([call(onClearCart)]);
}
