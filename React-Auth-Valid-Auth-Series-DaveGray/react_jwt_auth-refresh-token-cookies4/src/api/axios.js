import axios from 'axios';
const BASE_URL = 'http://localhost:3500';

export default axios.create({
    baseURL: BASE_URL
});

//Burda refresh token islemin yapacak axios a interceptors leri attach edecegiz, yani araya giriciler, yani headers ve withCredentials dedgimiz de 
//JWT token, ya da eger accesstoken expire time sona ermis ise de refresht token dir ,Bunlarin hepsi arka da ouyor ve on yuzdeki herhangi bir kullaniciyi etkilemiyor
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});