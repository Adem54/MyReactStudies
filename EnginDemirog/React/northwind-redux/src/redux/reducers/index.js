//Burasi reducer lari birlestirdigmiz dosyamizdir
import { combineReducers } from "redux";
import changeCategoryReducer from "./changeCategoryReducer";
import categoryListReducer from "./categoryListReducer";
import productListReducer from "./productListReducer";
import cartReducer from "./cartReducer";
import saveProductReducer from "./saveProductReducer";
import "alertifyjs/build/css/alertify.min.css";

const rootReducer=combineReducers({
    changeCategoryReducer,categoryListReducer,productListReducer,cartReducer,saveProductReducer
})
//shorthand kullanimdir bu eger property degisken olarak geliyorsa biz bu notasyonla yazabiliriz shortHand kullanim bu...
export default rootReducer;