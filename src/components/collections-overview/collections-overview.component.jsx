import "./collections-overview.styles.scss";
import CollectionsPreview from "../../components/collections-preview/collection-preview.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollectionsAsAnArray } from "../../redux/shop/shop.selectors";

const CollectionsOverview = ({ collections }) => {
  return collections.map(({ id, ...props }) => (
    <CollectionsPreview key={id} {...props} />
  ));
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsAsAnArray,
});

export default connect(mapStateToProps)(CollectionsOverview);
