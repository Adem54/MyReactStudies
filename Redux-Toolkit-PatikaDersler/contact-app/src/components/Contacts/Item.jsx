import React from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactSlice";
import {Link} from "react-router-dom";
const Item = ({ contact }) => {
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    if (confirm("are you sure")) {
      dispatch(deleteContact(id));
    }
  };
  return (
    <>
      {" "}
      <div>
        <span>{contact.name} </span>
        <span>{contact.phone_number}</span>
        <button className="btn" onClick={() => handleRemove(contact.id)}>
          <i className="fa fa-close"></i>
        </button>
        <button className="btn">
          <Link to={`/edit/${contact.id}`}>
            <i className="fa fa-edit"></i>
          </Link>
        </button>
      </div>
    </>
  );
};

export default Item;
