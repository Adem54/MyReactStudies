import React,{useState,useEffect} from "react";
import {api} from "../api"; 
import {useParams,useNavigate} from "react-router-dom";
const COMMENTBODY_START={
    display_name: "",
    body: "",
  }
function YorumFormu(props) {
  const navigate=useNavigate();
  const params=useParams();
  const {post_id,id}=params;//sadece yazi id si geliyor

    const [commentBody, setCommentBody] = useState(COMMENTBODY_START);
    // setCommentBody(COMMENTBODY_START);//Input ve textarea icini temizliyoruz
    useEffect(()=>{
      (props.yorum?.display_name && props?.yorum.body) && setCommentBody(props.yorum)
    },[props.yorum])
    const handleChange = (e) => {
        setCommentBody({
          ...commentBody,
          [e.target.name]: e.target.value,
        });
      };
      const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("commentBody: ",commentBody)
        if(props.yorum?.display_name){
          console.log("Yorum put islemi")
     //put islemini yap burada
          api()
          .put(`/posts/${post_id}/comments/${id}`,commentBody)
          .then(response=>{
            console.log("responsePUT:",response);
            navigate(`/posts/${post_id}`);//yazidetayi sayfasina gitsin bu id ye ait yorumlarin oldugu sayfaya gidecek
          })
          .catch(error=>console.log(error))
        }else{
          console.log("yorum post islemi")
          props.handleSubmit(commentBody);
        }
        setCommentBody(COMMENTBODY_START);
      }
    
  return (
    <React.Fragment>
      <h3>Yorum Yaz</h3>
      <form onSubmit={handleSubmit} className="ui form">
        <div>
          <input
            onChange={handleChange}
            name="display_name"
            value={commentBody.display_name}
            type="text"
            placeholder="Adiniz..."
          />
        </div>
        <textarea
          onChange={handleChange}
          name="body"
          value={commentBody.body}
          placeholder="Yorumunuz"
          rows="3"
        ></textarea>
        <button className="ui blue button" type="submit">
          Yorum Gonder
        </button>
      </form>
    </React.Fragment>
  );
}

export default YorumFormu;
