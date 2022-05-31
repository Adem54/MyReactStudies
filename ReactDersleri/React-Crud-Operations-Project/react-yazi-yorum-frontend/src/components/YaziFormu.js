import React, { useState,useEffect } from "react";
import {api} from "../api";
import { Link, useNavigate,useParams } from "react-router-dom";

const BASLANGIC_YAZI = {
  title: "",
  content: "",
};
function YaziFormu(props) {
  
  const params=useParams();
  const {id}=params;
  const [yazi, setYazi] = useState(BASLANGIC_YAZI);

  useEffect(() => {
    (props.yazi?.title && props.yazi?.content) && setYazi(props.yazi);
   }, [props.yazi])


  let navigate = useNavigate();
  const [hata, setHata] = useState("");

  const handleOnChange = (e) => {
    setYazi({
      ...yazi,
      [e.target.name]: e.target.value,
    });
  };


  const onFormSubmit = (e) => {
    e.preventDefault();
    setHata(""); //form ilk baslatildiginda hata mesajii sifirlayalim
    if (props.yazi?.title) {
      //put request-edit islemi
      api()
      .put(`/posts/${id}`,yazi)
      .then(response=>{
        console.log("responsePUT:",response);
        navigate(`/posts/${id}`);//kullaniciyi tekrar yazidetayi sayfasina yonlendiriyoruz(react-router-dom5 te props.history.push() icine yaziliyor)
      })
      .catch(error=>console.log(error))
    }else{
      //post request-add islemi
      api()
      .post("/posts", yazi)
      .then((response) => {
        console.log("response", response);
        navigate("/"); //hem gonderme islemini yapiyor hem de ana sayfaya yonlendiriyor
      })
      .catch((error) => {
        setHata("Baslik ve icerik alanlari zorunludur!");
      });
    }
    setYazi(BASLANGIC_YAZI);
  };
  return (
      <React.Fragment>
 {
          //Hata mesaji sadece hata varken gosterecegiz ve yaziyi da hata mesajindan alacagiz
        }
        {hata &&  <div className="ui warning message">
          <i className="close icon"></i>
          <div className="header">Hata</div>
         {hata}
        </div>}
       
        {
          //Hata mesaji
        }

      
    <div className="ui form">
    
      <div className="field">
        <label>Yazi Basligi</label>
        <input
          onChange={handleOnChange}
          value={yazi.title}
          name="title"
          type="text"
        />
      </div>
      <div className="field">
        <label>Yazi Icerigi</label>
        <textarea
          onChange={handleOnChange}
          value={yazi.content}
          name="content"
          rows="3"
        ></textarea>
      </div>
      <button onClick={onFormSubmit} className="ui primary button">
        Gonder
      </button>
      <button className="ui button">Iptal Et</button>
      <Link to="/">Anasayfaya Git</Link>
    </div>
    </React.Fragment>
  );
}
export default YaziFormu;
