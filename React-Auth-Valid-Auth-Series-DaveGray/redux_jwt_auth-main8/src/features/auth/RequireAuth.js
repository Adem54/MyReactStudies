import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()

    return (
        token//token i aldi isek geldi ise o zaman, biz login olmusuzdur,degilse login sayfasina gonderir bizi tabi hangi sayfadan logine geliyor ise kullanici onu da gonderirki login olunca tekrar geldigi sayfadan uygulamaya girmis olsun...
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}
export default RequireAuth