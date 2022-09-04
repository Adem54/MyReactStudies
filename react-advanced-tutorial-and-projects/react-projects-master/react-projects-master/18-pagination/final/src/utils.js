const paginate = (followers) => {
  const itemsPerPage = 10
  const numberOfPages = Math.ceil(followers.length / itemsPerPage)

  const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage
    return followers.slice(start, start + itemsPerPage)
    //Ilk geliste, itemsPerPage kac verilirse o kadar data gelecek, cunku start index*itemsPerPage i toplayip ona itemsPerPage i ekliyor dolayisi ile ilk geliste, 
  })
  console.log("newFollowers: ",newFollowers);
  //(10) [Array(10), Array(10), Array(10), Array(10), Array(10), Array(10), Array(10), Array(10), Array(10), Array(10)]
  return newFollowers
}

export default paginate
/*
  (10) [Array(10), Array(10), Array(10), Array(10), Array(10), Array(10), Array(10), Array(10), Array(10), Array(10)
Harika bir bestpractise...pagination ile ilgili, ve burda toplam datayi
 10 arli hanelere bolup her bir 10 datayi bir diziyi atiyor
Cunku bu endpintte biz kac data istersek o kadar gelir ve burda yapilan 
mantik ta datanin tamamini aliyor once, sonra da data yi o diziden alip 
10 arli datalara bolup, bir dizi icine 10 tane 10 arli dizi yerlestiriyor
 ve bu sekilde datayi cok kolay bir sekilde kullanacak hale getirmis oluyor
*/