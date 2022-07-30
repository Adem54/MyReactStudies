import React from 'react'
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,   
  } from "mdb-react-ui-kit";

//Gelen props un type ini belirlememiz gerekir typescriptte
//Props ile fonksiyon gonderilirken, bu sekilde fonksionun gelecegi yerde onu type ini belirtmek gerekiyor
interface PropsFunction{
recipe:any;//Bu bu sekilde olmayacak recipe nin type i ne ise onu verecegiz...
toggleShow: (item: any) => void;
}
const Card:React.FC<PropsFunction> = ({recipe,toggleShow}) => {
  return (
    <>
     <MDBCardBody>
        <MDBCard className="h-100 mt-2 d-sm-flex">
             
                       <MDBCardImage
            src={recipe.image}
            alt={recipe.label}
            position="top"
            style={{cursor:"pointer"}}
            onClick={()=>toggleShow(recipe)}
            />
            <MDBCardBody>
                <h5 className="fw-bold">{recipe.label}</h5>
            </MDBCardBody>
        </MDBCard>
        </MDBCardBody> 
    </>
  )
}

export default Card
