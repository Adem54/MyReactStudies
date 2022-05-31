import React,{useEffect,useState} from "react";
import YaziFormu from "./YaziFormu";
import {useParams} from "react-router-dom";
import {api} from "../api";

function YaziDuzenle() {
    const [yazi,setYazi]=useState({})
    const params=useParams();
    const {id}=params;
    useEffect(() => {
        api()
        .get(`/posts/${id}`)
        .then(response=>{
            setYazi(response.data)
        })
        .catch(error=>{console.log(error)})
    }, [])

  return (
    <div>
      <h3>Yazi Duzenleme Formu</h3>
     
     <YaziFormu  yazi={yazi} />
    </div>
  );
}
export default YaziDuzenle;
