import ShopActionTypes from "./shop.types";
import {
  db,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTION_START,
});

export const fetchCollectionsSuccess = (collections) => ({
  type: ShopActionTypes.FETCH_COLLECTION_SUCCEED,
  payload: collections,
});

export const fetchCollectionFailed = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTION_FAILED,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = collection(db, "collections");
    dispatch(fetchCollectionsStart());
    // Promise pattern
    getDocs(collectionRef)
      .then((snapShot) => {
        const appropriateCollections =
          convertCollectionsSnapshotToMap(snapShot);
        dispatch(fetchCollectionsSuccess(appropriateCollections));
      })
      .catch((error) => dispatch(fetchCollectionFailed(error.message)));
  };
};
