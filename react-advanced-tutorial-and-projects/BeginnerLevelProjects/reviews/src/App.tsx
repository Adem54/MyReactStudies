
import './App.css';
import {useState} from "react";
import { ReviewType } from './components/review.mode';
import ReviewList from './components/ReviewList';

function App() {
const [items,setItems]=useState<ReviewType[]>([] as ReviewType[]);




const [index,setIndex]=useState(0);

    const handleNext=(reviews:ReviewType[])=>{
          if(index=== (reviews.length-1)){
            setIndex(0);
          }else {
            setIndex(index=>index+1);
          }  
    }

    const handlePreview=(reviews:ReviewType[])=>{
            if(index===0){
                setIndex(reviews.length-1);
            }else {
                setIndex(index=>index-1);
            }
    }

 const getRandomReview=(reviews:ReviewType[])=>{
  // Returns a random integer from 0 to 10:
let random=Math.floor(Math.random() * reviews.length);
setIndex(random);
console.log("index:::::",index);
 }
    const values={items,setItems,handleNext,handlePreview,index,setIndex,getRandomReview}

  return (
    


    <div className="App">
  
    <ReviewList {...values}/>
    </div>
  
  );
}

export default App;
