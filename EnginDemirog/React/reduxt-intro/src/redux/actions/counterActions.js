import * as actionTypes from "./actionTypes";

//increseCounter bir fonksiyon ve o da bir fonksiyon return ediyor..o da bir fonksiyon donduruyor dikkat edelim, ve dondurulen fonksiyonun parametresi bir objedir 
//Payload ise degisecek olan veriyi verecek bize payload increaseCounter da 1 oluyor cunku her tiklamada, her aksiyonda 1 arttiracagiz cunku
//Bizim 1 arttirma fonksiyonumuz increseCounter i cagiracak, onu tetikleyecek, bizim eventlerimiz tetiklendigi zamn otomatik olusacak bizim aksiyonlarimiz.
//Bizim 1 arttirma fonksiyonumuz  tiklandigi zaman increseCounter fonksiyonu da cagirilmis olacak, ve increaseCounter da reducer a gidecek ve orda reducer a tetikleme islemi oldugunda gelen talebi bildiriyor yani INCREASE_COUNTER type i ve 1 rakami ile yapilacak islemi, degistirilecek veriyi verdi diyoruz ve reducer da guncelleme islemini yapiyor..Burasi, burdan reducer a gidecek guncelleme isleminin tamamlanabilmesi icin...
//Reducer da once kontrol eder gelen talep gercekten countertipi olan INCRESE_COUNTER mi eger gelen talebin tipi dogru ise, diye switch case ile cek ederek sonra orda nihai guncelleme isi gerceklesecek...reacthooks da yaptigimiz sekilde setState ile...
//Kisacasi bizim aksiyonlarmiz eventlerimiz tetiklendigi zaman burdaki fonksiyonlar cagirilacak, action objesi cagiriliyor action objesi icinde de type ve payload bulunuyor
export const increaseCounter=()=>({
    type:actionTypes.INCREASE_COUNTER,
    payload:1
})

export const decreaseCounter=()=>({
    type:actionTypes.DECREASE_COUNTER,
    payload:1
})

export const increaseByTwoCounter=()=>({
    type:actionTypes.INCREASEBYTWO_COUNTER,
    payload:2
})