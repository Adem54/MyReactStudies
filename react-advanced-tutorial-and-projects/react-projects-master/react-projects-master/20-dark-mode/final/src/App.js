import React, { useState, useEffect } from 'react';
import data from './data';
import Article from './Article';

const getStorageTheme = () => {
  //localStorage i cek et eger orda bir thema var ise onu al yok ise baslangic olarak light theme ile basla
  let theme = 'light-theme';
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
  }
  return theme;
};


function App() {
  const [theme, setTheme] = useState(getStorageTheme());

  const toggleTheme = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
  };

  useEffect(() => {
    document.documentElement.className = theme;
    //Bu dogrudan html i isaret eder  yani root elemene veriyor bunu aslinda yani body ye vermis gibi dusun
    //REactin icinde useEFfect te veya eventl erin icinde bodazlama document.... ve useRef ve event.currentTarget uzerinden
    //direk elementlere dalalim...cok buyuk bir alan var orda bize yardimi dokunacak..
    localStorage.setItem('theme', theme);
  }, [theme]);
  return (
    <main>
      <nav>
        <div className="nav-center">
          <h1>overreacted</h1>
          <button className="btn" onClick={toggleTheme}>
            toggle
          </button>
        </div>
      </nav>
      <section className="articles">
        {data.map((item) => {
          return <Article key={item.id} {...item} />;
        })}
      </section>
    </main>
  );
}

export default App;
