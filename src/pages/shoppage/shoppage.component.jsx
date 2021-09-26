import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import "./shoppage.styles.scss";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import CollectionsOverviewContainer from "../../components/collections-overview/collection-overview.container";
import CollectionsPageContainer from "../collection/collection-page.container";

class ShopPage extends React.Component {
  // Used redux-thunk instead and moved the code into shop.reducer
  // ------------------------------------------------------------------
  // state = {
  //   isLoading: true,
  // };

  // unsubscribeFromSnapshot = null;

  // async componentDidMount() {
  //   const collectionRef = collection(db, "collections");

  //   // Promise pattern
  //   await getDocs(collectionRef).then((snapShot) => {
  //     const appropriateCollections = convertCollectionsSnapshotToMap(snapShot);
  //     this.props.updatedCollections(appropriateCollections);
  //     this.setState({ isLoading: false });
  //   });

  //   // Observer/Observable pattern
  //   //   this.unsubscribeFromSnapshot = onSnapshot(collectionRef, (snapShot) => {
  //   //     const appropriateCollections = convertCollectionsSnapshotToMap(snapShot);
  //   //     this.props.updatedCollections(appropriateCollections);
  //   //     this.setState({ isLoading: false });
  //   //   });
  // }

  // componentWillUnmount() {
  //   // Observer/Observable pattern
  //   // this.unsubscribeFromSnapshot();
  // }
  // ------------------------------------------------------------------

  async componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionsPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
