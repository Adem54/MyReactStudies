import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionsButton from "./ReactionsButton";
const PostExcerpt = ({ post }) => {
  const { title, body: content, date, userId } = post;
  return (
    <article>
      <h3>{title}</h3>
      <p>{content.substring(0, 100)}</p>
      <div className="postCredit">
        <PostAuthor userId={userId} />
        <TimeAgo timestamp={date} />
        <ReactionsButton post={post} />
      </div>
    </article>
  );
};

export default PostExcerpt;
