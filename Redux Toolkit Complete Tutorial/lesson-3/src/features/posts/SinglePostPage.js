import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useParams,Link } from "react-router-dom";

const SinglePostPage = () => {

  const { postId } = useParams();
  //Bilmek onemli, useParams uzerinden gelen, id, her zaman string gelir, find ile o id ye ait datayi almak icin
  //id yi number a ceviririz
  // <Route path=":postId" element={<SinglePostPage />} /> burda hangi id li post a gidilirse bir tiklama ile o id li post
  //sayfasina gidecek ve o url i goreceiz adres cubugunda iste o id nin hangisi oldugnu biz, o id li datanin gosterilecegi
  //component te useParams araciligi ile alabiliyoruz...
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  //BESTPRACTISE...BU COK  KARSILASACAGIMIZ BIR DURUM...COK IYI ANALIZ ETMELIYIZ....
  //PostExcerp te Link uzerinden tiklanarak post detayina gidildiginde o id li post a gidildigi zaman
  //sayfa yenilenmedigi icin ve de uygulama ilk aciligidiginda gelen posts datalari korundugu icin Link uzerinden¨
  //post un detayin a gidilebiliyor ancak, dogrudan url e adres girerek ya da detay sayfasina link ile geldikkten sonra
  //sayfayi yenileme durumunda post datalari uctugu icin Post not found gelecektir...
  //Bunu nasil handle ederiz???BESTPRACTISE...Bunu 2 sekilde handle ederiz?
  //1.si dogrudan bu sayfada lokal olarak detail endointinden direk axios ile aliriz bu sayfa mount edilir edilmez datalari aliriz
  //ama tabi detail endpointi id belirtilmesi gerekir useEffect icinde kullanirken dependency array icine id konurki her farkli id geldiginde 
  //useEffect icnndekki endpointe request gonderme yenilensin ve gelen id endointine istek gonderilebilsin...
  //useEffect icerisinde, ve bu sekiilde bu component yuklenir yuklenmez datasi ile gelir, buna yakin olarak da yine tum postlari
  //burda useEffect icinde de alabiliriz....
  //Ya da bunu da yeni yapiyourz kii bunu da uygulayabiliriz, biz ana index.js in icinde ki store objesinin
  //icinde dispatch property si var ve aynen users lari orda aldigimz gibi, biz tum post lari da orda dispatch icnde
  //calistirabiliriz ve bu sekilde, datalar uygulama yenilendiginde de gelmis olur....

  //Burda id gelmeme durumu ve post un bulunmama durumunu cok iyi yonetmeliyiz ki, uygulama patlamasin
  //bunu cok iyi yonetmeliyiz ondan dolayi, bu temel yapilmasi gereken ozelliklerdendir, eger post yoksa
  //senaryoumuz nedir bunu her zaman planlamaliyiz....BESTPRACTISE....
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }


  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
