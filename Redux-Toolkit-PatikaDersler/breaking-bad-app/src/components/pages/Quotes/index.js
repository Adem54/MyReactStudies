
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { selectItems } from '../../../redux/charactersSlice';
import { selectQuotes,getQuotesAsync,selectStatus,selectError } from '../../../redux/quoteSlice'
import Error from '../../Error';
import Loading from '../../Loading';
import Item from './Item';
const Quotes = () => {
const quotes=useSelector(selectQuotes);
console.log("quotes:",quotes);
const status=useSelector(selectStatus);
console.log("status:",status);
const error=useSelector(selectError);

const dispatch=useDispatch();

//BESTPRACTISE.....
//Burayi iyi anlamamiz lazim bestpractise
//Biz, link uzerinden geldgimiz componentte tamam mount edildiginde
//datalari aliyoruz ama biz bu componentten back yaparak
//tarayici da geri diyerek home sayfasina tekrar gidip ordan bir daha
//bu componente geldigmizde bastan bir daha fetch-request ile
//api den datayi cekmesini istemiyoruz, cunku zaten datayi cektik ya her oraya geldigmizde
//datayi en bastan cekmeyelim, onun yerine zaten cekmis oldgumuz datayi alalim
//Ancak sayfa en bastan baslatilirsa bu gerceklessin diyoruz...
useEffect(()=>{
    if(status==="idle"){
        console.log("getQuoteAsync useEffect icinde invoke")
        dispatch(getQuotesAsync());
    }
},[dispatch])

if(status==="failed")return <Error message={error}/>
//if(error)<Error error={error}/>
  return (
    <>
    <h2>Quotes</h2>
    {status==="loading" && <Loading/> }
    {status==="succeeded" && quotes.map(item=>(
        <Item key={item.quote_id} item={item}/>
    ))}
   {status==="succeeded" && <div style={{textAlign:"center"}}>{quotes.length}  quotes</div>} 
   <div>   <Outlet /></div>
    </>
    
  )
}

export default Quotes