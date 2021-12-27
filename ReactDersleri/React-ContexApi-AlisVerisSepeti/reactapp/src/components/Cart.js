import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BooksContext } from "../App";

const Cart = () => {
  const context = useContext(BooksContext);
  console.log("CartContext:", context.state.cart);

  const totalCartCount=context.state.cart.reduce((acc,book)=>acc+book.count,0);

const totalPrice=context.state.cart.reduce((acc,book)=>acc+(book.price*book.count),0).toFixed(2);
  return (
    <div>
      <h2>
        <Link to="/">Kitap Listesi</Link> <span>Sepetim ({totalCartCount})</span>
      </h2>

      <h3>
        Toplam Sepet Tutarı: &#8378;
        {context.state.cart.length === 0
          ? "Sepetiniz bos"
          :  totalPrice}
      </h3>
      {context.state.cart.map((book) => (
        <div key={book.id} className="book" >
          <img src={book.image} alt={book.name} />
          <div>
            <h4>{book.name}</h4>
            <p>Yazar: {book.author}</p>
            <p>Fiyat: &#8378;{book.price}</p>
            <p>Toplam: &#8378;{(book.price*book.count).toFixed(2)}</p>
            <p>Sepetinizde bu kitaptan toplam {book.count} adet var.</p>
            <button onClick={e=>context.decreaseByOne(book.id)} >-</button>
            <button onClick={e=>context.removeFromCart(book.id)}>Sepetten Çıkar</button>
            <button  onClick={e=>context.increaseByOne(book.id)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
