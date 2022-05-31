//Biz bu Todo listesinin testlerini yapacagiz.Biz input a bir ifade yazdgimiz zaman o yazilan ifade butona basildiginda gercekten listeye ekleniyor mu eklenmiyor mu diye bunun unittestlerini yazacagz-Todo.test.js
import React from "react";
import {render,screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todo from "./index";

describe("Todo testleri", ()=>{
    //Burda 2 seyi bilmemiz lazim input ve button eleemntini
    let addBtn,input;
    
    beforeEach(()=>{
        render(<Todo/>);
        addBtn=screen.getByText("Add");
        input=screen.getByLabelText("Text");
      console.log("Todo Test");
    })

    test("Varsayilan olarak verilen 3 nesne render edilmeli", ()=>{
        //Nasil buluruz ornegin ekrana gelmesi gereken elementleri
        //item ile baslayanlar diyebiliriz mesela-regular expression yazacagiz aslinda..
        const items=screen.getAllByText(/Item/i);
        expect(items.length).toEqual(3);
    })

    test("input ve button dokumanda bulunmali", ()=>{
        expect(addBtn).toBeInTheDocument();
        expect(input).toBeInTheDocument();
    })

    test("Input a string girilip butona basilinca listeye eklenmeli",()=>{
        //inputu doldur
        const name="Mehmet";//bir veri olusturup inputa ekleyecegiz
        userEvent.type(input,name);//iki parametre alir hangi iputa yazacaksin ve ne yazacaksin

        //Butona tikla
        userEvent.click(addBtn);

        //assertion-kontrol edecegiz, bir sonuc bekleyecegiz...ne bekleyecegiz,listede yeni bir eleman daha olmasini ve o elemanin da burda yazdigmiz name=Mehmet olmasini bekliyoruz, yani yazdirdgimiz string dokumanda olmali ekranda olmali
        expect(screen.getByText(name)).toBeInTheDocument();

    })
})

//Ilk actgimizda varsayilan olarak gelen items dizi elemnlarinin ekranda listelenip listelenmedigini test edelim oncelikle
//Birda button ve input bu dokumanda var mi render edilmis mi bunu da test edebiliriz
//Ayrica input a veri girildiginde ve buttona basildiginda girilen deger listede gercekten var mi onu kontrol edebiliriz.. 