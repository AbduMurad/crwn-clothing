import { Link } from "react-router-dom";
import CollectionItem from "../collection-item/collection-item.component";
import "./collection-preview.styles.scss";

const CollectionsPreview = ({ title, items, routeName }) => {
  return (
    <div className="collection-preview">
      <Link to={routeName} className="title">
        {title}
      </Link>
      <div className="preview">
        {items
          .filter((item, index) => index < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default CollectionsPreview;
