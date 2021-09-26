import collectionsOverviewComponent from "./collections-overview.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import WithSpinner from "../with-spinner/with-spinner.component";
import { selectIsFetchingCollections } from "../../redux/shop/shop.selectors";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsFetchingCollections,
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(collectionsOverviewComponent);

export default CollectionsOverviewContainer;
