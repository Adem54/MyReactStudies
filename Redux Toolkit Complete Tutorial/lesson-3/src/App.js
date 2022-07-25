import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import EditPostForm from "./features/posts/EditPostForm";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";
function App() {
  return (
    <Routes>
      {/*Layout componenti burdaki diger tum componentlerin parent i durumundadir  */}
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        {/* Catch all - replace with 404 component if you want. Herhangi bir sayfa bulamazsa, ana sayfaya yonlendirecek
        Diyoruz ki yukardan asagi dogru verilen hicbir adress eger mathc  olmuyor ise o zamam ana sayfaya yonlendirsin diyoruz...
        */}
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
