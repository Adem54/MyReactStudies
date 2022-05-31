import * as ActionTypes from "./actionTypes";

export const getProductsSuccess = (products) => {
  return {
    type: ActionTypes.GET_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const createProductSuccess = (product) => {
  return {
    type: ActionTypes.CREATE_PRODUCT_SUCCESS,
    payload: product, //direk product diyede gonderebiliriz shorHand seklinde tanimlayarak
    //biz {product} yazinca o arkada product:product diye gonderir ve degisken olarak aliyorsak propertyimizi o sekilde kullanabiliyrduk
  };
};

export const updateProductSuccess = (product) => {
  return {
    type: ActionTypes.UPDATE_PRODUCT_SUCCESS,
    payload: product,
  };
};

//COOK ONEMLI--
//Biz ekleme ve guncelleme isleminde de api ile baglanti kuracagimiz icin buralarda da yine redux-thunk kullanacagiz ve ayni apiden vericekerken nasil 2 ayri operasyon yapti isek burda o sekilde yapacagiz cunku api ile ilgili islemler asenkron oldugu icin biz redux-thunk kullaniyoruz bu tarz operasyonlarda
//Ekleme icin-post kullaniyorduk guncelleme icin put kullaniriz ama gercek hayatta guncellemeler de post ile yapiliyor.Ama burda kurallari apiyi yazan belirliyor biz bizim apimizde ekleme icin post, guncelleme icin put kullanacagiz
//VE biz hem post icin hemde put icin ayri ayri 2 tane api ile baglanti fonks yazmak yerine biz post ile put un farki ne idi onu hatirlayalim biz post eklerken veritabaninda id ler otomaik auto-incr seklinde verildigii icin post isleminde id verilmiyordu, ama put isleminde guncelleme isleminde id olmak zorundadir onda dolayi biz, eger id gonderilmemeis ise sen post islemi yap, id gonderilmis ise de o zaman put islemi yap diyecegiz....Tabi biz ayri ayri da yapabiliriz ama  cok yaygin bir kullanimdir bu kullanim-bestpractise

export function saveProductApi(product) {
  return fetch("http://localhost:3004/products/" + (product.id || ""), {
    method: product.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" }, //defaultta bu sekilde gelir zaten
    body: JSON.stringify(product),
  })
    .then(handleResponse) //Biz burda apiye baglanma operasyonundan then ile ilgili olan kisimlar icin kendi fonksiyonumuzu olusturup onunla bir kerede sonucumuzu dondurecegiz daha da temiz kod yazmak icin...
    .catch(handleError);
}
 //Default u gettir islemlerin unutmayalim-method:"POST" yazinca demis oluyorz ki ben senden data istemiyorum ben sana data gonderecegim, cunku biz bunu yazmayinca defaultta get olarak calisir data getirmek ister ama biz method:POST  yazinca o bizim onda data gonderecegimzi anlamis oluyor.Biz productsa datayi 2 sey icin gondeririz,ya post ekleme,ya da put guncelleme icn.
  //(product.id || "")=>Gonderilen product in id si varise onu koy yoksa hicbirsey koyma demektir.Cok pratik bir kullanimdir-bestpractise
  //  {method:product.id?"PUT":"POST"}=>Eger product.id var ise PUT islemi yap, yok ise POST
  //Sunu da bilelim guncelleme islemleri id ile olur ve adres te de ornegin products/2 demek 2 id numarali product guncellenecek dmeektir bu bilgi api den bize verilir bizim apimiz o sekildedir yani "http://localhost:3004/products/3" yaparsan bu demektir ki 3 numarali product urununu guncellemek istiyoruz
  //body nedir?body bizim adresini yazip gonderdigimiz data dir body ve biz datamizi json.stringify ile stringe cevirerek gondeririz bu onemli.Neden stringe ceviririz cunku request formatlari stringdir ve yine hatrlayalim biz apiden get ile veri cektigtimizde de gelen veriyi bir once json a cevirirdik string turunden cunku request ler string turunde gonderilmelidir ve response lar da string turunde gelirler

export function saveProduct(product) {
  return function (dispatch) {
    //Bu dispatch redux-thunk tan gelip action imizin devreye girmesini sagliyordu
    return saveProductApi(product).then((savedProduct) => {//bize kaydedilen urun donecek.Veri geldikten sonra redux a haber veriyoruz verinin update mi, save mi oldugunu.
      product.id
      //Altta yapdgiimiz hareketlerle redux in reducer larini devreye sokmus olduk...
        ? dispatch(updateProductSuccess(savedProduct))
        : dispatch(createProductSuccess(savedProduct));
    }).catch(error=>{throw error}) 
  };
}

//ONEMLI!!!
//Biz reponsun succesfull geldiginde de error yaziyoruz cunku kimi zaman adres bulunamasa bile catch yakalayamiyor ve mesaji da gizli oldugu icin bize de mesaj vermiyor biz bunu kendimiz handle etmeliyizki zaten eger biz new Error("bulunamadi") bir mesaj  yazarsak response da onu gidip error da error.message diyue alabiliriz....
export async function handleResponse(response){//gelen response u parametre olarak aliyor
if(response.ok){// returns true if the response returned successfully
    //response sonucuna gore karar verecek bir durum olusturduk
    return response.json();
}
const error=await response.text();
throw new Error(error);//catch de yakalamasi icin bu hata mesajini yaziyoruz bizim yazdigimiz hata mesaji zaten catch de gelecek, yani biz response.text den gelen mesaji 
}
export function handleError(error){
  console.log("Bir hata olustu!");
    throw error;
}

//Ekledigimiz veya guncelledgimiz veriye eger ihtiyacimiz yok ise bir reducer yazmamiza gerek yok ekleme ve guncelleme aksiyonlari icin,ama yok ekledigimiz veya guncelledigimiz bilgiyi tekrar kullanacak isek o zaman reducer yazabiliriz.Ekleme ve guncelleme islemlerinde bize geriye ekledigmiz veya guncelledigmiz veri donecektir


//BIR FONKSIYONUN HEM PARAMETRELI EGER TIKLANMISSA, HEMDE PARAMETRESIZ HALINI EGER CATEGORYE TIKLANMAMISSA SEKLINDE CALISTIRABILIRIZ..BUNU KESINKLIKLE MANTIK OLARAK OGREN...
//Bu fonksiyona dikkat edelim iste bu bestpractise-ve javascriptin parametre versek de vermesek fonksiyonun calismasi ozelligi, javascripte has olan ozelligi kullaniyoruz onu avantaja donusturuyoruz resmen burda, bu ozelligi baska dillerde kullanamayiz yok boyle birsey
//Oncelikle sunu bilelim biz getProducts fonksiyonunu hem useEffect icinde componentDidMountu taklit ederek kullaniriz hic parametre almadan, hem de gidip categoryAction icinde yazdigmiz changeCategory fonksiyonunu calistirdigimiz CategoryList componenti icinde yazdigimiz selectCategory fonksiyonu icinde getProducts i calistirarak, orada da parametreli halini kullanmis olacagiz...
//BURASI MUKEMMEL BIR OLAY...BESTPRACTISE...
export const getProducts = (categoryId) => {
  return async function (dispatch) {
    //dispatch action imizin devreye girmesini sagliyordu..
    let url = "http://localhost:3004/products";
    if (categoryId) {
      url = url + `?categoryId=${categoryId}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    dispatch(getProductsSuccess(data));
  };
};
