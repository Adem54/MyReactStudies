import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { MenuType } from "../../model/menu.model";

interface initialStateType {
  items: MenuType[];
  status: string;
  category: string;
  searchText:string;
}

export const initialState: initialStateType = {
  items: [] as MenuType[],
  status: "idle",
  category: "All",
  searchText:"",
};

const menuSlice = createSlice({
  name: "foodMenu",
  initialState,
  reducers: {
    getFoodMenu: (
      state: initialStateType,
      action: PayloadAction<MenuType[]>
    ) => {
      state.items = [...action.payload];
      state.status = "succeeded";
    },
    getMenuBtCategory: (
      state: initialStateType,
      action: PayloadAction<string>
    ) => {
      console.log("action.payload: ", action.payload);
      state.category = action.payload;
    },
    searchMenu:(state:initialStateType,action:PayloadAction<string>)=>{
            state.searchText=action.payload;
    }

   
  },
});

export default menuSlice.reducer;

export const { getFoodMenu,getMenuBtCategory,searchMenu } = menuSlice.actions;

export const selectFoodsOfMenu = (state: RootState) => state.menu.items;
export const selectStatus = (state: RootState) => state.menu.status;
export const selectCategory=(state:RootState)=>state.menu.category;
export const selectSearch=(state:RootState)=>state.menu.searchText;
//RootState bu store da duran state, yani en tepedeki state bu

export const filteredByCategory=(state:RootState)=>{
    const category=state.menu.category;
    if(category ==="All"){
        return state.menu.items;
    }
    return state.menu.items.filter((item:MenuType)=>item.category.toLowerCase()===category.toLowerCase());
}

export const filterSearchMenu=(state:RootState)=>{
    const filteredItems=filteredByCategory(state);
    const searchText=state.menu.searchText;
    return filteredItems.filter((item:MenuType)=>item.title.toLowerCase().includes(searchText.toLowerCase()) || item.desc.toLowerCase().includes(searchText.toLowerCase()))
}

/*
Konuyu bir kez daha ele alalim
Biz filtreleme islemlerinde kesinlikle ana data ya dokunmayz cunku ana data da hicbir degisiklik yapilmaz, o sadece
filtreleme isleminde kullanilir, peki degisen nedir degisken filtrelem kriteridir dolayisi ile bizim action, fonksiyu olarak
yazacagimz tek fonksiyon, tiklandiginda hangi category gelecekse, state icinde tuttugmuz o filtreleme kriterini kullanicinin
tiklamsina gore degistirmek...Gerisini iste yukarda yaptigimz gibi filtreleme islemini burda yapip merkezilestirmis oluruz ve
burdan direk filtrelenmis olarak, kullanacagimz componente gondeririz, normalde bunu, filtreleme fonksiyonunu gidip biz,
component icinde de yapabilirdik, nihayetinde bizim, o an da aktif olan category ye ihtiyacimz var...

Filtrelem, search gibi islemler yaparken once api endpointinde, filtreleme ve search islemleri ile iligli bir endpoint var mi ona bakariz
var ise zaten bu islem bir get  request islemidir ve de endpoint uzerindeki url de ki filtreleme icin beklenen datalari biz,
dinamik olarak veririz ya da ayni mantigi, fullstack projede axios ile, params:{ } seklinde request in icinde gonderilmisti
Yok eger endpointte filtreleme ile ilgili bir sey yok ise o zaman biz lokalde tuttugmuz data uzerinde kendimiz filtrelemeyi yapacagiz

*/