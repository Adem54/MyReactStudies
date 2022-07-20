import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { addNewPost } from "./postsSlice";
const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const {users} = useSelector(selectAllUsers)

  //BESTPRACTISE...addNewPost islemi slice icinde yapiliyor ama status durumu component icinde handle ediyoruz
  //slice icinde yapmiyoruz dikkat edelim....
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  //BESTPRACTISE...Bizim butonumuz artik tilandigi zaman bir end-pointe post istegi gonderdigi icin
  //bu tiklanmayi da kontrol altina almamiz gerekiyor  yani gelen kullanici arka arka ya surekli basarak
  //data gondermemesi gerekiyor ondan dolayi da ,hem alanlarin hepsi dolu oldugunda hem de  status idle oldugunda buton aktif olsun diyecegiz
  // const canSave = Boolean(title) && Boolean(content) && Boolean(userId);
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        console.log("here")
        dispatch(addNewPost({ title, body: content, userId })).unwrap();
        //redux-toolkit unwrap ile bize promise donuyor ve biz ondan dolayi da 
        //try-catch icinde kullaniyoruz ki biz bunun  yerine dogrudan async-await de kullanabilirdik burda...
        setTitle("");
        setContent("");
        setUserId("");
      } catch (error) {
        console.error("Failed to save to post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  //Tek satir islemimiz var ise hic suslu parantze gerek yok..krøll pranez,brackets
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);
  //Burda hangi option a tiklanirsa onun id si e.target.value oluyor
  //ve de users lar icindeki id leri value ye veriyozu map icinde
  //Dolayisi ile hangi user tiklanirsa o user in id si stete e ataniyor

  //Dikkat edelim map ile dondurdgumuz users in icindeki id yi value olarak veriyoruz ki
  //data olarak id ye value yi atamis olyoruz e.target.value denilince artik bu value gelecek
  const userOptions = users.map(({ id, name }) => {
    return (
      <option key={id} value={id}>
        {name}
      </option>
    );
  });
  //userOptions i burda kullanip asagiyi cok temiz tutabiliriz bu kullanim yapisi tercih edilebilir
  return (
    <section>
      <h2>Add a New Post</h2>
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
        {/* select e value olarak userId yi veririz ki, userId ne olursa, tiklandigi
        zaman select icinde sectigimiz eleman gozuksun... */}
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {/*Ilk acildiginda default olarak hicbiryazar secilmemis gozuksun... */}
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button
          style={{ cursor: "pointer" }}
          type="button"
          onClick={onSavePostClicked}
          disabled={!canSave}
          /*Bu da cok guzel bir best praktisdir... */
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
