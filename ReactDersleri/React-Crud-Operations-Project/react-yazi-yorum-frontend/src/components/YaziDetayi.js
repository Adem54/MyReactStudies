import React, { useEffect, useState } from "react";
import { useParams,Link} from "react-router-dom";
import {api} from "../api";
import axios from "axios";
import YaziYorumlari from "./YaziYorumlari";
import SilModal from "./SilModal";


function YaziDetayi(props) {
  const [yaziDetayi, setYaziDetayi] = useState({}); //yaziDetayi obje olarak geliyor
  const [comments, setComments] = useState([]);
  const params = useParams();
  const { id } = params;

  //Postrequest
  const handleCommentSubmit = (commentBody,e) => {
   // e.preventDefault();
    api()
      .post(
        `/posts/${id}/comments`,
        commentBody
      )
      .then((response) => {
        console.log("commentsPost: ",response)
        setComments([
            ...comments,
            response.data
        ])
       // setCommentBody(COMMENTBODY_START);//Input ve textarea icini temizliyoruz
      })
      .catch(error=>console.log(error))
  };
  //post isleminde url den sonra aray virgul koyarak gonderecegimiz veriyi obje icinde yazmamiz gerekiyor


  useEffect(() => {
    axios
    .all([
        api().get(`/posts/${id}`),
        api().get(`/posts/${id}/comments`)
    ])
    .then(response=>{
        setYaziDetayi(response[0].data);
        setComments(response[1].data);//kullanicinin form da yazdigi yorumlar geliyor
    })
    .catch(error=>console.log(error))
    //Bir dizi icinde geliyor response ve dizinin ilk elemani ilk gonderdigimiz get requestinin responsu, dizinin 2.elemani ise 2.gonderdgimiz getrequestin responsudur 
}, []);



  return (
    <React.Fragment>
      <h2 className="ui header">{yaziDetayi.title}</h2>
      <p>{yaziDetayi.created_at}</p>
      <div className="ui buttons">
  <Link to={`/posts/${id}/edit`} className="ui blue button">Duzenle</Link>
  <SilModal yazi={yaziDetayi}/>
</div>
      <p>{yaziDetayi.content}</p>
      <YaziYorumlari  comments={comments} handleSubmit={handleCommentSubmit}  />
  
    </React.Fragment>
  );
}
export default YaziDetayi;
// <button type="submit" class="ui blue button">Yorum Gonder</button>
//Form icinde girilen verileri yine form elementi icinde yazdigimiz onSubmit eventi ile gondermesi icin buttonun type olarak submit olmasi gerekir ki o buton kendisinin form a ait oldugunu anlams olsun
