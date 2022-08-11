import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as api from "./api/usersApi";

const UserForm = ({ user,setIsEditing }) => {
  //COOOK ONEMLI BIR KONU BURASI...  
  const usequeryClient = useQueryClient();
  //Queryclient allow us to access to cache...
  //Bu queryclient ayrica biz optimistisk olarak datayi guncellemek istersek 
  //Yani optimistik demek, biz useQuery uzerinden bize gelen success,error data larina
  //guvenerek, optimistisk yakalasarak data, endpointe gonderilmis ve database de kaydedilmstir
  //Islem basari ile gerceklesmistir diye kabul ederiz..
  //Veya direk datayi cache den almak istersek o zaman kullaniriz
  //Yani bu cok effektif bir sekilde global store gibi davranir..Cunku biz query uzerinden tum
  //datalarimiz cache de tutulacak, ve biz de cache e usequeryClient araciligi ile erisecegiz
  //   console.log("userForm:", user);
  const [fields, setFields] = useState({ ...user });
  console.log("fields: ", fields);


    //Burda simdi kritik bir konu var, biz bu mutation islemini yaptiktan sonra, bir onceki query mi, dogrula ve
  //hemen otomatik olarak, kendi kendine, yeni bir call islemi gercekestir datayi guncellmek icin yoksa degisen
  //datayi biz ekranda goremeyiz..
  //Burda bir durum daha var, eger kullanicimizin, internet hizi cok yavas ise o zaman da save isleminde sonra cache invalidateQueries¨
  //ile yaptirdigmiz otomatik guncelleme de gelmesi biraz surerse o zaman o arada yine baska eski data gozukecek UI da ama biz
  //degisikligin aninda gerceklesmesini istersek o zaman b
  //   const {isLoading,mutate}=useMutation(api.updateUser)
  const {isLoading,mutate} = useMutation(api.updateUser, {
    //Bu onMutate optimistik update islemin gerceklestiriyor, yani save butona basilinca,
    //form dan gonderilen fields datasini henuz cache den data gelmeden ki o da asagidaki onSuccess ile
    //otomatik olarak guncellenmesi sagalniyor ama tabi loading suresi dolunca geliyor ordaki data
    //ama iste optimistik denilen data onMutate de gerceklesiyor onMutate de daha henuz
    //asagidaki onSuccess ile cache i guncelleyip, en son query nin tekrar dogrulanmasini saglayip
    //guncel data nin getirilmesini sagladgmz icin o dogrudan datayi api den alip gelecek o durumda ama,
    //biz daha o data gelmeden o degisikligi bize gelmeden bu is tamamdir bir problem olmaz save e tikladik isSucces
    //zaten gibi varsayimlarimiza guvenerek direk formda bizim en son update e gonderdimgz datayi ekrana bastiriyoruz...
    //Peki burda error gerceklesirse ne yapacagiz? O zaman da uesqueryClient.setQueryData islemini onSuccess icerisinde alirzi
    // ve onSuccesss de parametreye actual data geliyor datayi tekrar eski haline getiririz, ve de onMutate i ortadan kaldiriiz o zaman
    //
    onMutate:(updatedUser)=>{
       // usequeryClient.setQueryData(["user", { id:user.id }],updatedUser);
        //updatedUser mutation islemin yaparken hangi parametre verdi isek onu temsil ediyor aslinda
        //Burdaki updateUserMutation.mutate(fields), fields i temsil ediyor
        //Burasi acilen hemen hangi data submit edildi ise onu replace edecek
       // setIsEditing(false);
        //setIsEditing i burda yapmak istiyoruz asagida yapmak yerine cunku loading in tamamlanmasin beklemeden 
        //isEditing ti false yapmak istiyoruz, biz bir an once kullanicya senin datan optimistik olarak guncellendi

    },
    //data response datadir..Bu cache in update edilmesini sagliyor..
    onSuccess: (data) => {//onSuccess parametresindeki data, onSubmit islemi gerceklestikten sonraki, api den donen gercek data..
        usequeryClient.setQueryData(["user", { id:user.id }],data);
       // Peki onMutate optimistisk data isleminde isler bizim planladimgiz gibi gitmezse error gerceklesirse ne yapacagiz? 
       //O zaman da uesqueryClient.setQueryData islemini onSuccess icerisinde alirzi
        // ve onSuccesss de parametreye actual data geliyor datayi tekrar eski haline getiririz, ve de onMutate i ortadan kaldiriiz o zaman
        
        //Burasi loading in gercekleserek datayi getirir...ama yukardaki sayesinde hic beklenmeden data gelir..hemen tiklandigi gibi
      //fields da en son hangi degisiiklikler var ise onlari ustteki onMutate:(updateUser) islemi sayesinde hemen getirir
      //trigger the old data to be updated-Eski data yi guncellenmesi icin tetikler
      usequeryClient.invalidateQueries(["user", { id:user.id }]);//["user", { id: userId }]
      //cache de biz usedetayini tuttugmuz key in guncellnmesin istiyoruz ve onun key i de bu sekilde idi, userDetail compoentinde
      
    },
  });

  //Burda useQuery de yukarda birkac farkli yaklasim i inceledik, en son biraktimgiz genellikle kullanimi tavsiye edilen bir yontemdir
  //Ama biz tabi ki, diger yaklasimlari da kullanabilirzi....
 

  console.log("isLoading: ", isLoading);



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields([{ ...user, [name]: value }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // mutate(fields);
 mutate(fields);
    console.log("fields: ", fields);
  };

  if (isLoading) {
    return <h2>Changing your records..</h2>;
  }

  return (
    <div style={{ paddingTop: 20 }}>
      <form onSubmit={handleSubmit}>
        <label>
          Name: <br />
          <input
            name="name"
            type="text"
            value={fields.name}
            onChange={handleChange}
            style={{ width: "50%", marginBottom: 20 }}
          />
        </label>

        <label>
          <br />
          Details: <br />
          <input
            name="address"
            type="text"
            value={JSON.stringify(fields.address)}
            onChange={handleChange}
            style={{ width: "50%", marginBottom: 20, display: "block" }}
          />
        </label>
        <button type="submit" style={{ display: "block", marginLeft: "50%" }}>
          Save
        </button>
      </form>
    </div>
  );
};

export default UserForm;
