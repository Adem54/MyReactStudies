import React from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import {substractFromTheCart,increaseCount, decreaseCount} from "../actions/index";
const Cart = () => {
    const myCart = useSelector((state) => state.cart);
    console.log(`myCarttt: `,myCart);
    const dispatch=useDispatch();

    const deleteBook=(id)=>{
        dispatch(substractFromTheCart(id));
    }
    const increaseBookCount=(id)=>{
        dispatch(increaseCount(id));
    }
    const decreaseBookCount=(id)=>{
        dispatch(decreaseCount(id));
    }
  return (
    <div>
      <h2>
        <Link to="/">Kitap Listesi</Link> <span>Sepetim</span>
      </h2>

      <h3>Toplam Sepet Tutarı: &#8378;{myCart.reduce((acc,book)=>acc+(book.price),0).toFixed(2)} </h3>

      {myCart.map(book=>(
        <div key={book.id} className="book">
        <img
          src={book.image}
          alt={book.name}
        />
        <div>
          <h4>{book.name}</h4>
          <p>Yazar: {book.author}</p>
          <p>Fiyat: &#8378;{book.price}</p>
          <p>Adet:{book.count}</p>
          <button onClick={(e)=>decreaseBookCount(book.id)}>-</button>
          <button onClick={()=>deleteBook(book.id)}>Substract From The Cart</button>
          <button onClick={()=>increaseBookCount(book.id)}>+</button>
        </div>
      </div>
      ))}
    </div>
  );
};
export default Cart;