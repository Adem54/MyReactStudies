import { useState, useEffect, FormEventHandler } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddEdit.css";
import { useAddContactMutation,useGetContactInfoQuery,useUpdateContactMutation } from "../services/contactApi";

const initialState = {
  name: "",
  email: "",
  contact: "",
};


const AddEdit = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { name, email, contact } = formValue;
  const navigate = useNavigate();
const [editMode, setEditMode]=useState(false); 
const {id}=useParams();

//id nin undefined gelme ihtimalinden dolayi, typescript problem cikariyor, daha dogrusu id gelmezse sonuc !undefined gelebiliyor bu durumlarda
//! cok efektif bir cozum sunmus oluyor aslinda bize...
const {data,error}=useGetContactInfoQuery(id!);//Burda zaten dogrudan id sini verdigmz detay data yi aliyoruz..
const [addContact]=useAddContactMutation();
const [updateContact]=useUpdateContactMutation();
 //query,getData islemleri obje icinde gelirken, Mutation methodlari dizi olarak geliyor ve o dizi icindeki methodu kullanacagimz icin destructing i dizi ile yapioruz burda

 useEffect(()=>{
if(error && id){
  toast.error("Something went wrong")
}
 },[error])

//BURASI COOK ONEMLI BESTPRACTISE...
 useEffect(()=>{
if(id){//Eger kullanici edit butonuna tiklamis ise, ona gore id ile birlikte, url e dusuyor o zaman da component mount olur olmaz, mode u edit yapiyoruz ki bu edit i kullanarak, dinamik bir sekilde submit islemini eger edit ise, update et degil ise add islemini yap diyebilmis oluyoruz..
  setEditMode(true);
  if(data){
    setFormValue({...data})//data bizim edit ile gelen id ye ait contact objesidir
  }else{
    setEditMode(false);
    setFormValue({...initialState});
  }
}
},[id,data])
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  //Bu da guzel bir kullanim, alalim buray....
  const canSave=Boolean(name) && Boolean(email) && Boolean(contact);

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!canSave){
      toast.error("Please provide value into each input field");//Bestpractise...
    }else{
      if(!editMode){
        await addContact(formValue)
      //  await addContact(formValue).unwrap();//Burasi incelenebilir, unwrap yapmadan once, bu await beklemeden asagi iniyordu, gorevini tam yapmiyordu ama unwrap kullandiktan sonra beklemeye basladi, yani biz ana sayfaya gittimgizde sayfayin yenilemeden ekledigmiz datayi  simdi goruyoruz ama unwrap tan once goremiyorduk.... If you need to access the error or success payload immediately after a mutation, you can chain .unwrap()..COOK ONEMLI...
      //unwrap ile gecici olarak cozmus idik ama esas problemimiz, contactApi icerisinde TagTypes lari yazmamamiz idi bu problemi cozen bizim contacApi icerisindeki TagTypes lari girmemiz oluyor.... BUU COOK ONEMLIDIR....Sayfalarin yenilenmesini sagliyor...
      navigate("/");
      toast.success("Contact Added Successfully");
      }else{
        await updateContact(formValue)
        navigate("/");
      toast.success("Contact Updated Successfully");
      }
    }
  };
  //hata ve successs mesajlari icin gercekten guzel bir yontem toast u kullanmak
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Name..."
          value={name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email..."
          value={email}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter Contact no..."
          value={contact}
          onChange={handleInputChange}
        />
        <input type="submit" value={editMode ? "Update": "Add"} />
      </form>
    </div>
  );
};

export default AddEdit;
