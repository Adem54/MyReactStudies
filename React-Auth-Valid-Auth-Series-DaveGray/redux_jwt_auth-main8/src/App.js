import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import Welcome from './features/auth/Welcome'
import RequireAuth from './features/auth/RequireAuth'
import UsersList from './features/users/UsersList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="userslist" element={<UsersList />} />
        </Route>

      </Route>
    </Routes>
  )
}

export default App;

/*
Back-endde accesstoken response olarak gonderilirken, refresh token hicbirzaman response olarak gonderilmiyor,
Refresh token ise secure cookie olan httpOnly cookie icerisinde gonderilyor guvenli birsekilde
res.cookie("jwt", newRefreshToken, {httpOnly:true, secure:true,})
*/