import React from "react";
import { Link } from "react-router-dom";
const Item = ({ item }) => {
  return (
    <>
      <div>
        <Link to={`/quotes/${item.quote_id}`}>
          <q> {item.quote}</q>
          <strong>{item.author}</strong>
        </Link>
        <br />
        {JSON.stringify(item)}
      </div>
    </>
  );
};

export default Item;
