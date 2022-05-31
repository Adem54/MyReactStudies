import React from 'react'
import {Link,useParams} from "react-router-dom";

function YorumListesi(props) {
const params=useParams();
//{id: '1149'}
const {id}=params;
    return (
        <React.Fragment>
              <h3>Yorumlar</h3>
      {props.comments.map((comment) =>{ 
        return(
       
        <div className="ui relaxed list" key={comment.id}>
          <div className="item">
            <img
              alt=""
              className="ui avatar image"
              src="/images/avatar/small/daniel.jpg"
            />
            <div className="content">
              <a href="https" className="header">
                {comment.display_name}
              </a>
              <div className="description">
                {" "}
                <b>{comment.body}</b>{" "}
              </div>
            </div>
          </div>
          <Link to={`/posts/${id}/comments/${comment.id}/edit`} className="ui blue button">Duzenle</Link>
          <button className="ui red button">Sil</button>
        </div>
     ) }
      
      )}
        </React.Fragment>
    )
}

export default YorumListesi;

