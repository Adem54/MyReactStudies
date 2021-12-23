import axios from "axios";
/*
export const getSuccessCountries=(countries)=>{
    return {
        type:"GET_SUCCESS_COUNTRIES",
        payload:countries
    }
}
export const getCountries=()=>{
    return dispatch=>{
        axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => dispatch(response.data))
      .catch(error => console.log({ error }));
    }
}  */
//Yukardaki yontem de bir yontemdir yapilabilir, bu asagidakinde de bir kerede yazmis olduk..
//getCountries fonksiyonu yine bir fonksiyon donduruyor ve dondurdugu fonksiyonda dispatch fonksiyonunu parametre olarak aliyor
export const getCountries=()=>dispatch=>{
    dispatch({type:"GET_COUNTRIES_START"})//loading aninda burasi type olarak reducer a gidecek
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => dispatch({type:"GET_COUNTRIES_SUCCESS",payload:response.data}))
    .catch(error => dispatch({type:"GET_COUNTRIES_ERROR",payload:error}));
}