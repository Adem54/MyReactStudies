import "./App.css";
import React from "react";
import Navi from "./Navi";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";
import { Container, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import alertify from "alertifyjs";
import { Routes, Route } from "react-router-dom";
//import {Routes } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";
import FormDemo1 from "./FormDemo1";
import FormDemo2 from "./FormDemo2";

function App() {
  let productInfo = {
    title: "ProductList",
    description: "Myproduct description is here",
  };
  let categoryInfo = {
    title: "CategoryList",
    description: "My categiry description is here",
  };
  const [state, setState] = useState({ categoryName: "", cart: [] });
  //currentCategory,setCurrentCategory
  const [productState, setProductState] = useState({ products: [] });

  const getCurrentCategoryName = (category, e) => {
    setState({
      ...state,
      categoryName: category.categoryName,
    });
    getProducts(category.id);
  };
  const getProducts = async (categoryId) => {
    let url = "http://localhost:3004/products";
    if (categoryId) {
      //Eger parametreye bir url gelirse bu da tabi bizim tiklammiza bagli olarak gelecek cunku biz
      //bu fonksiyonu tetikleme eventi icinde calistiracagiz ve categoryid ordan gelecek tiklarsak gelecek
      url += "?categoryId=" + categoryId;
    }
    const response = await fetch(url);
    const data = await response.json();
    setProductState({
      ...productState,
      products: data,
    });
  };
  //Componentlerimiz basladigi zaman products listesi ile gelecek
  useEffect(() => {
    getProducts();
  }, []);

  const addToCart = (product, e) => {
    let newCart = state.cart;
    //BUNU YENI GORDUM...IYI OGREN
    //Dikkat edelim biz eger ki sepete veri ekleyeceksek burda state ye yazdiigimiz cart dizisini kullanmamiz gerekyor ve onun uzerinde islem yapmamiz gerekiyor dizi islemlerini ama biz state e sadece setState araaciigi ile uzerinde islem yapabiliyoruz ve onda da yeni degerimizi atama islemi gibi o zaman biz de ne yapacagiz degisken olusturup state deki dizi yi degiskenimize atariz sonra o degisken uzerinde islemlerimizi yapariz ardindan da tekrar o degiskeni setState ile stattimiz olarak guncelleeriz...
    //Ayni product a basinca da her seferinde onu eklemesin sadece onun saysisini arttirsin, yani alt alta navigation menu gibi eklenmesin ayni urun birden fazla eklenirse sadece onun saysisi artsin
    //Once liste icinde daha once ayni urun eklenmis mi onu kontrol ederiz..
    var addedItem = newCart.find(
      (cartItem) => cartItem.product.id === product.id
    );
    if (addedItem) {
      //Eger bu eleman var ise
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    //Biz cart dizizi icinde bir product objesi bir de productquantity yi yani adedini tutmak istiyoruz ondan dolayi bizim cartItem imiz bir obje dir ve icinde product ve productquantity var onndan dolayi cartItem.product.id deyince id ye ulasiriz....

    setState({
      ...state,
      cart: newCart,
    });
    alertify.success("Product added succesfully!");
    //Tikladigimiz urunu cart state imize ekledikten sonra artik bu sepete ekledigimiz urunleri tutan dizimiz state.cart i Navi ye gonderelim cunku orda biz eklenen urunleri goruntuleyecegiz,....
    console.log("state.cart: ", state.cart);
    /*
 setState({
  ...state,
  cart:newCart
}) */
  };
  //Silme islemini filter fonks kullanarak yapariz...
  const removeFromCart = (product) => {
    let newCart = state.cart.filter(
      (cartItem) => cartItem.product.id !== product.id
    ); //Bize gelenurunun id sine esit olmayan productlari getir dersek dogal olarak gelen urunu listeden silmis oluyor...
    //Sonra ne yapariz hemen git statei guncelle tabiki
    setState({
      ...state,
      cart: newCart,
    });
    alertify.error("Product removed from cart!");
  };
  return (
      <div>
        <Container>
          <Row>
            <Col xs="6"></Col>
            <Col xs="6">
              <Navi cart={state.cart} removeFromCart={removeFromCart} />
            </Col>
          </Row>
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={state.categoryName}
                changeCategoryName={getCurrentCategoryName}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <Routes>
                <Route
                  path="/"
                 element={
                  <ProductList
               
                  info={productInfo}
                  currentCategory={state}
                  products={productState}
                  addProductToCard={addToCart}
                  authed={true}
                />
                 }
                />
                <Route exact path="/cart" 
                  element={
                    <CartList
              //Bu sayfa Cart detail sayfasi burda musteriye sepete ekledigi urunu silme firsati vermemiz icin bir taane de removecart fonksiyonu gondeririz...Zaten biz bu islemi cartSummary-Navi de yani componentinde de yapmistik ayni fonksiyonu CartList componenti icinde kullaniriiz...
              //Burda sepet icindeki urunlerin bulundugu state i CartList componentine gondererek ona sepet urunlerini listeleme imkani sunuyoruz
                   cart={state.cart}
                   removeFromCart={removeFromCart}
                  />
                   }
                />
                  <Route exact path="/form1" element={<FormDemo1/>}  />
                  <Route exact path="/form2" element={<FormDemo2/>}  />
                  <Route exact path="*" element={<NotFound />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
   
  );
}
export default App;

/*
const addToCart=(product,e)=>{
 let newCart=state.cart;
 var addedItem=newCart.find(cartItem=>cartItem.product.id===product.id)
 if(addedItem){//Eger bu eleman var ise
addedItem.quantity+=1;
 }else{
  newCart.push({product:product,quantity:1})
 }
 setState({
   ...state,
   cart:newCart
 })
 alertify.success("Product added succesfully!");
}) } 


   <ProductList
                  {...props}//propslarin bir kopyasini al onu gonder demektir bu
                    info={productInfo}
                    currentCategory={state}
                    products={productState}
                    addProductToCard={addToCart}
                  />


                        <Route exact path="/cart" element={<CartList />} />
              <Route  element={<NotFound />} />

*/
