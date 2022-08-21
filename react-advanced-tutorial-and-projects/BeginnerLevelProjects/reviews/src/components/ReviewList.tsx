import React, {useEffect} from 'react'
import { getReviews } from '../api/reviewsApi';
import {useQuery,useQueryClient} from "react-query";
import Review from './Review';
import { ReviewType } from './review.mode';
import Loading from './Loading';
const ReviewList:React.FC<ReviewListProps> = (props) => {

    const {data:reviews,isLoading,isSuccess,error,isError}=useQuery("reviews",getReviews);
    const {items,setItems,handleNext,handlePreview,index,getRandomReview}=props;

    useEffect(()=>{
        if(isSuccess){
           setItems(reviews);
        }
    }, [isSuccess,reviews,setItems])

    console.log("items: ",items);

    const values={items,handleNext,handlePreview,index,getRandomReview}

    let content;
    if(items.length>0){
        content=  <Review  {...values}/>;
    }else if(isLoading){
        content=<Loading/>
    }
console.log("isSuccess: ",isSuccess);
console.log("isLoading: ",isLoading);
  return (
   <>
    {content}
   </>

  
  )
}

interface ReviewListProps {
    items:ReviewType[];
    setItems:React.Dispatch<React.SetStateAction<ReviewType[]>>;
    handleNext:(reviews:ReviewType[])=>void;
    handlePreview:(reviews:ReviewType[])=>void;
    index:number;
    setIndex:React.Dispatch<React.SetStateAction<number>>;
    getRandomReview:(reviews:ReviewType[])=>void;
    
}
//    setData:React.Dispatch<React.SetStateAction<people>>,

export default ReviewList
/*
 <div className="review-list">
   </div>
*/
/*
BETPRACTISE...
<Review  reviews={reviews!}/>
revews hemendirek gelmiyor ilk component yuklendiginde undefined yuklenir ve
sonra data gelincde yuklenir ama biliyoruz ki undefined uygulammizi kirar..bunu onlemke
icin de bu data gelince datayi al undefined oldugunda birsey yapma gibi bir cozum var

*/