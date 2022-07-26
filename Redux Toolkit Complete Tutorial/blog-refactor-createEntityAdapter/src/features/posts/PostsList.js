import { useSelector } from "react-redux";
import { selectPostIds,getPostsStatus, getPostsError,} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
//   const dispatch = useDispatch();
  const orderedPostIds = useSelector(selectPostIds);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  //index.js de store icinde yaptigimz icin burda gerek kalmadi
//   useEffect(() => {
//     if (postStatus === "idle") {
//       dispatch(fetchPosts());
//     }
//   }, [postStatus, dispatch]);

//iste bize kazandirdiklarindan biri de bu-sortCompare fonksiyonu direk adapter icinde gerceklestirdik, postSlice da, ondan dolayi burda sorta gerek kalmadi
  let content;
  if (postStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postStatus === "succeeded") {
    // const orderedPosts = posts
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPostIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }
  return <section>{content}</section>;
};
export default PostsList;
