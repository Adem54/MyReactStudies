import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',//httpOnly cookies de tutacak,back-ende, apiye istek giderken gonderecegimz accesstoken ve refreshtoken
    //Her istek de de cookies deki credentials lari, kimlik bilgilerini attach ediyoruz yani request e ekliyoruz onu da onun yaninda gonderiyoruz
    prepareHeaders: (headers, { getState }) => {//2.parametre store gibi dusunelim...icinde getState ve dispatch vs olan store umuz
        const token = getState().auth
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        } //Her istek gonderirken,header a token i eklememiz gerekiyor...ve de authorization key i ile eklememiz gerekiyor...
        //Back-end in gelen token kucuk veya buyuk harf duyarli olmayacak sekilde ayarlanmasi daha iyi olur..
        return headers
    }
    //Her request te biz request in header inda islem yapiyoruz ve token i hazirlayip token ile gidiyoruz her requestimizde
})

/*
Biz sadece baseQuery islemi yapmayacagiz,  basequery imizi wrap edecek, yani saracak bir refreshtoken request islemi yapacak olan
baseQueryWithReauth islemi de yapacagiz, ki accesstoken expire time i sone erdigi zaman, baseQuery ile gonderilen request islemlerinde
token expire time sona erdgi icin gecersiz olacak ve 403 forbidden(Yetki yok)-401-unauthorized response u alinacak request basarisiz oldugu
zaman, biz yeniden bir request gonderecegiz refresht token ile birlikte refresh-endpointine..Refresh token bize, accesstoken ile birlikte her
seferinde gelir, ve yenilenmis olarak gelir ve de httpOnly cookies de tutulur 
*/

//args,api,extraOptions parametrelerini vermemiz gerekiyor custom query function olusturdugumuz zaman
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
//Burda kullanilan back-end 403 gonderiyor response olarak, bu api den apiye degisir bazi apilerde 401-unauthorized response edebilri o zaman da 
//status 401 mi o cek edilir, bu api dokumanlarinda yazili olarak gelir, Ve gonderilen istek token expire time sona erdigi icin gecersiz oldugunda
//refresh token devreye girecek, bu sefer de refresh token gonderilecek refrehs-endpointine
    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {//Biz 
            const user = api.getState().auth.user
            //Normalde user bilgileri aslinda, ilk login olduktan sonra kullanciida hep olacaktir, logout olana kadar..
            //user bilgileri api ye verify etmek icin gonderilebilir ama herhangi bir sebebimiz yok, aslinda user bilgilerini
            //back-end e gondermek icin..Dolayisi ile biz user i direk kendi state tmizden aliriz.. api denilen sey aslinda index te 
            //tutulan store, ve setCredentials i invoke ederken de refreshResult.data refresh endpointinden gelir, icinde
            //accesstoken ve refreshtoken vardir, ve de user i da logout olmadigimiz surece kendi statimizde bulunacaktir
           
            // store the new token - tekrar storu muza yaziyoruz...veya statetimze yaziyoru yeni gelen acc
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            //Burda refreshResult.data icinde muhtmelen, hem acccesstoken hem de refreshtoken bulunuyor
            // retry the original query with new access token-Artik refresht token ile gelen accesstoken i ile
            //gercekten hangi protected endpointe istek gonderilecekse, o gonderilir..
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    //Eger accesstoken isteginde, herhangi bir sorun yasanmaz ise, herhangi bir 403-401 alinmaz ise o zaman dogrudan 
    //baseQuery accesstoken ile yaptigi istek demekki basarili olmus ve ordan gelen sonuc dondurulur hic refreshtoken islem
    //lerine vs girilmez, ama yok...acccesstoken ile gondeirlen istek de accesstoken expire time i sona erdi ise o zamn
    //401-403 response lari gelecek, ve o zaman refresh-token islemleri devreye girecek...

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})//Bunlari disarda, extended olarak yapacagiz, specify, yani ozellestirecegiz ondan buray i bu sekilde birakacagiz
    //authApiSlice.js icinde yapacagiz...apiSlice.injectEndpoints diyerek orda kullanacagiz..
})