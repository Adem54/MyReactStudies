import { createContext, ReactNode, useContext, useState } from "react"
import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"

//Bunu bilmek onemlidir..
type ShoppingCartProviderProps = {
  children: ReactNode//Buraya react componenti gelecegi icin chilfdren her zaman ya ReactNode dir ya da ReactElementtir
}

//BESTPRACTISE...
//DIKKAT EDELIM..CART ICERISINDE DIREK URUN OBJELERINI TUTMUYOR NE TUTUYOR,
//ID VE QUANTITY YI TUTUYOR KI BU COK MANTIKLI BIRSEY CUNKU ID UZERINDEN ZATEN ANA DATA DA HANGI DATA EKLENMIS ONA ERISEBILIR
//BIRDE O URUN MIKTARINI TUTUYOR...
type CartItem = {
  id: number
  quantity: number
}

//Bu shoppingCartContext in type
//Ve de icerisnde data olarak tabi ki, cartItems yani cart-sepete eklenen datalari atacagimz array
type ShoppingCartContextType = {
  openCart: () => void//Cartu acan metod
  closeCart: () => void//Bu da, cart i kapatan method
  getItemQuantity: (id: number) => number//carttaki urun sayisni alan method
  increaseCartQuantity: (id: number) => void//carttaki urunleri 1 arttiran method
  //addToCart method olarak increaseCartQuantity methoudunu invoke edecek cunku ayni islevi yapiyor zaten
  decreaseCartQuantity: (id: number) => void//Carttaki urun sayisini bir eksilten mehtod
  removeFromCart: (id: number) => void//Carttaki Urunleri bir kerede silen metod
  cartQuantity: number//Carttaki urunmiktari
  cartItems: CartItem[];//cartItems yani cart-sepete eklenen datalari atacagimz array
}

const ShoppingCartContext = createContext({} as ShoppingCartContextType)//Bir baslangic degeri veriyoruz burda

//Bu sekilde context teki ana datayi useShoppingCart methoduna gonderiyor ve shoppingCart ile ilgili 
//data lara useShoppingCart uzerinden erismis oluyor, burda boyle yapmasa idi
//ayri ayri hangi comonentlerde shoppingCartContext e ihtiyaci var ise hepsinde useContext(ShoppingCartContext) 
//seklinde alacakti, ama bu daha pratik ve en basta bir degisiklik yapmak isterse ornegin tek tek sayfalara gitmeye gerek kalmiyor
export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  )

  //BESTPRACTISE..BU DA BIZE COK LAZM OLACAK..VE BUNU DA SHOPPINGCARTCONTEXT TE TUTUYORUZKI BURDA SUNA DIKKAT EDELIM BIZ 
  //SHOPPINGCART ILE ILGILI HANGI DATALARI KULLANICIYA GOSTERECEGIZ, VE SHOPPINGCART ILE ILGILI HANGI DATALAR VE KULLANACAGMIZ ONLARI
  //KULLANICIYA GOSTERIRKEN YAPILACAK MEHTOD ISLEMLER I VE DATALARI ISTE SHOPPINCARTCONTEXT TE TUTUYORUZ
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )
  //cartQuantity ise reduce ile cart icerisindeki id ve quantity sini tuttugu carta atilan objenin,
  //icindeki quantity yi toplayan yani toplam cart icine atilan urunlerin kac tane oldugunu
  //toplayan islemdir cartQuantity

  //BUDA SHOPPINGCART IN TOGGLE ISLEMI ICIN TUTTUGMUZ, OPEN-CLOSE METDHODUR..
  //BU DA COK ONEMLIDIR VE COOK KULLANMAMIZ GEREKECEK, YANI ORNEGIN TOGGLE ISLEMLERI TIKLIYORUZ ACILIYOR TIKLIYORUZ KAPANIYOR
  //STATUS DURUMUDUR ASLINDA, OPENCART-CLOSECART DURUMU
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  function getItemQuantity(id: number) {//id sini aldigi cart objesinin miktarini veriyor..eger var ise yok ise de
    //o zaman onu 0 ile baslatiyor..
    return cartItems.find(item => item.id === id)?.quantity || 0 //Eger yok ise 0 gelsin demek || bu da cok onemli bestpractise dir dikkat edelim
    //bir data dondururuken veya, bir data ya atmaa yaparken, datanin baslangic degeri olarak belirleriz..ve uygulama yi patlamaktan kurtariziz..
  }

  // BESTPRATISE....COOK ONEMLI BIR PRACTISE..SETCARTITEMS ICERISINDE GERCEKTEN UZUN BIR ISLEM YAPIYORUZ..
  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }] //arttirma isleminde ise cart icinde eger aranan id ye ait bir obje  yok ise o zaman
        //bu urun  ilk defa ekleniyordur, ve cart icerisne bu obje eklenir ve baslangic olarak da 1 olarak verilir
      } else {//Ama yok eger ki bu urun daha onceden eklenmis ise o zaman da urun adedi 1 arttirilir
        return currItems.map(item => {//currItems sepette bulunan data nin degismeden onceki hali...
         
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            console.log("item:",item);
            return item //Bu map id yi ariyor ya, tek tek donerek id yi buldugu yerde quantity 1 arttirsin ama ornegin 3 tane data var cardda ve id 2 numaraliya tikliyorsun biz map ile tek tek card icindeki 3 id yi de cek ediyoruz ve 2. numarali id nin quantity sini 1 arttiryorsun ama digerlerinde hicbirsey yapmayacagiz ondan dolayi da onlari da aynisi gibi doniyoruz item diye...
          }//Son durumda ise
        })
      }
    })
  }
  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
     
      {children}
      {/* Dikkat edecek olursak burda ana provider da children larin altina yerlestiriyor children ise bizim diger tum componentlerimiz demektir
      Ve onlarin en altina ShoppinCart i isOpen i false olacak sekilde yerlestiriyor ve ShoppinCart icindeki       <Offcanvas show={show} onHide={handleClose} responsive="lg"> bizim nereye yerlestirdigimzin  onemi yok aslinda ama en mantikli yer olarak buraya yerlestirdik cunku burdan birde props gonderdik ona... isOpen ki bu isOpen i aslinda, values datasinda da gonderebilirdik ama burdan gondermis olduk..

      */}
       <ShoppingCart isOpen={isOpen} />
      
    </ShoppingCartContext.Provider>
    
  )
}

/*ShoppindCartContext.Provider icerisinde, children in yani sira, 
bir de <ShoppingCart isOpen={isOpen} /> data sini gecmis.. */