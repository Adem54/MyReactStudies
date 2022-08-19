import React from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import { Tour as TourType, useTourContext } from '../context/TourContext';
import { formatCurrency } from "../utils/currencyFormat";
import { limitedText } from "../utils/limitText";

const styles = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "2rem",
};

export const Tour = (props: TourProps) => {

    const {showMore,setShowMore,setData,removeTour}=useTourContext();
  const { id, name, info, image, price } = props.data;
  //Virgul yerine .nokta koyuyoruz ve o sekilde parseFloata ceviririz cunku
  //virgul sayilarin onluk 3 hane arasinda dogal olarak gelen ayiractir javascript
  //onun ondalik oldugunu dusunmuyor virgul olunca
//   const res=formatCurrency();
//   console.log("res-curr: ",res);

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
            <span>{!showMore ? limitedText(info,30): info}</span>
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
