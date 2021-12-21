import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

//categories in initialState i array olacak karistirmayalim cunku icerisinde birden fazla categori obje listesi olacak ve biz gidip initialstateimiz genel objemize, bir tane de categories:[] isminde karsiligi dizi olan property yazariz...
export default function categoryListReducer(state=initialState.categories,action){
    switch (action.type) {
        case  actionTypes.GET_CATEGORIES_SUCCESS:
         return action.payload   //reducer bizim icin state donderiyor o anki guncellenmis statei tutuyor ve hangi componentin ihtiyaci varsa ona abone oluyro ve o state erisebiliyor
            
    
        default:
            return state;//herhangi bir askiyon olmaz ise default state i donderecek
    }
}
