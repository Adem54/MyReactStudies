import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editContact } from "../../redux/contactSlice";
import { useNavigate,Navigate } from "react-router-dom";
const EditForm = ({ contact }) => {
  if(!contact)return <Navigate to="/" />
  const [number, setNumber] = useState(contact.phone_number);
  const [name, setName] = useState(contact.name);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //BESTPRACTISE..
  //Problem:Sayfa yenilenince datalar uctugu icin, bizim uzerinde oldugmuz id yi bulamiyor
  //o zaman da contact artik undefined geliyor ve hata aliyoruz...
  //Bunun onune gecmek icin once contact i sorgula eger contact yok ise o zaman bizi
  //contact ekledigmiz ana sayfaya yonlendirsin Navigate react-router-dom u ile
  //  if(!contact)return <Navigate to="/" />

  //EventpreventDefault u sakin unutma  yoksa hata aliyoruz...
  const handleSubmit = (e) => {
    e.preventDefault();
    //BUUU COOK ONEMLI....
    if (!name || !number) return false; //Eger kullanici buralara data girmemis ise
    //o zaman uygulamayi durdursun
    dispatch(
      editContact({
        id:contact.id,
        changes: {
          //changes obj icine hangi alanlar degisti ise onlar verilir
          name,
         phone_number: number,
        },
      })
    );
     navigate("/");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
          style={{ height: "1.4rem", marginRight: "0.5rem" }}
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          style={{ height: "1.4rem", marginRight: "0.5rem" }}
          placeholder="phone number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditForm;
