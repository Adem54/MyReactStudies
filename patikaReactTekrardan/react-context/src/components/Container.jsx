import React from "react";
import {useTheme} from "../context/ThemeContext";
import Button from "./Button";
import Header from "./Header";
import Profile from "./Profile";
const Container = () => {
    const {theme}=useTheme;
  return (
    <div className={`App ${theme}`}>
      {/*  */}
      <Button />
      <br />
      <hr/>
      <Profile/>
      <br />
      <Header />
    </div>
  );
};
export default Container;
