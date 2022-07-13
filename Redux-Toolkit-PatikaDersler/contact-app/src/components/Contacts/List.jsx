import React from "react";
import { useSelector } from "react-redux";
import { contactSelectors, deleteContacts } from "../../redux/contactSlice";
import Item from "./Item";
import { useDispatch } from "react-redux";

const List = () => {
  //contactSelector. deyince bir cok alternatifimiz var initialSTate icinde istedgimz degeri alabilirz
  const contacts = useSelector(contactSelectors.selectEntities);
  //Burda obje icinde
  console.log("contacts: ", contacts);
  const selectAllcontacts = useSelector(contactSelectors.selectAll); //Bu sekilde de dizi icinde veriyor bize datalari
  console.log("selectAllcontacts:", selectAllcontacts);
  const totalCount = useSelector(contactSelectors.selectTotal); //Bize total kayit sayisini veriyor
  /*
   { T0Ng22GdIbNcm13P3aKw7: {id: 'T0Ng22GdIbNcm13P3aKw7', name: 'zeynep'},
    VlmugVaBr4iZMal_W3MQu: {id: 'VlmugVaBr4iZMal_W3MQu', name: 'adem'},
    d57wYIyJCYG3SvC8obMA3: {id: 'd57wYIyJCYG3SvC8obMA3', name: 'zehra'},
    }
    */
  /* */
  const dispatch = useDispatch();
  const handleRemoveAll = () => {
    if (confirm("Are you sure?")) dispatch(deleteContacts());
  };
  return (
    <div>
      {selectAllcontacts.map((contact) => (
        <Item key={contact.id} contact={contact} />
      ))}
      {/*EGer 1 veya 1 den fazla eleman yok ise deleteAll butonunu yok edelim
      Boyle seyler kucuk basit seyler gibi ama User experience acisindan cook kullanislidir...
      */}
      {totalCount > 0 && (
        <button className="btn" onClick={handleRemoveAll}>
          <i className="fa fa-trash"></i> ClearAll
        </button>
      )}
    </div>
  );
};

export default List;
