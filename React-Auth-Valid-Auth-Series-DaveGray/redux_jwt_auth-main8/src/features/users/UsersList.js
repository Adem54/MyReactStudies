import { useGetUsersQuery } from "./usersApiSlice"
import { Link } from "react-router-dom";

const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = (
            <section className="users">
                <h1>Users List</h1>
                <ul>
                    {users.map((user, i) => {
                        return <li key={i}>{user.username}</li>
                    })}
                </ul>
                <Link to="/welcome">Back to Welcome</Link>
            </section>
        )
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>;
    }

    return content
}
export default UsersList

/*
Olay in , refresh token in mantigi su esasinda, eger normal accesstoken zamani bitmis ise, ve kullanici hala,
UsersList sayfasinda takiliyor ise, ve o sayfada herhangi bri sayfayi yenileycek bir islem yaptiginda bu hic
farkyapmaz, en ufak bir islem yapsa, butona tiklasa veya sayfayi yeniledigi anda zaten dogrudan
api ye bir request gonderiliyor ve bu request te esasinda arkada refresh-token web api islemini yapan
api yi tetikliyor ve de orada yeni den token ve refreshtoken uretilerek gonderiliyor, token i alir almaz, token
in artik gederli olmsai ile beraber, token suresi tekrar baslamis oluyor..ve token bittiginde ve isleme devam edildginde
bu islem otomatik birsekilde gerceklesiyor ve bu islemi zaten kullanicinin farketme gibi bir ihtimali yok...
 */