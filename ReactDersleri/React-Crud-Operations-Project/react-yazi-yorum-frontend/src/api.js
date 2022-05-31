import axios from "axios";
export function api(){
   return axios.create({
baseURL:"https://react-yazi-yorum.herokuapp.com",
    })
}
/*
Bundan sonra artik api requestlerimzde biz bu fonksiyonu kullanacagiz
api().get("/posts") bunu yazdigimiz da biz aslinda alttaki axios islemini yazmis oluyoruz
axios.get("https://react-yazi-yorum.herokuapp.com/posts")
*/