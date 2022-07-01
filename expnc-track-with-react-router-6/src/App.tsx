import React, { Fragment } from "react";
import SignUp from './components/SignUp';
import {
  Routes,
  Route,
} from "react-router-dom";
import { Layout, Menu } from 'antd';
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Records from "./components/Records";
import Category from "./components/Category";
import AppHeader from "./components/AppHeader";
import Logout from "./components/Logout";
const { Header, Content, Footer } = Layout;
function App() {
  return (
 <Fragment> 
      <Layout className="layout">
    <AppHeader/>
    <Content style={{ padding:'50px' }}>
      <Routes>
        <Route path="/register" element={<SignUp />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/records" element={<PrivateRoute component={Records}/> }/>
        <Route path="/categories" element={<PrivateRoute component={Category}/> }/>
        <Route path="/logout" element={<Logout />}/>
      </Routes>
    </Content>
    <Footer style={{ textAlign: 'center' }}>expense-track-react-redux-typescript-app</Footer>
  </Layout>
 </Fragment>
  )
}

export default App;

/*
Back-end- api miz
https://documenter.getpostman.com/view/11347698/TzRPiote


*/