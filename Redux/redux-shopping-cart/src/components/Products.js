import React from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { addBookToCart } from "../actions";
const Products = ({ bookList, cart,addToCart }) => {
  console.log("cart: ", cart);
  const myBookList = useSelector((state) => state.bookList);
  const myCart = useSelector((state) => state.cart);
  console.log("myCart: ", myCart);
  console.log("myBookList: ", myBookList);
  const dispatch = useDispatch();
  const addCart = (book) => {
    console.log("addCartTetiklendi")
    dispatch(addBookToCart(book));
  };
  return (
    <div>
      <h2>
        <span>Kitap Listesi</span>
        {/*Biz burda Sepetim  linkine basinca o App.js de ki Route larda ki path lerde /cart boyle bir yol var mi onu arayacak...bulursa o path deki componente gidecek */}
        <Link to="/cart">Sepetim</Link>
      </h2>
      {bookList.map(({ id, name, author, price, image }, index) => (
        <div key={id} className="book">
          <img src={image} alt={name} />
          <div>
            <h4>{name}</h4>
            <p>Yazar: {author}</p>
            <p>Fiyat: &#8378; {price}</p>
            <button onClick={() => addCart({ id, name, author, price, image })}>
            {/* <button onClick={() => addBookToCart({ id, name, author, price, image })}> */}
              Sepete Ekle
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    // state  //Boyle yaparsak tum sateti aliriz
    bookList: state.bookList,
     //artik bookList e props.bookList diyerek erisebilirz cunku bookList propert olarak props obejsinin icine atti...
    cart: state.cart,
    //Biz buraya state te olmayan bir deger de ekleyebilirz, bu obje icine yazdigmiz degerler componentin parametresine gonderilecegi icin,biz buraya state ten gelmeyen bir deger bile yazsak, onu props araciligi ile alip kullanbilirz..
  };
};

export default connect(mapStateToProps, { addBookToCart })(Products);
/*
Burda state timize 2 yolla da erisebiliyoruz
1-useSelector- const myBookList = useSelector((state) => state.bookList);
2-connect fonks araciligi ile mapStateToProps fonkks olusturuz, parametre olarak state alan ve bir obje donuduyoruz sonra bu mapStateToProps u react-redux tan gelen connect methoduna 1.parametre olarak gondeririz...Sonra da mapStateToProps icindeki state i componentimize props olarak gonderilmis olur ve parametresine ototmaik olarak gelir ve ordan kullanabiliriz...

2 farkli yolla da actionCreator umuza erisip onu calistiririz
1-useDispatch- import ettgimiz addToCart i const dispatch=useDispatch();   in dispatch e parametre olarak gonderip orda invoke edebilriz...
   dispatch(addToCart(book)); Tabi bunu yine onClick methodu icinde  yapmaliyiz ki tetiklenme gerceklessin....
2-connect fonks araciligi ile, ve direk calistirarak....import ettgimiz addToCart i ,connect methoduna mapStateToProps dan sonra obje icinde parametre olarak gonderdikten sonra, addToCart i invoke edebiliriz, cunku muhtemelen dispatch islemi kendi icinde yapacak
*/