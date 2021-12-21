import {createStore} from "redux";
import reducers from "./index";
 function configureStore(){
    return createStore(reducers);//Burda bir store magazamiz veritabani gibi dusunebiliriz, ve ona parametre olarak state i yoneten ve guncelleyen nesnelerini aliyoruz buraya..Dikkat ettik mi store u olustururken reducer lar paramtre oolarak aliyor, state i donduren reducar lar..
}
export default configureStore; 