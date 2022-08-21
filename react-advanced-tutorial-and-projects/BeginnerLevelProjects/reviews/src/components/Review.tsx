import React, {useState} from 'react'
import { ReviewType } from './review.mode'

const Review = (props:ReviewProps) => {
const {items,handleNext,handlePreview,index,getRandomReview}=props;
  return (
 
    <>
    
    <h1>Our Reviews</h1>
    <div className="container">
    <div className="img-box">
     <img className="img" alt="" src={`${items[index]['image']}`}/>
     </div>
     <h3>{items[index]['name']}</h3>
     <span className="job"> {items[index]['job']}</span>
     <p className="description">
        {items[index]['text']}
     </p>
    <div className="icons-right-left">

    <button className="icon-btn" onClick={()=>handlePreview(items)}> <i className="fa-solid fa-chevron-left"></i></button>

   <button className="icon-btn" onClick={()=>handleNext(items)}> <i className="fa-solid fa-chevron-right"></i></button>
    </div>
    <button className="btn"
    onClick={()=>{
        getRandomReview(items)
    }}
    >Surprize Me</button>
     </div>
    </>
    
 
  )
}


  export interface ReviewProps {
        items:ReviewType[];
        handleNext:(reviews:ReviewType[])=>void;
        handlePreview:(reviews:ReviewType[])=>void;
        index:number;
        getRandomReview:(reviews:ReviewType[])=>void;
  }

export default Review