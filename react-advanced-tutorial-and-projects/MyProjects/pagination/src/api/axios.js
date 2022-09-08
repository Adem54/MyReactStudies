import axios from "axios";


export const axiosOne=axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
})


/*
[
{
"userId": 1,
"id": 1,
"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
},
{
"userId": 1,
"id": 2,
"title": "qui est esse",
"body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
},

*/
//default olarak ilk sayfayi getiriyor
//https://jsonplaceholder.typicode.com/posts?_page=1
//1.sayfa ilk 10 datayi getiriyor, dogrudan datalari getiriyor, ekstra page sayfa numarasi, per_page, total_page,total gibi datalar yok
//pageParams buna kullanici tiklayinca parametreye gelecek olan data bu ama fromquery datasi yani ? params datasi bunu unutmayalim...
//Cook onemli bu...
export const getPostsPage=async(pageParam=1)=>{
    const response=await axiosOne.get(`/posts?_page=${pageParam}`);
    return response.data;
}


export const axiosTwo=axios.create({
    baseURL:"https://reqres.in/api"
})

//https://reqres.in/api/users?page=1 bu endpoint icerisinde page:1, kacinci sayfa oldugu,
//her sayfada kac urun tutuldugu, per_page, total de kac sayfa oldugu ve total de 
//kac urun oldugu bilgisi ile tum urunlerin detaylarinin oldugu bilgisi gelir
export const getUsersPage=async (pageParam=1)=>{
    const response=await axiosTwo.get(`/users?page=${pageParam}`)
    return response.data;
}

/*
{
"page": 1,
"per_page": 6,
"total": 12,
"total_pages": 2,
"data": [
{
"id": 1,
"email": "george.bluth@reqres.in",
"first_name": "George",
"last_name": "Bluth",
"avatar": "https://reqres.in/img/faces/1-image.jpg"
},
{
"id": 2,
"email": "janet.weaver@reqres.in",
"first_name": "Janet",
"last_name": "Weaver",
"avatar": "https://reqres.in/img/faces/2-image.jpg"
},

*/