import React,{useEffect,useState} from 'react'
import { useParams } from "react-router-dom"
import axios from "axios";
 function YaziDetayi(props) {
 const [yaziDetayi,setYaziDetayi]=useState({});//yaziDetayi obje olarak geliyor 
     const params = useParams()
     console.log("params:_",params.id)
     const {id}=params;
   useEffect(()=>{
    axios
    .get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`)
    .then(response=>{
        setYaziDetayi(response.data)
    })
    .catch(error=>{
        console.log(error)
    })//olmayan bir id ye gidersek bize apide ayarlanip gelen bir error mesaji gelecek
},[])

  console.log("yaziDetayi",yaziDetayi);
    return (
        <React.Fragment>
             <h2 className="ui header">{yaziDetayi.title}</h2>
             <p>{yaziDetayi.created_at}</p>
             <p>{yaziDetayi.content}</p>
             
        </React.Fragment>
    )
}

export default YaziDetayi;