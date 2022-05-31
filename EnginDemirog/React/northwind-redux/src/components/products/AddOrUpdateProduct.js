import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { saveProductApi } from "../../redux/actions/productActions";
import { getCategories } from "../../redux/actions/categoryActions";
import ProductDetail from "./ProductDetail";

function AddOrUpdateProducts({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props
}) {
  //{products,categories,getProducts,getCategories,saveProduct,...props} mevcut bu componentin proplarina bu girdiklerimizi de eklemis oluyoruz
  //Biz urun eklmeye calistigmizda bazi degerleri sabit getirmek istiyoruz ornegin
  const [product, setProduct] = useState({ ...props.product });
  //Kullanici link ile gelmisse bu sayfaya o zaman categorileri getirmek icinde useEffect i kullancagiz
  useEffect(() => {
    if (categories.length === 0) {
      getCategories(); //reduxt tan gelen getCategories() i calistir diyoruz ve categoryACtions a gider ve orada biz fetch den cekmistik veriyi
    }

    setProduct({
      //...product
      ...props.product,
    });
  }, [props.product]); //prop.product i izle o doma yerlestigi zaman artik bunu bitirebilirsin demek

  function handleChange(event) {
    //const name=event.target.name
    //const value=event.target.value
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct, //extend ediyoruz previousProduct i ve yeni yazacagizim product i bunun uzerine yaziyoruz, yani bu su anki product yani biz simdi SetProduct icinde bunu degistirecegiz bu degismeden onceki hali demektir
      [name]: name === "categoriId" ? parseInt(value, 10) : value,
      //onceki product in name degeri eger categoriId alani varsa degeri integer a ceviriyoruz cunku categori alanimiz integer olmasi gerekiyor, aksi takdirde categoriId ddgilse direk valueyi oldugu gibi bas demektir bu...Bu bir kontrol dur
    }));
  }

  function handleSave(event) {
    //submit olayi olacak burda
    event.prevendDefault();
    saveProduct(product).then(() => {
      history.push("/"); //daha once geldigimiz sayfalara ulasmak icin kullandiigmiz bir yontemdir, history reacttan gelen birseydir propslara eklmemeiz gerekeiyor.Bize history bilgisini getiriyor
    });
  }

  //componentimizin return u dur burasi ve biz bu component icinde ayri bir component olustururuz
  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
    />
 
  );
}

export function getProductById(products, productId) {
  let product = products.find((product) => product.id === productId) || null;
  return product;
}
//REACT HOOK ILE COK KOLAY KULLANIM!
//Dikkat edelim..Biz React Hookd da bu sekilde direk baglanti kurabiliyoruz....
const mapDispatchToProps = {
  getCategories,
  saveProductApi,
};

const mapStateToProps = (state, ownProps) => {
  //ownProps komponentlerin kendi icinde barindirdiklari prop lara karsilik gelir ve biz bir urunu guncellemek istedigimiz zaman o ururnu querystring ile geciyor olacagiz.Querystring ile urunu okuma isini bizim ownProps ile okuma durumumuz var
  //Query stringler web sayfaları arasında veri taşımak amacıyla kullanılan en basit yöntemlerden biridir.
  const productId = ownProps.match.params.productId; //Git parametrelere bak ordan productId yi cek
  //Diiyelim ki bu guncelleme ve guncellenmeye calisilan producti burda set ediyor olacagiz
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.producListtReducer, productId) //state teki productReducer i ve proudctId yi gonder sen ona gore bana  productId yi ver  yoksa,aksitakdirteø, o yeni bir urundur,ilkkez eklenmeye calisilian urundur o yuzden bos gecerimz'
      : {}; //
  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrUpdateProducts);

//Query Oluşturma
//Queryler web adresinizin sayfa isminden sonra soru işareti “?” ile başlar. İki bölümden oluşur Değer Adı ve Değer. Örneğin: http://ingilizcekelimeezberle.com/index.html?level=A1 sayfa isminden sonra oluşturulan alanı inceleyelim ?level=A1 Değer Adı: “level” Değer:A1 kısacası level adlı değişken A1 değerini taşır. Birden fazla Query göndermek için ise ve “&” sembolü kullanılır. Örneğin: http://ingilizcekelimeezberle.com/index.html?level=A1&ID=10

/*
import React from 'react';
import { connect } from 'react-redux';

const MovieShow = props =>
  <div>
    <h3>Movie Show Component!</h3>
  </div>;

const mapStateToProps = (state) => {}

export default connect(mapStateToProps)(MovieShow);

Now, in mapStateToProps, we'd like to access the :movieId supplied to us via the URL. We need to understand two things for this to work.

mapStateToProps takes a second argument of props that were passed directly to the component. We usually refer to these as ownProps
React Router will supply any dynamic pieces of the URL to the component via an object called match.params as own props of the related component.
This means that we can access the :movieId from the URL via match.params on our ownProps

import React from 'react';
import { connect } from 'react-redux';

const MovieShow = props =>
  <div>
    <h3>Movie Show Component!</h3>
  </div>;

const mapStateToProps = (state, ownProps) => {
  return {
    movieId: ownProps.match.params.movieId
  }
}

export default connect(mapStateToProps)(MovieShow);

Note that we have a property called movieId because of the way we defined our route. If we defined our dynamic portion to be /movies/:dog, we'd have a dog property in our match.params.
Now, we can simply iterate through our list of movies and return the one where our route matches.

import React from 'react';
import { connect } from 'react-redux';

const MovieShow = props =>
  <div>
    <h3>Movie Show Component!</h3>
  </div>

const mapStateToProps = (state, ownProps) => {
  const movie = state.movies.find(movie => movie.id == ownProps.match.params.movieId)

  if (movie) {
    return { movie }
  } else {
    return { movie: {} }
  }
}

export default connect(mapStateToProps)(MovieShow);

Now, assuming we find a movie, we simply add it to the props. To account for the case where a movie isn't found, we return just an empty object as the movie.

The last thing we need to do is add the title in our MovieShow's render function.

import React from 'react';
import { connect } from 'react-redux';

const MovieShow = ({ movie }) =>
  <div>
    <h3>Title: {movie.title}</h3>
  </div>

const mapStateToProps = (state, ownProps) => {
  const movie = state.movies.find(movie => movie.id == ownProps.match.params.movieId)

  if (movie) {
    return { movie }
  } else {
    return { movie: {} }
  }
}

export default connect(mapStateToProps)(MovieShow);


---


*/
