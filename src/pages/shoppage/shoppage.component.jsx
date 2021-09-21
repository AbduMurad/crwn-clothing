import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection-page.component";
import "./shoppage.styles.scss";

import {
  db,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { collection, onSnapshot, getDocs } from "firebase/firestore";

import { updatedCollections } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectCollections } from "../../redux/shop/shop.selectors";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    isLoading: true,
  };

  unsubscribeFromSnapshot = null;

  async componentDidMount() {
    const collectionRef = collection(db, "collections");

    // Promise pattern
    await getDocs(collectionRef).then((snapShot) => {
      const appropriateCollections = convertCollectionsSnapshotToMap(snapShot);
      this.props.updatedCollections(appropriateCollections);
      this.setState({ isLoading: false });
    });

    // Observer/Observable pattern
    //   this.unsubscribeFromSnapshot = onSnapshot(collectionRef, (snapShot) => {
    //     const appropriateCollections = convertCollectionsSnapshotToMap(snapShot);
    //     this.props.updatedCollections(appropriateCollections);
    //     this.setState({ isLoading: false });
    //   });
  }

  componentWillUnmount() {
    // Observer/Observable pattern
    // this.unsubscribeFromSnapshot();
  }

  render() {
    const { match } = this.props;
    const { isLoading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={isLoading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  collections: selectCollections(state),
});

const mapDispatchToProps = (dispatch) => ({
  updatedCollections: (collections) =>
    dispatch(updatedCollections(collections)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
