//Biz category listemizdeki bir categoriye tiklayinca, o categoriye ait productlari listeliyorduk bunu da yaparken biz categoryName bilgisnin ProductList e gonderiyorduk ve onun icin eger categorye tiklanirsa yani categoryName gelirse o zaman categoriye gore listelenmis endpointe gitmesini sagliyorduk.....
//category yi select yaptigiimzda yani sectigmizde, uzerine tikladigmizda ki action type dir...yani istedigimiz category gelsin yani category tiklanmasin degistir
export const CHANGE_CATEGORY="CHANGE_CATEGORY";
export const GET_CATEGORIES_SUCCESS="GET_CATEGORIES_SUCCESS";
//Uzak apiden fetchApi veya axios kutuphaensi ile veri cekerken asenkron yapilarda, reduxin aciklari var, verikayiplarina neden olabilen ondan dolayi biz burda isim olarak GET_CATEGORIES_SUCCESS bunu kullaniyoruz
export const GET_PRODUCTS_SUCCESS="GET_PRODUCT_SUCCESS";
//Biz burda Success diyoruz cunku apiden veri alma islemi yaptigimdan dolayi redux-thunkdan yararlaniyoruz ondan dolayi success diyoruz

export const CREATE_PRODUCT_SUCCESS="CREATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_SUCCESS="UPDATE_PRODUCT_SUCCESS";

export const ADD_TO_CART="ADD_TO_CART";
export const REMOVE_FROM_CART="REMOVE_FROM_CART";