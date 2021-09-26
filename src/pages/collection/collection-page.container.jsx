import collectionPageComponent from "./collection-page.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectShouldWeLoadSpinner } from "../../redux/shop/shop.selectors";

const mapStateToProps = createStructuredSelector({
  isLoading: selectShouldWeLoadSpinner,
});

const CollectionsPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(collectionPageComponent);

export default CollectionsPageContainer;
