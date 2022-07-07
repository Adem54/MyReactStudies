import { Fragment,useEffect } from "react";
import "./App.css";
import Content from "./components/Content";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {useSelector} from "react-redux";


function App() {

  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  return (
    <Fragment>
      <section className="todoapp">
        <Header />
        <Content />
        
      </section>
      <Footer />
    </Fragment>
  );
}

export default App;
