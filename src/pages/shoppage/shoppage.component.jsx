import react from "react";
import CollectionsPreview from "../../components/collections-preview/collection-preview.component";
import SHOP_DATA from "./shoppage.data";
import "./shoppage.styles.scss";

class ShopPage extends react.Component {
  constructor() {
    super();
    this.state = {
      collections: SHOP_DATA,
    };
  }

  render() {
    return SHOP_DATA.map(({ id, ...props }) => (
      <CollectionsPreview key={id} {...props} />
    ));
  }
}

export default ShopPage;
