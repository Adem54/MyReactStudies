import React, { useEffect } from 'react'
import {useQuery,useMutation,useQueryClient} from "react-query";
 import {getUsers,addUser,updateUser,deleteUser} from "./api/usersApi";
import * as api from "./api/usersApi";
import User from './User';


const UserList = (props) => {
    const queryClient=useQueryClient();

    //useQuery icine cache icin key olacak bir string yaaziyoru users dedik biz buna, queryKey="users"
    //cache deki farkli query ler icn farkli key verilmeli
    const {data:users,isLoading,isError,isSuccess,error}=useQuery("users",getUsers);
    /*const {data:users,isLoading,isError,isSuccess}=useQuery("users",getUsers,{
      retry:false
    }); */
    //retry false yapinca, ornegin request te veya reponse da bir problem yasanip da data gelmedigi zaman, normalde kendisi arka arkaya 3-4 kez ayri ayri istek gondeiriyor iste retry false deyince bu islemi 1 kez yapar ve datayi alamazsa tekrar tekrar istek yollamiyor...bunu google chrome arka console panelde nettwork menussunden takip edebiliriz
    //users cache de(browser da) yer rezerve ediliyor onun icin ve ["users"] bu sekilde tutuluyor ki bundan sonara baska, query data larda tutulabilsin diye

    useEffect(()=>{
        if(isSuccess){
            console.log("users: ",users);
        }else if(isError) {
            console.log("Bir hata olustu")
        }
    },[isSuccess,users,isError])

    let content;
    if(isLoading){
      content= <div>Loading..</div>
    }else if(isSuccess){
      content= <ul>
      {users?.map(user=>(
     <User key={user.id} data={user} {...props}/>
      ))}
    </ul>
    }else if(isError){
      content=<h4>{error.toString()}</h4>
    }
  return (
    <div>
   {content}

    </div>
  )
}

export default UserList