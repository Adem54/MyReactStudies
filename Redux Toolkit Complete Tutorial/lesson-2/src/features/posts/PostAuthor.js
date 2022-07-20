import React from "react";
import {selectAllUsers,} from "../users/usersSlice";
import { useSelector } from "react-redux";

const PostAuthor = ({ userId }) => {
  //Bu her bir post a ait yazari bulmak icindir...
  const { users } = useSelector(selectAllUsers);
  //userId buraya PostList den props olarak gonderilecek....Post listesinde biz eklerken userId de ekliyorduk...
  const author = users.find((user) => user.id === parseInt(userId));
  //Bu tarz bir id uzerinden, bir dizi icinden obje alirken bu objenin bulunamama ihtimaline
  //binaen de bir alternatif ekrana ne yazilacaksa planlanmalidir ve bu ana yapilmasi gereken bir islemdir
  //Cok cok ekstra birsey degildir...bunu mutlaka dusunmeliyiz....
  return <span>by {author ? author.name : "Unknown author"} </span>;
};
export default PostAuthor;
/*
BESTPRACTISE...COOK ONEMLI.....
Biz users listesini de api den alacagiz ama users lari biz PostAuthor componenti 1 postu temsil ediyor 
Ve bizim gelip bu sayfada users lari almak icin, useEffect yapmamiz cok yanlistir cunku burasi ornegin
100 post var ise 100 kez render edilecek, her render da gidip api den users lari getirmis olur o zaman
Ondan dolayi biz bunu mantik olarak, 1 kez calisacak ya da en ustteki componentlerden birinin icinde yapmanuz gerekir
Ki, ondan dolayi biz de gidip bunu index.js ana component te store icinde de dispatch methodu old icin hic
useEffect yapmadan bile store.dispatch(fetchUsers()) diyerek users lari almis oluruz..
Simdi soyle dusunelim bizim users lara hem AddPostForm da ihtiyacimiz var hem de, PostAuthor da ihtiyacimiz var
Biz bunu gidip mesela PostList icinde useEffect ile de alabilirdik aslinda...ama bu da cok farkli bir acidan yaklasma demek...
*/