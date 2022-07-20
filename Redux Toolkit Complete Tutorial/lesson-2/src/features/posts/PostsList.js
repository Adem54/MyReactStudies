import React from "react";
import {
  selectPosts,
  fetchPosts,
  getPostsStatus,
  getPostsError,
} from "./postsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(selectPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  // console.log("posts: ", posts);
  // console.log("error: ", error);
  // console.log("postsStatus: ", postsStatus);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]); //dependencyleri girmemiz gerekiyor

  //posts.slice() islemi posts dizisini kopyalama islemidir, shallow copy, yani referanslar ayni, memory de yeni bir yer acmiyor
  //ayni adresi baska bir degisken ile tutuyor
  //[...posts] bunun la ayni islemdir ama burda referanslar farkli deepcopy yani memory de yeni bir yer acip ona kopyaliyor
  //sort parametrede karsilastirilacak ilk 2 data neye gore karsilastirilacaksa hepsi ona gore karsilastirilarak ekrana basilacak
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  //Dogal siralamayi tersine cevirmis olunuyor cunku dogal siralam a dan b ye dogru idi ama
  //b.date.localCompoare yapip a parametreye koyulursa o zaman -1 gelir ve siralama tersine cevrilir
  //Normalde kendisi otomatik olarak en eski posttan en yeni posta gore siralaniyordu ama biz bunu
  //en yeni posttan en eski posta gore siralanmasini istiyoruz...

  const renderedPosts = orderedPosts.map((post, index) => {
    return <PostExcerpt key={index} post={post} />;
  });

  let content;
  content =
    postsStatus === "loading" ? (
      <p>Loading....</p>
    ) : postsStatus === "succeeded" ? (
      renderedPosts
    ) : postsStatus === "failed" ? (
      <p>{error}</p>
    ) : (
      ""
    );

    // let content;
    // if (postsStatus === 'loading') {
    //     content = <p>"Loading..."</p>;
    // } else if (postsStatus === 'succeeded') {
    //     const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    //     content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post} />)
       
    // } else if (postsStatus === 'failed') {
    //     content = <p>{error}</p>;
    // }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
