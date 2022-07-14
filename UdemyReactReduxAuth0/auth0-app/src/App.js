import './App.css';
// import Callback from './components/Callback';
// import Main from './components/Main';
// import NotFound from './components/NotFound';
// import PrivateComponent from './components/PrivateComponent';
// switch (props.location) {
  //   case "":
  //  return <Main {...props}/>;
  //   case "private":
  //     return <PrivateComponent/>
  //     case "callback":
  //       return <Callback/>
  //   default:
  //    return <NotFound/>
  // }

import LoginButton from './components/LoginButton'; 
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
function App(props) {
 
console.log(props.location);
  
  
return (
  <div className="App container">
      <LoginButton/>
      <LogoutButton/>
      <p>The user information is below</p>
      <Profile/>

  </div>
)
 
}

export default App;
