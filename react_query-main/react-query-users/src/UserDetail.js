import React, { useState } from "react";
import { useQuery } from "react-query";
import * as api from "./api/usersApi";
import UserForm from "./UserForm";
const UserDetail = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { id: userId } = user;

  //Cok dikkkat edelim..Eger, userApi.js de getUser({id}) parammetrede id obje icinde verildi ise o
  //zaman burda bu sekilde handle etmeliyz yok ama, eger
  //userApi de direk id yi koymusssak obje falan olusturmadan o zaman burda da direk id yi koymamiz
  // gerekir hem getUser invoke ederken hem de "user" cache key inin yanina id yi yazarken ondan dolayi buna cok dikkat etmleiyiz
  const {
    data: myUser,
    isSuccess,
    isLoading,
  } = useQuery(
    ["user", { id: userId }],//cache de tutulurken user detayi ile ilgili datalar da key olarak ["user", { id: userId }] bu seklde tutuluyor
    () => {
      return api.getUser({ id: userId });
    },
    { enabled: Boolean(userId) }
  );
  //Burda id eger undefined gelirse o zaman error hata mesaji donecektir ama request 3-4 kez
  //arka arkaya gonderilecek israrla orda da onu 1 kereden sonra
  //ayni hatali end-pointe israrla gondermemsi icin enabled:false ekliyoruz
  //React-query acil bir sekilde dataya erismek istiyor, ondan dolayi da arka arkaya boyle istekler gonderiyor dataya erisene kadar
  //Ama butun bunlarin yerine biz sadece id bize geldigi zaman, getUser methodu istegi gondermesni istersek o zaman da, enabled:Boolean(userId) deriz..
  /*
Tepki sorgusu, agresif ancak aklı başında varsayılanlarla yapılandırılmıştır. 
Bazen bu varsayılanlar yeni kullanıcıları hazırlıksız yakalayabilir veya kullanıcı tarafından
 bilinmiyorsa öğrenmeyi/hata ayıklamayı zorlaştırabilir.
Başarısız olan sorgular, bir hatayı yakalayıp UI'de göstermeden önce üstel geri 
çekilme gecikmesiyle 3 kez sessizce yeniden denenir.
Varsayılan olarak etkin olmayan sorgular, 5 dakika sonra toplanan çöplerdir.
Ornegin, bu react-query developer tools  da inactive gozuken ["users",{"id":1}] ya da ["users",id] bunlardan kullanilayanlar inactive olanlar
ki bunlar cache de tanimlanma sekillerirdir ve 5 dakka islem yapilmaz ise o zaman garbage collector tarafindan toplanip siliniyor
Burda zaten surdan anlacagiz tikladigmiz bir buton ile ornegin eger endpointe request gonderiyorsak ve, ordan gelen data kullaniciya gosteriliyor ise
o zaman biz zaten ordan geleen data uzerinden isLoading i  de alip onu data nin gelme asmasinda ekrana basiyoruz , ve ilk tiklama dogrudan gidip
endpointten getirecek datayi ve biz loading i ekranda gorecegiz ve o butona ayni butona tekrar tekrar basarsak, artik loading olmadan, data nin cok hizli
geldigini zaten anlayabiliriz ki iste bu data nin ilk tiklamada loading i gordugmuz yerde endpointten uzak api den getirildigni , digerlerinin iise cache¨
den geldigni gosterir, iste bu durumun gecerli oldugu sure 5 dakika eger 5 dakika boyunca o butonat tiklamaz isen garbage collector devreye girer ve artik 
cache den o datayi siler ve de, sonrasinda yapilacak ilk istek ile data yine apiden getirilecektir
Gidip cache de kontrol yapiyor 
Biz uygulamanin oldugu ekran dan ayrilinca out of focus olmus olurz ardinan tekrar uygulamanin 
oldugu sayfaya gelince var olan datayi cache den guncelliyor tekrar, yani refetching yapiyor, data nin guncellendiginden emin olmak istiyor
ondan dolyai biz sayfadan ciktik ve sayfaya geri geldik diyelim o zaman re-fetching yapiyor

*/

  //EGer kulllaniciya gosterecegimiz data bir yerden gelecek props a, yani props icindeki id ye vs bagli ise,
  ///o zaman kesinlikle su logici yapip o propsun gelmeme durumunda kullaniciya alternatif olarak nasil bir
  // UX kullanici deneyimi sunacagimizi planlamlaiyiz.....
  if (!user) {
    return <h3>Please choose a user</h3>;
  }

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "CANCEL" : "EDIT"}
      </button>
      <h2>UserDetail</h2>

      {isEditing ? (
        <UserForm user={myUser} setIsEditing={setIsEditing} />
      ) : (
        <div>
          <h4>{myUser.id}</h4>
          <h4>{myUser.name}</h4>
          <h4>{myUser.username}</h4>
          <h4>{myUser.email}</h4>
          <h4>{myUser.phone}</h4>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
