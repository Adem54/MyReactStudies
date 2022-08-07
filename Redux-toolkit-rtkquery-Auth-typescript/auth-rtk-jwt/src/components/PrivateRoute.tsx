import React, { ReactElement } from 'react'
import { useAppSelector } from '../app/hooks'
import { selectAuth } from '../features/authSlice'
import LoadingRedirect from './LoadingRedirect';

//{children}:{children:ReactElement}
const PrivateRoute = ({children}:{children:ReactElement}) => {
    const {token}=useAppSelector(selectAuth);
     return token ? children: <LoadingRedirect/>   
  
}

// interface privateRouteProps {
//     children:ReactElement
// }

export default PrivateRoute