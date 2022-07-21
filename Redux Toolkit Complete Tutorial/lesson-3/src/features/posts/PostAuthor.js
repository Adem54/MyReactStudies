import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
    const users = useSelector(selectAllUsers)
    userId=Number(userId);
    //Burayi hem addPost hem de editPost kullaniyor addPostdan number type inda geliyor ama
    // editPosttan userId string geld icin author u bulamadi ama Number e cevirdik her harukarda
    const author = users.find(user => user.id === userId);

    return <span>by {author ? author.name : 'Unknown author'}</span>
}
export default PostAuthor