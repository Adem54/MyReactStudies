import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};
//Dikkat edelim, props buraya PostsList ten gonderilecek
const ReactionsButton = ({ post }) => {
   const {id, reactions}=post; 
  const dispatch = useDispatch();
  /*const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
    */
  //Dizi icinde diziler donuyor key,value dizileri ve biz map ile dondururken
  //objeden farkli olarak map arrow func da dizi icindeki 2 datanin degiskenlerini biz burdas kendimiz veriyoruz
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() => dispatch(reactionAdded({ postId: id, reaction: name }))}
        //Gondermem gereken 2 onemli bilgi var, 1 hangi posta tiklandi, 2 reactions objesinin hangi propertysine tiklandi
      >
        {emoji} {reactions[name]}
        {/*Dikkat edelim, biz degisknler ile obje icindeki propertieslerden birinin value sini bu sekilde aliriz dinamik bir sekilde
        Yani  nokta, dot notasyonunu kullanmiyoruz cunku o direk objenin kendisi ile kullanirken kullanilir, dogrudan eleman ariyor o
        */}
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
};

export default ReactionsButton;
