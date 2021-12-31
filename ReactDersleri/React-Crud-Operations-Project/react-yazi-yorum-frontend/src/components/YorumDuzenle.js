import React,{useEffect,useState} from 'react'
import YorumFormu from './YorumFormu';
import {useParams} from "react-router-dom";
import {api} from "../api";
 function YorumDuzenle() {
    const [yorum,setYorum]=useState({}) 
    const params=useParams();
    const {post_id,id}=params;//string olarak geliyor
    useEffect(()=>{
api()
.get(`/posts/${post_id}/comments`)
.then(response=>{
   setYorum({
       ...response.data.find(yorum=>yorum.id===(parseInt(id)))
   })
}).catch(error=>console.log(error))
    },[])
    return (
        <div>
            <h3>Yorum Duzenleme Formu</h3>
            <YorumFormu yorum={yorum} />
        </div>
    )
}

export default YorumDuzenle;