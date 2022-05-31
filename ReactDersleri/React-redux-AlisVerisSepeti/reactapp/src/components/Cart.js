import React from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";

const Cart = (props) => {
    const totalPrice=props.cart.reduce((acc,book)=>acc+book.price,0).toFixed(2);
  return (
    <div>
     <h2>
        <Link to="/">Kitap Listesi</Link> <span>Sepetim</span>
      </h2>
 
      <h3>Toplam Sepet Tutarı: &#8378; {totalPrice}</h3>
    {
    props.cart.length===0 ? <h3>Sepet bos</h3> :
    props.cart.map(book=>(
        <div className="book"  key={book.id}>
        <img
          src={book.image}
          alt="Simyacı"
        />
        <div>
          <h4>Simyaci</h4>
          <p>Yazar: {book.name}</p>
          <p>Fiyat: &#8378;{book.price}</p>
        
          <p>Sepetinizde bu kitaptan toplam 
               vardir
               adet var.</p>
          <button>-</button>
          <button>Sepetten Çıkar</button>
          <button>+</button>
        </div>
      </div>
    ))
  //let cartTotal=products.reduce((acc,product)=>acc+product.unitPrice,0)
    
    
    }
      

    </div>
  );
};

const mapStateToProps=state=>{
    return {
        cart:state.cart
    }
}

export default connect(mapStateToProps)(Cart);
