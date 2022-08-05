import { Outlet } from "react-router-dom"

const Layout = () => {
    return <Outlet />
    //Outlet children i temsil ediyor...Yani Layout a nested olan, Route larin gosterilebilmesi icin bu gerekiyor
}

export default Layout