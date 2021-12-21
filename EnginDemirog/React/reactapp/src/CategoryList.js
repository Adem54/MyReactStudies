import React from 'react'
import {ListGroupItem,ListGroup} from 'reactstrap';
import {useState,useEffect} from 'react';

 function CategoryList(props) {
     const {info}=props
  
     const[myState,setMyState]=useState({categories:[      
     ]
    });
  const getCategories=async()=>{
    const response=await fetch("http://localhost:3004/categories");
    const data=await response.json();
    return data;
  }
    useEffect(()=>{
            getCategories().then(response=>(
            setMyState({
                ...myState,
                categories:response
            })
        )).catch(error=>console.log(error))
    },[]) 
     const {categories}=  myState;
    return (
        <div>
        <h3>{info.title}</h3>
        <ListGroup>
        {   categories.map( (data,index)=>{
            return  ( 
                    <ListGroupItem active={data.categoryName===props.currentCategory?true:false}
                    key={data.id}
                    onClick={(e)=>props.changeCategoryName(data,e)}
                    >
                     {data.categoryName}
                    </ListGroupItem>
                             )  }  )}
          </ListGroup>
          {/* <h3>{props.currentCategory} </h3> */}
       </div>
    )
}

export default CategoryList;