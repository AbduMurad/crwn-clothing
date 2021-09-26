import { takeEvery, put, call } from "redux-saga/effects";
import { fetchCollectionsSuccess, fetchCollectionFailed } from "./shop.actions";
import ShopActionTypes from "./shop.types";
import {
  db,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";

function* fetchCollectionsAsync() {
  try {
    const collectionRef = yield collection(db, "collections");
    const snapshot = yield getDocs(collectionRef);
    const appropriateCollections = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(appropriateCollections));
  } catch (error) {
    console.log("error");
    yield put(fetchCollectionFailed(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTION_START,
    fetchCollectionsAsync
  );
}
