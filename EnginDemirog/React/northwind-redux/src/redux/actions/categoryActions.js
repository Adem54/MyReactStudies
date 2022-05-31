import * as actionTypes from "./actionTypes";


//Categorye tikladigimizda calisacak olan event bu olacak
export function changeCategory(category){
    return {
        type:actionTypes.CHANGE_CATEGORY,//reducer da CHANGE_CATEGORY yi gordugu zaman state i payload da verdigimiz category degeri olarak set etmis olacagiz...Tabi bu arada biz dogrudan category diye de verebiliriz eger istersek, yani shortHand kullanim da yapabiliriz istersek....
        payload:category
    }
}




export function getCategoriesSuccess(categories){
    return {
        type:actionTypes.GET_CATEGORIES_SUCCESS,
        payload:categories
    }
}
export function getCategories(){//redux-thunk ile biz api den veri cekme gibi asenkron olaylarimiz icin kullanilirz
    //getCategories icerisnde ayrica bir fonksiyon donduren bir operasyonu icerisinde barindiracak
    //dispatch isimli bir parametre geciyor ve aslinda burda biz bu parametre ile kendimiz yukarda changeCategory gibi bir yapiya hazirlaniyoruz
    return async function(dispatch){
     //   debugger;
        let url="http://localhost:3004/categories";
        return fetch(url)
        .then(response=>response.json())
        .then(result=>dispatch(getCategoriesSuccess(result))) 
        //dispatch(yaklaamk demek
        //gelirken kendisi json olsa bile onu bizim sistemimiz json olarak algilamiyor onu string olarak algiliyor ondan dolayi json a cevirmeliyiz.Response her zaman string olarak donuyor ve json a cevrilmelidir
    }
}
//Bizim sistemimizin changeCategory gibi bir  yapi dondurmesi gerekiyor cunku redux bundan anliyor
//getCategoriesSuccess bizim yapimizin redux in anladigi yapiya donmesini sagliyor
//Dispatc Ne is yapar?
//dispatch bizim aksiyonlarimizin calismasini sagliyor genel olarak.Dispatch burda bizim redux action operasyonumuzu yakalayip, ona asenkron olarak gelen, apiden gelen veri yi parametre olarak aktariyor.....

