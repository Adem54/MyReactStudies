import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectPostById,deletePost, updatePost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useParams, useNavigate } from "react-router-dom";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  const dispatch = useDispatch();
  //BESTPRACTISE.....ONEMLI...
  //Ilk, baslangic degerini, id si gelen, post un title i olarak veriyoruz ki,
  //bu sadece gelirken, o degeri alsin ama form yine bizim kontrolumuzde olsun....
  //Ondan dolayi, value her zaman state te verdgimiz title olur, ama state olara ilk degere
  //id si gelen title degeri verilir ki, sayfa acildiginda da, mevcut datalr gelsin, ve kullanici isterse
  //degistirsin, isterse degistirmesin kendine birakalim....
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body); //optional chain..bizi kurtariyor (?) burda bestpractise
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");
  console.log("requestStatus: ",requestStatus);
  //Buralar bestpractise dikkat edelim, edit sayfasindaki status durumu edit componenti icinde ele aliniyor
  const users = useSelector(selectAllUsers);

  //Bu cok onemli bir bestpractise dir ve mutlaka uygulanmalidir....
  //Burda dikkat edecegimiz bir husu var
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onUpdatePostClicked = () => {
  
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();//hata firlatirsa catch bloguna atar, burasi promise i temsil ediiyor
        //burayi kullanmasa idik o zaman, kendimiz burda async-await islemlerini yapmali idik
        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`)//useParams uzerinden gelen id
      } catch (err) {
        console.error("Failed to edit the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

const onDeletePostClicked= ()=>{
    try {
        setRequestStatus("pending");
       dispatch(deletePost({id:post.id})).unwrap();
    setTitle("");
    setContent("");
    setUserId("");
    navigate("/")
    } catch (err) {
        console.error("Failed to delete the post", err);
        
    }finally {
        setRequestStatus("idle");
      }
}

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" defaultValue={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onUpdatePostClicked} disabled={!canSave}>
          Edit Post
        </button>
        <button className="deleteButton" type="button" onClick={onDeletePostClicked} >
          Delete Post
        </button>
      </form>
    </section>
  );
};
export default EditPostForm;

//COOK ONEMLI....BU PROBLEM ILE COK KARSILASABILIRIZ...
//Cozulmesi gereken baska bir durum daha var, o durum ise sudur ki
//Biz,edit e tikladigmiz zaman, yeni datalar, gelene kadar eskisini gosteriyor edite tiklaninda navigate ile
//poste detayinda yonlendiridimgiz icn, bunun neden i su ki biz o sayfaya yonlendiiriyoruz ama, put, update islemi
//asenkron ve endointten gelene kadar o sayfada ne var sa tabi ki onu gosterecek ama eger bunu slice tarafinda put update isleminin
//status durumunu da tutar isek yani pending durumunu o zaman burdan alip istedgimiz componentte status durmunu kulllanabiliriz
//VE gider singlePostPage de deriz ki update islminin state durumu loading iken sen updating yaz, data gelince de zaten datayi yazar