
//Burda biz action i create edecek olan fonksiyonu olusturuyoruz..Yani mantik olarak biz action i yapacak olan fonksiyonu burda olusturacagiz, ve bunun hiyerarsi icerisinde gitmesini gereken yerlere gidip reducer vs de state guncellenme islemi hallolduktan sonra biz bu fonksiyonu kullanacagimiz componente gonderip orada ayni fonksiyon mantiginda bir fonksiyon yazacagiz ve bu fonkisiyonu o fonksiyon icinde invoke edecegiz ki zaten component icine biz fonksiyonu, bu action createor da hazirladigmiz fonkiyonu invoke etmek ve oncesinde ve sonrasinda yapmak istedimgz mesaj verme vs gibi islemler var sa onlari da yapma adina bu sekiilde bir mantik izleyecegiz....
//Actionlarimiz bize action donduren fonksiyonlardir....unutmayalim....Actionlarimiz da bir objedir unutmayalim...Action creator fonksiyonlarimizi bize icerisinde type ve paylaod olan obje dondurecek unutymayalim...
//Bizim bu actionCreator fonksiyonumuz invoke edildigindeki invoke edilmesi dispatch sayesinde olacaktir,unutmayalim dispatch duydgumuz zaamn actinCreator fonksiyonunun cagrilmasi, yani dispatch araciligi ile invoke edildginde, reducer a sevk edilmis olacak 
//Reducer daki action parametresine burdaki action objemiz gonderilecek ve burdan aldigi action bilgileri ile reducer da state bilgisi guncellenecek burda guncellenecek olan state bilgisi, cart array state bilgisidir yani kitap siparisi cart dizisine eklenecektir
export const addBookToCart=(book)=>{
    return {
        type:'ADD_BOOK_TO_CART',
        payload:book
    }
}

export const substractFromTheCart=(id)=>(
    {
        type:'DELETE_FROM_CART',  
        payload:id
    }
)

export const increaseCount=(id)=>{
    return {
        type:"INCREASE_COUNT",
        payload:id
    }
}

export const decreaseCount=(id)=>{
    return {
        type:"DECREASE_COUNT",
        payload:id,
    }
}