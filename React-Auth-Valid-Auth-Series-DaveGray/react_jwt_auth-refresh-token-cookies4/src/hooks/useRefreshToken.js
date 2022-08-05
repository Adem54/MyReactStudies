import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
       
    //Neden withCredentials kulllaniliyor
     //You can use withCredentials property.
//Token bilgisi ve kullaniciya ait bilgiler cookies de tutuldugu icin ve cookies de her request isleminde, 
//back-ende datalar ile gidiyor ve tekrar datalarla da geri donuyordu
//XMLHttpRequest from a different domain cannot set cookie values for their own domain 
//unless withCredentials is set to true before making the request.
/*
withCredentials:true 
ile request bizim cookie lerimiz ile birlikte gidecek ve bizim hicbirsekilde, javascript kodlari ile erisemeycegimz, secur guvenli cookies ler ile
ama axios onu back-end endpointine godnerebiliyor bizim ihtiyacimiz oldugu gibi..
*/
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            //refresh token isteginde,  yeniden acesstoken gonderiliyor ama bu sefer expire tid i daha
            // uzun olan bir accesstoken
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
        //Biz bu fonksiyonu accesstoken in suresi bittigi zaman,  ilk request imiz in sonucu hatali donecek cunku accesstoken in suresi bitmis olacak o zaman da  ne yapacagiz yeniden bir refresh get request gondererk, yeni bir accesstoken alacagiz...
    }
     return refresh;
};
//Bu component, refresh token, refresh requesti yapilmasini sagliyor..

export default useRefreshToken;


/*
What is an HttpOnly Cookie?														
An HttpOnly Cookie is a tag added to a browser cookie that prevents client-side scripts														
 from accessing data. It provides a gate that prevents the specialized cookie from being														
  accessed by anything other than the server.  Using the HttpOnly tag when generating a														
  cookie helps mitigate the risk of client-side scripts accessing the protected cookie,														
  thus making these cookies more secure.														
The example below shows the syntax used within the HTTP response header:														
Set-Cookie: `=“[; “=“]` `[; expires=“][; domain=“]` `[; path=“][; secure][; HttpOnly]`														
If the HttpOnly flag is included in the HTTP response header, the cookie cannot be accessed														
through the client-side script.  As a result, even if a cross-site scripting (XSS) flaw exists,														
 and a user accidentally accesses a link that exploits the flaw, the browser will not reveal the cookie to the third-party.														
Here’s an example – let’s say a browser detects a cookie containing the HttpOnly flag.  														
If the client-side code attempts to read the cookie, the browser will return an empty string as a result.														
 This helps prevent malicious (usually cross-site scripting (XSS)) code from sending the data to an attacker’s website.														

*/
