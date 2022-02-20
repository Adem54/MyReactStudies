
//import {render,screen} from "@testing-library/react/dont-cleanup-after-each";
import {render,screen} from "@testing-library/react";
//render-herhngi bir componenti render edebiliyoruz
//screen ile de dom da olan herhangi bir nesneyi yakalayabiliyoruz..gidip hangi dom u istiyorusak id si su,class i bu olan diye de tanim da yapabiliriz
import userEvent from "@testing-library/user-event";

import Counter from "./index";

//test kodu yazarken butona basildiginda sayi 1 artmali
//butona basildiginda sayi 1 azalmali diyoruz ya it in anlami da aslinda it should be a valid adress gibi birsey ordan geliyor.it i bir fonksyon haline getirmisler her defasinda yazmaktansa


//describe icerisinde daha temiz birden fazla testi yazabiliriz ve ayni seyleri birden fazla kere yazmaktan da kurtulmus oluruz
//describe kullanmamiz ile birlikte bir takim yeni ozelliklerde kullanabilecegiz.Mesela test calismadan once, calisirken veya calistiktan sonra sunlari yap gibi seyler diyebiliyoruz..
describe("Counter Tests", ()=>{
let increaseBtn,decreaseBtn,count;
    //Herseyden once bunmlari yap diyebilecegiz beforeEach fonks icinde
    //beforeEach ile demis oluyoruz ki sen test("increase-btn") yi calistirmadan once befaoreEach icindekileri bi calistir diyoruz, ve sonra test1 i calistir ve test1 bittikjten sonra da tekrar dan beforeEach icindekileri calstir ondan sonra test2 yi calistir mantigi ile calisiyor.
    beforeEach(()=>{
        console.log("Her testten once calisacagim!");
        render(<Counter/>);
        increaseBtn=screen.getByText("Increase");
        decreaseBtn=screen.getByText("Decrease");
         count=screen.getByText("0");

    })
    //increase btn=> bir aciklamadir
//it yerine test de yazabiliriz ayni seydir
 //Bu da yine describe ile gelen bir mehtod ve hersey den once 1 kere calisr.Ama beforeEach ise her testten once 1 kez calisacaktir
beforeAll(()=>{
    console.log("Bir kere calsiacagim")
})

afterAll(()=>{
    console.log("En son bir kere calisacagim!")
})

afterEach(()=>{
    console.log("Her testten sonra calisacagim!!!")
    //beforeEach ile ekledigimiz birseyi afterEach ile kaldirmak isteyebiliriz..
})
test("increase btn", ()=>{
   
   // const count=screen.getByText("0");//icinde 0 yazan texti bul diyoruz ki bunu id ile de yakalayabiliriz..
   //butonun ustunde yazan texti getByText parametresine verirsek bizim o butonumuz buluyor
    //Simdi butonu bulduk ve ona tiklama islemi yaptiracagiz
    userEvent.click(increaseBtn);
    //Simdi butona basma islemini gerceklestirdik bekleyecegiz 
    //Ne olmasini bekleyecegiz
    expect(count).toHaveTextContent("1");//Tiklandiktan sonra 1 olmali diyoruz
    //Dikkat edersek burda gordugumzu fonksiuyonlarda semantik olarak isimlendirilmis...
});

test("decrease btn", ()=>{
   
        //Simdi de Decrease in testini yapalim
    //    const count=screen.getByText("0");//icinde 0 yazan texti bul diyoruz ki bunu id ile de yakalayabiliriz..
        userEvent.click(decreaseBtn);
        expect(count).toHaveTextContent("-1");
})

})





//Testimizi yazdiktan sonra npm test yazacagiz ve o zamn gidip ne yapiyor dosyalardan .test.js olan dosyayi araryip onu test ediyor...Ama mesela biz burda beklenen veriyi 1 yerine 2 yaparsak o zaman testten gecemiyor...