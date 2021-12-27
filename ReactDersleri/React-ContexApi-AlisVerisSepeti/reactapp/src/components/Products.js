import { Link } from "react-router-dom";
import React,{useContext} from "react";
import {BooksContext} from "../App";
const Products = props => {
    const context=useContext(BooksContext);//BooksContextine Product icerisinde useContext kullanarak bu sekilde erisiriz
    console.log("context:",context);
    return (
    <div>
      <h2>
        <span>Kitap Listesi</span>
        <Link to="/cart">Sepetim</Link>
      </h2>

      {context.state.bookList.map(book=>{
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
              <button onClick={e=>context.addToCart(book)} >Sepete Ekle</button>
            </div>
          </div>
          )
      })}
     
    </div>
  );
};

export default Products;
