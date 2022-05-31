import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function changeCategoryReducer(state=initialState.currentCategory,action){
    switch (action.type) {
        case  actionTypes.CHANGE_CATEGORY:
         return action.payload   //reducer bizim icin state donderiyor o anki guncellenmis statei tutuyor ve hangi componentin ihtiyaci varsa ona abone oluyro ve o state erisebiliyor
            
    
        default:
            return state;//herhangi bir askiyon olmaz ise default state i donderecek
    }
}

//HER STATE E BIR REDUCER YAZMALIYIZ--BU ONEMLI!!!!
//Genel yapilan hatalrdan bir tanesi categori ile ilgili var olan state degistirilemeye calisilir bu yanlistir neden, cunku oncelikle reducer cok basit bir yapiya sahiptir ve tek bir state yonetir ve yonettigi state tek bir categori burda ama bizim elimizde yeni bir categori listesi yani bir suru categoriden olusan bir listemiz var.Yani gelip de bizim sadece categoryyi degistirmek icin yazdigmiz reducer da ki state e mudahele edip bunu degistirmeye calismak yanlistir cunku bize yeni bir state lazim icerisine kategori listesini koyabilecegimiz...o zaman yeni bir reducer yazacagiz demektir buda yani kisaca bizim her bir state imiz icin bir reducer yazmamliyiz biz...
//Onun icin category listemizi olusturmak icin categoryActions icinde yazdimigiz apiden cektigimiz aksiyonumuzdan aldigimiz categories verisini state e atip stateimizi guncellemek icin biz bir tane categoryListReducer isimli bir reducer olusturuz