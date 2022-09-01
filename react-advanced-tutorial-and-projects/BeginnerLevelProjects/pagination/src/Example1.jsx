import React,{useState,useEffect} from 'react'
import { getPostsPage } from './api/axios';
import Post from './Post';

const Example1 = () => {
    const [posts,setPosts]=useState([]);
    const [page,setPage]=useState(1);//Bu kacinci sayfanin geldigi
    console.log("posts: ",posts);

    useEffect(()=>{
        getPostsPage(page).then(json=>setPosts(json));
    },[page])

    const content=posts.map(post=><Post key={post.id} post={post}/>)

    const nextPage=()=>setPage(prev=>prev+1);
    const prevPage=()=>setPage(prev=>prev-1);
  return (
    <>
    {/*Eger 1. sayfada isek previous passive olmali cunku 1 den daha geride sayfa olmayacak kullanici gidp de ona basmamali
    Ya da total sayiyi vs burdan gelen endpointte bilmedigmizden dolayi  burda, eger posts gelmez ise yani bos  gelirse o zaman next de olmasin diyoruz eger biz total product sayisini bilse idik o zaman data nin son elemanina gelnce de next butonun passive yap dememiz gerekkyordu
    ki kullanici son sayfaya gelinmesine ragmen hala gidip te next te basmasin diye..
    */}
    <button onClick={prevPage} disabled={page===1}>PrevPage</button>
    <button onClick={nextPage} disabled={!posts.length}>NextPage</button>
    {content}
    </>
  )
}

export default Example1