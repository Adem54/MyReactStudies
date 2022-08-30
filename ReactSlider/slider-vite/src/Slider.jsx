import React, { useEffect, useState } from 'react'
import data from "./data.js";
import './App.css'
const Slider = () => {
const [currentIndex,setCurrentIndex]=useState(0);
const [people]=useState(data);

/* Burasi sadece bizi, lastIndex ve baslangic index in gerisine dusme durumunda koruyor...yoksa biz burda currentindex i arttirma ve azaltma islemi yapmiyoruz */
useEffect(()=>{
   const lastIndex=people.length-1;
    if(currentIndex>lastIndex){
        setCurrentIndex(0);
    }
    if(currentIndex<0){
            setCurrentIndex(lastIndex);
    }
},[currentIndex,people])


  return (
    <section className="section">
          <div className="title">
         <h2>top leader</h2>    
        
         </div>  
         <div className="section-center">
           
           {
            people.map((person,index)=>{
                const {name,title,quote,image,id}=person;
                
                let position="nextSlide";
                if(currentIndex===index){
                    position="activeSlide";
                }
                if(index===currentIndex-1 || 
                   (currentIndex===0 && (index===people.length-1) )
                    ){
                        position="lastSlide";
                    }
                return  (
                    <article key={id}  className={position}>
                    <img className="person-img" src={image}alt="manager"/>
                    <h4>{name}</h4>
                    <p className="title">{title}</p>
                    <p className="text">
                   {quote}
                    </p>
                </article>
                )
            })
           }
           

            <button className="prev"
            onClick={() => setCurrentIndex(currentIndex - 1)}
            >
            <i className="fas fa-arrow-left"
            
            />  
            </button>
            <button className="next"
            onClick={() =>  setCurrentIndex(currentIndex + 1)}
            >
            <i className="fas fa-arrow-right" />  
            </button>
         </div>
    </section>
  )
}

export default Slider
