import React,{memo} from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "./usersSlice";
import { selectAllPosts, selectPostByUser } from "../posts/postsSlice";

const UserPage = () => {
    // console.log("UserPage rerendered");
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  //Bu sayfaya hangi user id ile gelindi ise o userId ye ait postlari aliyoruz...dikkat edelim burda bestpractise var...
  //Birden fazla islem yapmak ister isek useSelector parantezi icerisinde iste bu sekilde yapabiliriz...
//   const postForUser = useSelector((state) => {
//     const allPosts = selectAllPosts(state);
//     return allPosts.filter((post) => post.userId === Number(userId));
//   });//filter islemi yeni bir array donuyor, her bir increase islemi dispatch edildiginde useSelector calisiyor ve burda yeni bir array olusuyor, Ram de ve her seferinde, bu da userPage icinde herhangi bir degisiklik olmamasina ragmen render edilsmesini sagliyor....Bu performans icin skntili bir durum
  //bu gereksiz render i nasil onleyecegiz...
 const postForUser=useSelector(state=>selectPostByUser(state,Number(userId)));

  const postTitles = postForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));
  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{postTitles}</ol>
    </section>
  );
};

export default UserPage;
