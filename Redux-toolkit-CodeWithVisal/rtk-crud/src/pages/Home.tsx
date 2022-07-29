import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Contact } from "../model/contact.model";
import { useGetContactsQuery,useDeleteContactMutation } from "../services/contactApi";
import "./Home.css";

const Home = () => {

  const [deleteContact]=useDeleteContactMutation();
  const {
    data: contacts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetContactsQuery();

  // console.log("contacts: ", contacts); //Bu sekilde data ya erisiyoruz
  // console.log("isLoading: ", isLoading); //Kendisi otomatik olarak zaten, isLoading true olarak gelir,data yi load ederken, data geldikten sonra false a doner
  // console.log("isSuccess: ", isSuccess); //data loading olurken false, dur , data geldginde true ya doner
  // console.log("isError: ", isError); //false olarak gelir, data loading asamasinda, eger data gelirken bir hata cikar data gelmez ise true ya doner
  // console.log("error: ", error);

  //Error islemini handle etme ile ilgili bestpractise, bu sekilde ele alabiliriz, cok iyi bu...
  //toast u kullanabilmek icin App.js icinde kutuphaneyi import etmek gerek..
  useEffect(() => {
    if (error) {
      toast.error("Something went wront");
    }
  }, [error]);

//Yaptigimiz Crud operasyonlarinda dikkat edilecek hususlardan bir tanesi de, component tarafinda yaparken, de async, await kullaniyoruz...bu onemli..

//Bu da onemli bir bestpractise dir buna dikkat edelim....
const handleDelete=async(id:Contact["id"])=>{
let conf=window.confirm("Are you sure that you wanted to delete that contact ?");
if(conf){
 await deleteContact(Number(id)).unwrap();
  //Buralara dikkat...Number a cevirdikk...
  toast.success("Contact deleted successfully");
}
}
//COOK ONEMLI....
//Burda dikkat etmemiz gereken bir problemimiz var biz silem islemini gerceklestiriyoruz , silme islemi gerceklesiyor ama biz, onu, sayfamiz render edildigi zaman gorebiliyoruz boyle bir eksiklik var bunun sebebi, bizim, contactApi icerisinde yaptgimz islemlerde TagTypes i kullanmadigimzdan dolayi....

  let content;
  if (isLoading) {
    content = <h2>Loading...</h2>;
  } else if (isSuccess) {
    content = (
      <div style={{ marginTop: "100px" }}>
        <Link to="/addContact">
          <button className="btn btn-add">Add Contact</button>
        </Link>
        <br />
        <br />
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>ID</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Contact</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts?.map((contact: Contact, index: number) => {
              return (
                <tr key={contact.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.contact}</td>
                  <td>
                    {" "}
                    <Link to={`/editContact/${contact.id}`} >
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button className="btn btn-delete" onClick={()=>handleDelete(contact.id)}>Delete</button>
                    <Link to={`/info/${contact.id}`} >
                      {/*Burasi detay bilgisi */}
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  //error islemini spesifik bir sekilde handle edecegiz, react-toastify ile notification verecegiz..
  //   else if (isError) {
  //     content = <h2>{error as any}</h2>;
  //   }
  return <>{content}</>;
};

export default Home;
