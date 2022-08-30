import React from "react";

const Modal = (props: ModalType) => {
  const { isOpenModal, setIsOpenModal } = props;
  return (
    <>
      <div
        className="modal-content"
        style={{
          transform: `${isOpenModal ? "translateY(-20%)" : "translateY(-160%)"}`,
        }}
      >
        <span className="close" onClick={() => setIsOpenModal(false)}>
          &times;
        </span>
        <p className="text">Some text in the Modal..</p>
      </div>
      <div
        id="myModal"
        className="modal"
        style={{ display: `${isOpenModal ? "block" : "none"}` }}
      ></div>
    </>
  );
};

interface ModalType {
  isOpenModal: boolean;
  setIsOpenModal: any;
}
export default Modal;

/*
1-Oncelikle sunu yapabiliriz 1 tane positin fixed 
elemtn olusturuuz niye positon fixed cunku position fixed oldugu zaman
ekrana gore hareket eder, ve de left-top,widht height bunlari cok kolay
kontrol ederiz z-index i de yuksek verirsek tum elemntlerin ustunde gozukur
Simdi ilk bas display:none yapilip sonra butona tiklaninca isOpen true false mantiginda false dan true ye cekip eger false ise none, true ise block yap deriz component icinde ve bu sekilde dinamik birsekilde gosteririz, modal i kapatmak icin ise, 
2.olarak da biz arka plan ile yukardan efektli bir sekilde gelen modal kutucugunu kardes element haline getiririz ve display block display none ile arka plani aninda getirirz ki sunu unutmayalim bir elementi true-false ile gosterip kaybetme islemi eger display block display none ile yapiyorsak efekt yapamayiz cunku orda hareket yokki element kayboluyor ve ayni yerinde geri geliyor yani elementi hareket ettirecek ozelliklerde bir degisme olmuyor, iste onun icin bizde modal i icine koyacagimiz elemanti ayri bir element yapiyoruz kendini kapsayan arkaplani hafif koyu efektli yapgtimiz elementin disina cikaririz, sonra da ona normalde transform:translateY(-150%) yaparak yukari ekran disina iteriz ama orda bekliyor sadece biz bu ornekteki ayni mantigi bir kutucuk disinda da bekletip ama kullanicida o beklerken gorunmesin ister isek yani heme ekran da olsun ama kulanici da gormesini o zaman da koyudgujmuz kutucuga overflow hidden verirsek, o zamn yanda sagda solda ustte altta bekler ama gorunmez iste bu mantikta bircok hover effekti ile hem graident effekti hem de ustune gelince yazi, gelmesi effektleri yapiliyor....

*/
