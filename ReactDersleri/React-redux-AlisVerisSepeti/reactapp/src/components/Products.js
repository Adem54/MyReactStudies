import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../actions";
import { bindActionCreators } from "redux";

const Products = (props) => {
    console.log("Productsprops: ", props.cart)
    const insertToCart=(book)=>{
        props.addToCart(book);
    }
  return (
    <div>
      <h2>
        <span>Kitap Listesi</span>
        <Link to="/cart">Sepetim</Link>
      </h2>
      {props.bookList.map(book=>{
          return(
            <div className="book" key={book.id}>
            <img
              src={book.image}
              alt={book.name}
            />
            <div>
              <h4>{book.name}</h4>
              <p>Yazar: {book.author}</p>
              <p>Fiyat: &#8378; {book.price}</p>
              <button  onClick={()=>props.addToCart(book)} >Sepete Ekle</button>
            </div>
          </div>
          )
      })}
    
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    bookList: state.bookList,
    cart:state.cart
  };
};  
const mapActionsToProps={ addToCart}
export default connect(mapStateToProps,mapActionsToProps)(Products);
//mapStateToProps=>state i proplara yaz
//mapActionToProps=>action lari proplara yaz

//Simdi bizim Products ta tikladigimz zaman cart a book ekleyecek bir action umuz var ve biz o aksiyonu Produdcts componentinde buttonda sepete ekle diye tiklayinca actioncreater da hazirldigmiz addToCart action inin calismasini istiyoruz, o zaman biz ne yapariz burdan once action da ihtiyacimiz olan action operasyonlari, fonksiyonlarina erismeliyiz?Redux sayesinde biz hangi action a ihtiyacimiz varsa ona eriserek onu Products componenti icerisinde sahip oldugumuz fonksiyon icinde calistiririz

