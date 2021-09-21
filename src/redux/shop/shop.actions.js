import ShopActionTypes from "./shop.types";

export const updatedCollections = (collections) => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS,
  payload: collections,
});
