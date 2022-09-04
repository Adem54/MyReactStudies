
import './App.css';
import axios from "axios";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useCallback, useEffect, useState } from 'react';
const url="https://api.unsplash.com/photos/random?client_id=LXLgtlUaEkqcNg940B9ZpO_jUm5jqRR_yTRwYO7HlsM&count=30";
function App() {
const [images,setImages]=useState<any>([]);
const getImages=useCallback(
 async () => {
   const res=await axios.get(url);
   setImages(res.data);
  },
  [],
)
console.log("images: ",images);
useEffect(()=>{
getImages();
},[getImages])


  return (
    <div className="App">
      <h2>React</h2>
      <section>
         {images.length && images.map((image:any)=>( 
         /* <img key={image.id} alt={image.description} src={image.urls.regular} />*/
         <LazyLoadImage
         effect="blur"
         key={image.id}
         alt={image.alt_description}
         height="300px"
         src={image.urls.regular} // use normal <img> attributes as props
         width="1400px" 
         placeholderSrc='Loading....'
         />
        ))} 


      </section>
    </div>
  );
}

export default App;
