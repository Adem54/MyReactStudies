import './App.css';
import FoodMenu from './pages/FoodMenu';
import { useGetAllFoodsQuery } from './services/menuApi';
import {useMemo} from "react";
import { makeFirstLeterUpper } from './utilities/firstLetterUpper';
import { MenuType } from './model/menu.model';
import {getFoodMenu,selectFoodsOfMenu,selectStatus,selectCategory,getMenuBtCategory,filteredByCategory,selectSearch,searchMenu,filterSearchMenu} from "./features/menu/menuSlice";
import { useAppDispatch, useAppSelector } from './app/hooks';
import {useEffect,useState} from "react";

function App() {
  const [category,setCategory]=useState<string>("");
  const [search,setSearch]=useState<string>("");
  const [searchText,setSearchText]=useState<string>("");
  //Eger onClick icerisindeki, data yazildiktan sonra almak istersek buton conclick islemi icerisinde
  //tum inputu alabiliriz..
  const inputSearch=useAppSelector(selectSearch);
  console.log("inputSearch: ",inputSearch);
  const {data:menu,isLoading,isError,isSuccess,error}=useGetAllFoodsQuery();
  
  const dispatch=useAppDispatch();
  const selectMenu=useAppSelector(selectFoodsOfMenu);
  const status=useAppSelector(selectStatus);
  const selectedCategory=useAppSelector(selectCategory);
 const filteredData=useAppSelector(filteredByCategory)
 const searchedMenu=useAppSelector(filterSearchMenu);



  useEffect(()=>{
    if(isSuccess){
      dispatch(getFoodMenu(menu))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isSuccess])



let items=menu?.reduce((acc:any,value:any)=>
{
 return acc.includes(value.category) ? acc : [...acc,value.category]
}
,["All"]);

/* Neden filtrelemyi arkada yapmiyoruz cunku ana data ile ilgili bir degistirme islemi yapmiyoruz..dikkat edelim
Ana dataya eger bir ekleme, cikarma,toggle durumu, uzak api den data alma, yani state in icindeki herhangi datanin
degistigi her durum icin, evet biz menuSlice a gitmeliyiz ancak, filtrelem islemi nde ana dataya zaten dokunlmiyor sadece ana data kullanilarak 
bir filtrleme olusturulmus olunuyor..
*/

useEffect(()=>{
 
},[searchText]);

//Artik biz kullaniciya datayi kendi menuSlice daki lokal stateimizden gonderiyoruz..
const values={
  menu:searchedMenu,isLoading
}

/*
1-Oncelikle api den gelen datayi, biz lokal state timizde de tutmak icin oraya aktaralim
Nasil yapariz soyle ki, optmistik data dedgimiz rtk-query ile, isSuccess ornegin geliyor
Biz isSuccess i useEffect icinde, dependency array e koyarak, isSuccess ise yani isSuccess true gelmesi
durumunda biz tamam demekki api den data gelmis diye kabul ederek optmistik data yi, lokal
state timize aktaririz
2-Ardindan da lokal state timiz uzerinden, biz datayi ekrana basariz
3-Sonra da artik tum dinamiklikleri biz redux-tool kit ile lokal state timiz uzerinden kullanarak yapariz
category ye gore data lari listeleme gibi islemleri ornegin..

*/

  return (
    <div className="App">
     <main className="main">
    <h1 className="h1">Our Menu</h1>

   <section className="search" >
    <input  className="input form-element" placeholder="search food"
    value={search}
    onChange={e=>setSearch(e.target.value)}
   onFocus={e=>e.currentTarget.placeholder=''}
    />
    <button className="btn form-element"
    onClick={()=>{
      dispatch(searchMenu(search))
      setSearchText(search);
      setSearch("");
    }}
    
    >Search</button>
   </section>
    <nav className="nav-menu">
      <ul className="nav-ul">
       {items?.map((item:string)=><li key={item}
        className={`${selectedCategory === item && 'active'}`}
       onClick={()=>dispatch(getMenuBtCategory(item))}
       >{makeFirstLeterUpper(item)}</li>)}
      </ul>
    </nav>
    <section className="container">
    <FoodMenu {...values}/>
    </section>
      </main>  

    </div>
  );
}

export default App;
