
  import React, {useContext} from "react";
  import { Link } from "react-router-dom";
  import {BookContext} from "../App";
  const Cart = () => {
    const context=useContext(BookContext);
    console.log("contextCart: ",context);
    const {cart}=context.state;
    const {increaseBook,decreaseBook,removeFromCart}=context;
    console.log("carttttttt:",cart);
    return (
      <div>
        <h2>
          <Link to="/">Kitap Listesi</Link> <span>Sepetim {cart.reduce((acc,book)=>acc+(book.count),0)} </span>
        </h2>
    {/*reduce methodu ile sepetteki urunlerin toplam fiyatini hesaplayabiliriz... */}
        {<h3>Toplam Sepet Tutari:  {cart.length>0 ? <>&#8378;</> : ""} {cart.length === 0 ? "Kartta urun bulunmamaktadir" 
        :  cart.reduce((acc,book)=>acc+(book.count*book.price),0).toFixed(2)}</h3>}
      
  
       {cart.map((book,index)=>{
        console.log("bookCart: ",book);
        return  <div key={book.id} className="book">
        <img
          src={book.image}
          alt="Simyaci"
        />
        <div>
          <h4>{book.name}</h4>
          <p>Yazar: {book.author}</p>
          <p>Fiyat: &#8378;{book.price}</p>
          <p>Toplam: &#8378;{book.count*book.price}</p>
          <p>Sepetinizde bu kitaptan toplam {book.count} adet var.</p>
          <button onClick={(e)=>decreaseBook(book.id)}>-</button>
          <button onClick={(e)=>removeFromCart(book.id)}>Sepetten Çikar</button>
          <button onClick={(e)=>increaseBook(book.id)}>+</button>
        </div>
      </div>
       })}
      </div>
    );
  };
  
  export default Cart;
  