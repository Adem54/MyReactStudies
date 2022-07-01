import { Navigate, Route, Routes } from "react-router-dom"

interface Props {
    component:React.ComponentType;
    path?:string;
}
const PrivateRoute:React.FC<Props> = ({component:RouteComponent}) => {
 const token=localStorage.getItem("token");
 if(token)return (<RouteComponent/>)
 return <Navigate to="/login"/>
}

export default PrivateRoute