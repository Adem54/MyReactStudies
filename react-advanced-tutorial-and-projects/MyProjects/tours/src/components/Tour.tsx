import React, { useState } from "react";
import { Tour as TourType, useTourContext } from '../context/TourContext';
import { formatCurrency } from "../utils/currencyFormat";
import { limitedText } from "../utils/limitText";
import { useWindowSize } from "./UseWindowSize";

const styles = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "2rem",
};

export const Tour = (props: TourProps) => {
  


    
    const {showMore,setShowMore,setData,removeTour}=useTourContext();
  const { id, name, info, image, price } = props.data;
 


  const [width, height] = useWindowSize();
    
  let limitText="";
if(width<=720){
   limitText=limitedText(info,8);
}else if(width<=900 && width>720){
    limitText=limitedText(info,15);
  }else if(width>=900 && width<=1200){
    limitText=limitedText(info,23);
  }else if(width>=1200){    
    limitText=limitedText(info,30);
  }


  return (
    <div style={styles}>
      <div className="card">
        <img
          className="img"
          src={image}
          alt="Avatar"
          style={{ width: "100%" }}
        />
        <div className="container">
          <div className="title-price"  >
            <div className="name">
              <h4 >{name}</h4>
            </div>
            <div className="price">
              <h4> {formatCurrency(price)}</h4>
            </div>
          </div>
          <p className="info">
            <span>{!showMore ? limitText: info}</span>
            <a className="link" href="/" onClick={(e)=>{
                e.preventDefault();//Sayfayi yenilemesini onledik bu sekilde..
                setShowMore(!showMore);
            }}>{!showMore ? "Read More" : " Show Less"}</a>
          </p>
          <button className="btn remove-btn" onClick={()=>{
            const check:boolean=window.confirm("Are you sure?");
            if(check){
                removeTour(id);
            }
                       
          }}>Not Interested</button>
        </div>
      </div>
    </div>
  );
};

interface TourProps {
  data: TourType;
}


/*

let newWidth=window.innerWidth;
console.log("new Widthhhhh: ",newWidth);

if(newWidth<=1070){

}else {

}

window.onresize=(event)=>{
    if(window.innerWidth<=1070){
        console.log("innerWidth su an 1074 ve altinda....")
    }
}


const mediaQuery = window.matchMedia('(max-width: 768px)')
// Check if the media query is true
if (mediaQuery.matches) {
  // Then trigger an alert
  let newWidth=window.innerWidth;
console.log("new Width: ",newWidth);
console.log('Media Query Matched!')
 
}



*/
