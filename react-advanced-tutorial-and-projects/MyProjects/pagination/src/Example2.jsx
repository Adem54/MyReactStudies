import React, {useState} from "react";
import { useQuery } from "react-query";
import { getUsersPage } from "./api/axios";
import PageButton from "./PageButton";
import User from "./User";

const Example2 = () => {
  const [page, setPage] = useState(1);
  /* Bir onceki data da burda parametrede geliyor */
  const {
    data: users,
    isLoading,
    isError,
    error,
    isFetching,
    isPreviousData,
    //react-query nin cache islemi iste ["users",page] buraya bakara tutuyor ve farkli sayfalar icin farkli cache ler tutacak
    //["users",1], ["users",2],["users",3],
  } = useQuery(['/users', page], () => getUsersPage(page), {
    keepPreviousData: true
})
/*
keepPreviousData: true
Consider the following example where we would ideally want to increment a pageIndex (or cursor) for a query.
 If we were to use useQuery, it would still technically work fine, but the UI would jump in and out
  of the success and loading states as different queries
  are created and destroyed for each page or cursor. By setting keepPreviousData to true we get a few new things:
The data from the last successful fetch available while new data is being requested, even though the query key has changed.
When the new data arrives, the previous data is seamlessly swapped to show the new data.
isPreviousData is made available to know what data the query is currently providing you
Eger isPreviousData true ise yeni request gonderilen yeni data gelmis, cache de guncellenmis demektir yok
isPreviousdData false i se o zaman yeni request edilen data, gelmemis cache bir onceki 
*/

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error:{error.message}</p>;

  console.log("users: ",users);
  const content = users.data.map((user) => <User key={user.id} user={user} />);

  //Bu endpointte lastPage bize api ile birlikte gelecek zaaten..
  const lastPage = () => setPage(users.total_pages);
  const firstPage = () => setPage(1);
  // 1 den 10 a kadar degerleri dizi icine yazar
  // console.log(Array(10).fill().map((_,index)=>index+1));
  //Total sayfa kac sayfa ise o sayfa sayisini 1 den sayfa saysi kadar 1,2,3, diye dizi icine yazar..
  //"total_pages": 2 olduugu icn [1,2] gelecek bu islemle bereaber biz kac sayfa varsa, data ilerde degisse bile datya
  //gore sayfa sayisi olusacaktir...
  const pagesArray = Array(users.total_pages)
    .fill()
    .map((_, index) => index + 1);

  const nav = (
    <nav className="nav-ex2">
      <button onClick={firstPage} disabled={isPreviousData || page === 1}>
        &lt;&lt;
      </button>
      {/*Burasi sayfa sayilarini bir array a attik ve PageButton , saya sayilari icin olusturdugmuz componente props olara gonderyoruz
        Ayrica da setPage i de gondererek PageButton iciinde sayfa ile ilgili islemler yapabilmek icin
        */}
      {pagesArray.map((pg) => (
        <PageButton key={pg} pg={pg} setPage={setPage} isPreviousData={isPreviousData} />
      ))}
      <button
        onClick={lastPage}
        disabled={isPreviousData || page === users.total_pages}
      >
        &gt;&gt;
      </button>
    </nav>
  );
  return (
    <>
      {nav}
      {isFetching && <span className="loading">Loading...</span>}
      {content}
    </>
  );
};

export default Example2;
/*
Sayfalama islemlerinde bizim useState te tutacagimz state ler endpointten donen response edilen
datalara gore degiskenlik gosterebilir, yani orenegin eger endpoint bizden fromquery olarak
yani params olarak,? page, hangi sayfanumarasi ve perPage her sayfada bulunan urun sayisini istiyor
ve ona gore bize data donduruyor ise o zaman zaten biz, her turlu, currentPage ve perPage datalarini 
useState te tutacgiz..
Bir pagination isleminde kesinlikle olmasi gereken, tutulmasi gereken 2 deger
https://jsonplaceholder.typicode.com/posts?_page=1 bu sekilde page=1 i dinamik hale getirip her tiklandiginda
page 1 artar ve total kac data var ise o dataya kadar ilerler
Ama bu endpoint bize dogrudan 1. sayfada ornegin kendisi 10 data belirklemis o 10 datayi donduruyor
bizim her sayfada gelmesini bekledigmiz data
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  Ayrica https://jsonplaceholder.typicode.com/posts bu sekidle data nin hepsini birden bize gonderiliyor ise
  back-end de bir pagination olayi yapilmamis ise o zaman da biz herseyi kendimzi front-end de yapmamiz gerekebilir
  Yani kendimiz postsPerPage i de belirleyerek sonra tum datayi dongu icinde dondurup istedigmiz sayilarda sayfa sayilari 
  olusturabiliriz..


  Ama eger endpoint bizden query olarak ?, params bizden sadece page, kacinci sayfa oldugunu belirten
  data bekliyorsa query olarak ve bize da kendisi herbir sayfada perPage kac data olacak onu da donduruyor ise
  ve bize total datayi da donduruyor ise, o zamand a biz endpointten response edilen datalari kullaniriz
  https://reqres.in/api/users?page=1
   const [page, setPage] = useState(1);


*/