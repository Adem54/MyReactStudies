import './App.css';
import { Posts } from './Posts';
import { LoadingPosts } from './LoadingPosts';

function App() {
  return (
    <div className="container p-4">
        {/* <LoadingPosts />
        LoadingPosts u burda kullanmayalim yoksa hata ilk gelen 6 datayi alamiyoruz...
        
        */}
        <Posts />
    </div>
  );
}

export default App;
