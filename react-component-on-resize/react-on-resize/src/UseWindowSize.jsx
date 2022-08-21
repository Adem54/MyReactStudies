import React, { useLayoutEffect, useState } from 'react';

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}

export function ShowWindowDimensions(props) {
  const [width, height] = useWindowSize();
    
  let contain;

if(width<=720){
    contain=<h3>Genislik 720 un altinda.....</h3>
}else if(width<=900 && width>720){
    contain=<h3>Genislik 900 un altinda.720 nin ustunde....</h3>
  }else if(width>=900 && width<=1200){
    contain=<h3>Genislik 900 un ustunde ve 1200 un altinda.....</h3>

  }else if(width>=1200){    
    contain=<h3>Genislik 1200 un ustunde.....</h3>
  }
//   return <span>Window size: {width} x {height}</span>;
    return contain;
}