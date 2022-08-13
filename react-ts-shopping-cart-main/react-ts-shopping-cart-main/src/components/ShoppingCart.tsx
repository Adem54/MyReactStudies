import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import { CartItem } from "./CartItem"
import storeItems from "../data/items.json"

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart()
  return (
    /* Offcanvsas componenti react-strap icerisinde hazir geliyor ve onHide true olursa kapatir, show true olursa da aciyor
    Dolayisi ile show zaten direk false geliyor bizde ama butona tiklanirsa ShoppingContext isOpen true oluyor
    onHide ise gizlemeyi tetiklior ondan dolayi da, closeCart fonksiyonu tetklenerek isOpen false yapiliyor
    */
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cartt</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
          {/*BESTPRACTISE REDUCE KULLANARAK TOPLAM FIYAT HESAPLAMA....VE IKI AYRI DIZI ICINDE ISLEM YAPARAK HESAPLAMA... */}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {//cartItem cartItems icindeki her bir item,total ise arr, yani her seferinde eklenecek ve devam edilece olan deger
                const item = storeItems.find(i => i.id === cartItem.id)//Simdi elimizdeki, cartItems icinde bizde id ve quantity var ama bizim carItems icindeki her urunun price ina da ihtiyacimz var cunku her urun miktarini kendi fiyati ile carpacagiz ama cartItems da, bizim elimizde price yok o zaman biz yine elimzdeki id uzerinden objeye erisip ordan da price i kullaniriz
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)//total in baslayacagi ilk deger 0
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
