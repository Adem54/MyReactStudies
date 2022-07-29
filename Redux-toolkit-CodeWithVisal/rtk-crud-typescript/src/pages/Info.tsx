import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetContactInfoQuery } from "../services/contactApi";
import { toast } from "react-toastify";
import "./Info.css";
const Info = () => {
  const { id } = useParams(); // Route icinde path de id ismini ne verdi isek useParams objs icine o gelir
  //  <Route path="/info/:id" element={<Info/>}/>
  //Burasi onemli, bu islem bu detay sayfasina ozel yapiliyor rtk-query de
  //dikkat edelim diger tum contacslari alma veya add,delete,update islemlerinin hicbirinde, direk contactApi den gelen action methodunu veren
  // methodu invoke ederken parametre girmiyorduk, burda paramtre girdik
  //Birde bu islem de bir data alma islemi yani herhangi ekleme, silme, degistirme yok, ondan dolayi da biz datayi obje icinde aliyoruz ki, icerisinde
  //isLoading,isError,isSuccess gibi ozelliiklerle geliyor
  const { data, isLoading, isSuccess, isError, error } = useGetContactInfoQuery(id!);
  //!undefined gelme durumunda datamizin patlamasini onler!!!Bestpractise..onemli...
  //id yi Contact interface type i icerisinde optioanal belirlediik ve type a string dedik iste ya string ya da undefined demektir
  //  yani atanmayabilir demektir, iste bu  undefined olma ihtimali varken biryerde sadece string verilirse bu type a o zaman sknti cikarabilir bize, undefined gelme ihtimalinden dolayi....

  //BU BESTPRACTISE COOK FAYDALI, BU MANTIK TAKIP EDILEBILIR...ERROR ISLEMLERINDE AYRICA TOAST, U SUCCESS VE ERROR MESAJLARI ICIN KULLANABILIRIZ
  useEffect(() => {
    if (error) {
      toast.error("Something went wront");
    }
  }, [error]);

  let content;
  if (isLoading) {
    content = <h2>Loading...</h2>;
  } else if (isSuccess) {
    const { id, name, email, contact } = data;
    content = (
      <div className="card">
        <div className="card-header">
          <p>User Contact Detail</p>
        </div>
        <strong>ID:</strong>
        <span>{id}</span>
        <br />

        <strong>Name:</strong>
        <span>{data && name}</span>
        <br />

        <strong>Email:</strong>
        <span>{isSuccess && email}</span>
        <br />
        <strong>Contact:</strong>
        <span>{isSuccess && contact}</span>
        <br />
        <Link to="/">
        <button className="btn btn-edit">Go Back!</button>
        </Link>
      </div>
    );
  }
  return <div style={{ marginTop: "150px" }}>{content}</div>;
};

export default Info;
