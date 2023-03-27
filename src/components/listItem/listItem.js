import React from "react";
import './listItem.css';

const ListItem = ({imgPath, label}) => {
  let placeholderImage = '';

  try {
    placeholderImage = require(`../../assets/${imgPath}`);
  } catch {
    placeholderImage = require(`../../assets/placeholder_for_missing_posters.png`)
  }

  return (
    <div className="list_item">
      <img className="image" src={placeholderImage} alt={imgPath}></img>
      <div className="img_label">{label}</div>
    </div>
  );
}

export default ListItem;