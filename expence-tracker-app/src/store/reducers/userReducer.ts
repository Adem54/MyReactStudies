import { User, userAction, UserState } from "../../types/user";
//Bir tane defaultState degerleri atamamiz gerekiyor..
//Bu her zaman adetimiz olsun, state lerimizde her zaman
//default degeri olmalidir...
const defaultState:UserState={
    data:{} as User,//Normalde direk bos bir obje veriyoruz hata veriyor
    //cunku, data objemin tipi User idi.Biz as User diyerek sen bu bos
    //objeyi User tipine cast et demis oluyoruz..BESTPRACTISE bu sekilde yapariz..
    loading:false,
    error:""
}
const userReducer=(state:UserState=defaultState,action:userAction)=>{
   switch (action.type) {
    case "LOGIN_START":
    case "IS_LOGGED_IN_START":
        return {...state,loading:true,error:""};
   case "LOGIN_SUCCESS":
   case "IS_LOGGED_IN_SUCCESS": 
    return {...state,loading:false,data:action.payload};
    case "LOGIN_ERROR":
        return {...state,loading:false,error:"Login failed"};
    case "IS_LOGGED_IN_ERROR":
        return  {...state,loading:false,error:"Token missing or invalid"};
    case "LOGOUT":
        return  {...state,data:{} as User};  
    default:
        return state;
   }
}

export default userReducer;