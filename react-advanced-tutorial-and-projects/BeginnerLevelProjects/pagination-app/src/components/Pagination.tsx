import {useQuery} from "react-query";
import { getAllUsers, getUsers } from "../api/usersApi";
import { useState,useEffect } from 'react';
import { useContextUser } from "../context/UsersContext";
import { User as UserType } from "./user.model";
import User from "./User";
import PaginationButton from "./PaginationButton";
import { getLastTenElementsInArray } from "../utils";
const Pagination = () => {
  const [perPage,setPerPage]=useState<number>(10);
  //Sunu da anlayalim, biz her bir sayfada kac data olacagini kendimz manuel burdan dirak kodda veriyoruz ama istersek bunu bir select-option ile kullaniciya sectirebiliriz..5-10-20 gibi secenekler sunariz kullanici kac data birden gormek isterse o kadar listeler sayfada ...
  const [page,setPage]=useState<number>(1);  
  const {users,setUsers}=useContextUser();

 const {data:allUsers}=useQuery("allUsers",getAllUsers);
  
const {
  data,
  isLoading,
  isSuccess,
  isError,
  error,
  isFetching,
  isPreviousData,
}=useQuery(["/users",perPage*page],()=>getUsers(perPage*page),{
    keepPreviousData:true,
})  


/*Optimistik data, isSuccess e guvenip data geldi farzedip data yi context imizde ki state timze aktariyoruz.. */
useEffect(()=>{
if(isSuccess){
setUsers(data);
}
},[isSuccess,data,setUsers,page])
    





 let pagesArray=Array(10).fill(0).map((item:number,index:number)=>index+1);



 let filteredUser=getLastTenElementsInArray(users)

let content=filteredUser?.map((user:UserType)=><User key={user.id} user={user}/>)
// console.log("users: ",users);
// console.log("filteredUser: ",filteredUser);
// console.log("data: ",data);

const nextPage=()=>{
    setPage(prev=>prev+1);
   
}

console.log("data.length: ",data?.length);
console.log("(page)*perPage: ",page*perPage);
console.log("isPreviousData: ",isPreviousData);

/* page 1 artar artmaz sunu kontrol ediyoruz total data sayisi, page sayisinin artmasindan sonr perPage ile carpilarak beklenen total data sayisina esit mi yani yeni data mi gelmis yoksa, eski datayi tekrar mi etmis onu kontrol ettik,eger yeni data gelmis ise problem yok aynen devam ama yok data tekrarlanmis ise demekki baska data yok o zaman da basa don diyoruz... */
useEffect(()=>{
    console.log("useEffect");
 if(isSuccess && !isPreviousData && data.length<(page)*perPage){
    console.log("result...",data.length<(page)*perPage)
        setPage(1);
    }//gelen data degismedii ise
},[data,page,setPage,perPage,isSuccess,isPreviousData])

/* 1 den once data olmadidgi icin preve e basinca biz en sondaki dataya gitsin yani 10 a gitsin diyoruz, ama bir bir yaklasimdir, ayni sekilde 1 de iken kullanici hic previous a basmamasin istersek de previous butonunu kullanici 1 butonuna basar basmaz disabled yaparak saglayabiliriz bu da farkli bir yaklasimdir
<button disabled={page===1 ? true :false} onClick={prevPage}><i className="fa-solid fa-angles-left"></i></button> 
*/
const prevPage=()=>{
    if(page===1){
        setPage(10);
    }else{
        setPage(prev=>prev-1);
    }  
}
// console.log("page: ",page);
const values={
    page,
    pagesArray,
    setPage
}
  return (
    <div>
      <main className="main">
      {content}
      </main>
      <section className="pagination-pages">
         {/*<button disabled={page===1 ? true :false} onClick={prevPage}><i className="fa-solid fa-angles-left"></i></button> */}
        <button  onClick={prevPage}><i className="fa-solid fa-angles-left"></i></button>
        <PaginationButton {...values} />
        <button onClick={nextPage}><i className="fa-solid fa-angles-right"></i></button>
      </section>
    </div>
  )
}

export default Pagination
