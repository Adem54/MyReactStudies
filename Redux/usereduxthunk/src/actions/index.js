import axios from "axios";

/*Olayi kisaca ozetlemek gerekirse biz neden thunk kullaniyorzu middleware kullaniyoruz, 
biz api den data cektigimiz icin asenkron bir islem yapiyoruz ve de reducer a gonderecegimiz
 data normalde action objesi olmaliddir ve type zorunlu payload optional ve obje olmalidr 
 ama bize gelecek olan data dizi olarak geliyor ve istenilen sekilde pure sekilde degil 
 ve redux burda tam anlayamiyor ve redux in kendi dispatch i devreye girmiyor o zaman da 
 araya bir middleware sokuyoruz redux-thunk ile ve biz dispatch islmeini manuel olarak kendimiz yapmis olyoruz....
*/

export const getCountriesStart = () => {
    return {
      type: "GET_COUNTRIES_START",
    };
  };
export const getCountriesSuccess = (countries) => {
  return {
    type: "GET_COUNTRIES_SUCCESS",
    payload: countries,
  };
};

export const getCountriesError = (error) => {
  return {
    type: "GET_COUNTRIES_ERROR",
    payload: error,
  };
};
/*
Biz dogrudan bizim reducer a gonerecegimiz action dondurecegimiz fonksiyon icinde tabi ki api 
islemimizi yapamayacagiz cunku daha oncesinde bizim ayri biryerde api islemini bir middlware 
araciligi ile, redux un anlayacagi sekilde gondermemiz gerekir..
Bu getCountries de su yapilacak, getCountries bir fonksiyondur o da bir fonksiyon daha dondurecek,
 dispatch fonksiyonunu parametre olarak alacak, icerde artik biz dispatch yaparken manuel olarak 
 dispatch islemi yapacagiz....action i biz dispatch araciligi ile gonderecegiz...reducer da redux in 
 alayacagi sekilde pure func olabilmesi icin
*/

export const getCountries = () => (dispatch) => {
    dispatch(getCountriesStart());
  axios
    .get("https://restcountries.com/v3.1/all")
    .then((response) => dispatch(getCountriesSuccess(response.data))) 
    //baglanma sirasinda bir hata olursa yine bir dispacth islemi yapariz
    .catch((error) => dispatch(getCountriesError(error)));
};


/*Bu sekilde bir fonksiyon icinde de yazabiliriz api get islemi ile tum countries leri 
alacak sekilde ya da alternatif olarak da 3 paraya bolup de yapada bilriiz....yukardaki gibi....
*/
export const getAllCountries = () => (dispatch) => {
    dispatch({ type: "GET_COUNTRIES_START"});
  axios
    .get("https://restcountries.com/v3.1/all")
    .then((response) =>
      dispatch({
        type: "GET_COUNTRIES_SUCCESS",
        payload: response.data,
      })
    ) //baglanma sirasinda bir hata olursa yine bir dispacth islemi yapariz
    .catch((error) =>
      dispatch({
        type: "GET_COUNTRIES_ERROR",
        payload: error,
      })
    );
};
