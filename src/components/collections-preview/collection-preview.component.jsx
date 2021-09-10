import react from "react";
import CollectionItem from "../collection-item/collection-item.component";
import "./collection-preview.styles.scss";

const CollectionsPreview = ({ title, items }) => {
  return (
    <div className="collection-preview">
      <h1 className="title">{title}</h1>
      <div className="preview">
        {items
          .filter((item, index) => index < 4)
          .map(({ id, name, ...otherProps }) => (
            <CollectionItem key={id} {...otherProps} />
          ))}
      </div>
    </div>
  );
};

export default CollectionsPreview;