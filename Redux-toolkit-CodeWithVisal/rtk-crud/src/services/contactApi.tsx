import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact } from "../model/contact.model";

export const contactsApi = createApi({
  reducerPath: "contactsApi", //Burasi store icinde reducer objesi icnde property olarak dizi icinde destructuring ile propertry olarak kullanacagimz yerdir
  /* reducer:{
        [contactsApi.reducerPath]:contactsApi.reducer,
    } */
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Contact"], //ana datamizin type i Contact type ondan dolayi o ismi veririz buraya
  //Burasi cook onemlidir, burasi sayesinde, crud operasyonlari sonucunda yapilan islemlerin sonucunu, hemen alabiliyoruz yoksa,
  //arka tarafta data ile ilgili islemi yapiyor ama icinde bulungumz islem yapilan componenti render etmedigi icin goremiyoruz iste bu TagTypes,asagida kullanacagimz ProvidesTags,invalidatesTag bunlari kullandigmzdan dolayi bu problem cozulmus oluyor....
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], void>({
      //1.arg donus tipi, 2. si ise QueryArgumenti,yani parametresi
      query: () => "/contacts",
      providesTags: ["Contact"],
    }),
    getContactInfo: builder.query<Contact, Contact["id"]>({
      //id nerden geliyor Contact interface type i icindeki id o zaman direk o id yi refere edelim..
      query: (id) => ({
        url: `/contacts/${id}`,
        // method:"GET",Bu bilgilier olmayacak, id yok,body ye id gonderilmez detail enpointinde, dikkat edelim..
        // body:id,
      }),
      providesTags: ["Contact"],
    }),

    //builder.mutation<void,Contact>, 1.si resulttype, 2.si arg, parametre yani endpointe gonderecegimz data type
    addContact: builder.mutation<void, Contact>({
      query: (contact) => ({
        url: "/contacts",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["Contact"],
    }),
    //Buraya dikkat, delete islemi hicbirsey donmeyecek, argument, yani parametre ise id yani number dir type olarak
    deleteContact: builder.mutation<void, number>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Contact"],
    }),
    //Burda id ile birlikte, ...rest ile de yapariz ya da dogrudan contact datasini gondererek de yapabiliriz...ikisi de ayni seydir aslinda
    updateContact: builder.mutation<void, Contact>({
      query: ({id,...rest}) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

//useGetContactsQuery ismi endpoints de biz action ismini ne verdi isek ordan geliyor sadece camelCase olacagi icin,
// bizim verdgimiz isin kucukharfle basliyor olabilir ama export ederken buyuk harfle baslayacak bu camel-case den dolayi
export const {
  useGetContactsQuery,
  useGetContactInfoQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactsApi;
//add,delete,update gibi operasyonlar builder.mutation ile yapiliyor ve de contactsApi de useAddContactMutaion diye geliyor

/*
Redux-toolkiti kurup, rtk-query ayrlarini yaptiktan sonra, ana server-baseUrl imiz ile birlikte query, yani datalari getiren getContacts query islemini de yaptiktan sonra chrome da redux-dev-tools da state kismi bu sekilde olmalidir, ki redux-toolkit rtq query ayarlarini dogru yaptigmizi anlayalim..
{
  contactsApi: {
    queries: {},
    mutations: {},
    provided: {},
    subscriptions: {},
    config: {
      online: true,
      focused: true,
      middlewareRegistered: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
      refetchOnMountOrArgChange: false,
      keepUnusedDataFor: 60,
      reducerPath: 'contactsApi'
    }
  }
}

*/
