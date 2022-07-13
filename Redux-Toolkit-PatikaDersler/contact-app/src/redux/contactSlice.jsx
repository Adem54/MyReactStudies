import { createSlice,createEntityAdapter } from "@reduxjs/toolkit";

export const contactAdapter=createEntityAdapter();
//Adapterimizi olusturuz...
const initialState= contactAdapter.getInitialState();

//Entityadapter kullandigmiz icin selector ler de biraz farkli olacak
export const contactSelectors=contactAdapter.getSelectors(state=>state.contacts);
export const contactSlice=createSlice({
    name:"contacts",
    // initialState:contactAdapter.getInitialState(),
    initialState:initialState,
    reducers:{
        addContact:contactAdapter.addOne,
        addContacts:contactAdapter.addMany,
        deleteContact:contactAdapter.removeOne,
        deleteContacts:contactAdapter.removeAll,
        editContact:contactAdapter.updateOne,
    }
});

export const {addContact,addContacts,deleteContact,deleteContacts,editContact}=contactSlice.actions;
export default contactSlice.reducer;





//Normalized State Structure-redux
//Biz statetimizi olusturuken biraz farkli sekilde olustruraciz
//Normalde biz statemizde items array data mizda bizim icinde objeler oluyor ve her 
//birinin icinde de id si olan mesela bircok obje barindiran bir arraymiz oluyor
//Ve biz bu array icinden id sini bildigmiz bir dataya find, veya findIndex
//methodu ile erismeye calisirken ne yapiyoruz aslinda, array icinde tek tek
//bastan sona dogru bir arama gerceklestiriyoruz ki dusunelim ki bizm 10.000 adet
//vermiz var ve aradigmiz data en sonda o zaman ne yapacak tum datalari tek tek
//sorgulayacak ve en son dataya gelince ancak bulabilecek bu da performs acisindan
//cok iyi bir durum degil
//Peki tavsiye edilen durum ne?

//Bize diyor ki sen gidip elle items arrayi olusturma state icine diyor
//Ben senin yerine items icin bir sablon olusturdum,bu sablonda sen aradigin id li
//objeye cok hizli ve pratik bir sekilde erisebileceksin bu sablonda diyor ve sablou bu diyor
/*
{
  users: {
    ids: ["user1", "user2", "user3"],
    entities: {
      "user1": {id: "user1", firstName, lastName},
      "user2": {id: "user2", firstName, lastName},
      "user3": {id: "user3", firstName, lastName},
    }
  }
}

entities ismi ile olusturuyoruz ve her bir elemana da uniq id atamasi yapiyoruz tabi ve bizim hangi id
li elemana ihtiyacimiz var ise ona dogrudan erisecegiz, yani hic arama  yapmadan direk ardgimiz elemana 
erisecegiz...
Nasil yapacak bu ise iste su sekilde

const userId = 'user2'
const userObject = state.users.entities[userId]

Bu data sablonunu designini biz kendimiz de yapabiliriz ancak eger biz bu isi,redux in bize sagladigi
 createEntityAdapter ile yaparsak bize ekstra saglanan guzel ozellikler de bulunuyor 
 
 Managing Normalized State with createEntityAdapter

 Redux-toolkit dokumantasyonunda Apireferansi altinda createEntityAdapter in dokumantasyonunu okuyaiblirz
 
 CreateEntityAdapter ile bize saglananlar
 Ornegin Crud operasyonlari icin bize bazi fonksiyonlar otomatik olarak veriliyor
 CRUD Functions

The primary content of an entity adapter is a set of generated reducer functions for adding, updating, 
and removing entity instances from an entity state object:
addOne: accepts a single entity, and adds it if it's not already present.
addMany: accepts an array of entities or an object in the shape of Record<EntityId, T>, 
and adds them if not already present.
setOne: accepts a single entity and adds or replaces it
setMany: accepts an array of entities or an object in the shape of Record<EntityId, T>, and adds or replaces them.
setAll: accepts an array of entities or an object in the shape of Record<EntityId, T>, and replaces
 all existing entities with the values in the array.
removeOne: accepts a single entity ID value, and removes the entity with that ID if it exists.
removeMany: accepts an array of entity ID values, and removes each entity with those IDs if they exist.
removeAll: removes all entities from the entity state object.
updateOne: accepts an "update object" containing an entity ID and an object containing one or
 more new field values to update inside a changes field, and performs a shallow update on the corresponding entity.
updateMany: accepts an array of update objects, and performs shallow updates on all corresponding entities.
upsertOne: accepts a single entity. If an entity with that ID exists, it will perform a shallow update and 
the specified fields will be merged into the existing entity, with any matching fields overwriting the existing values.
 If the entity does not exist, it will be added.
upsertMany: accepts an array of entities or an object in the shape of Record<EntityId, T> that will be shallowly upserted.

Peki bunlari kullanmak icin yapmamiz gerekenler nedir?

getInitialState
Returns a new entity state object like {ids: [], entities: {}}.

It accepts an optional object as an argument. The fields in that object will be merged into the returned 
initial state value. For example, perhaps you want your slice to also track some loading state:

const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState({
    loading: 'idle',
  }),
  reducers: {
    booksLoadingStarted(state, action) {
      // Can update the additional state field
      state.loading = 'pending'
    },
  },
})

Burda items hariciinde kendi mizin kullanacagi loading,error gibi yapilari ekleyebiliriz kendimiz
*/
