//Burasi api ile ilgili Crud operasyonlari icin olusturdugumuz slice dir
//Bu spesifik bir redux
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", //defaulttur kullanmasak da olur
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }), //bu da axios da yaptigimiz isleme benziyor
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      transformResponse:res=>res.sort((a,b)=>b.id - a.id),//siralamayi tersine cevirir
      providesTags: ["Todos"],
    }), //hangi methoda hangi endpoints kullanilacak ise onu ayarliyoruz burda, getTodos methodunda cagrilacak endpoint http://localhost:3500/todos budur dolayisi ile query de hangi endpoint cagrilacak onu veririz, ayrica baseUrl i zaten fetchBaseQuery de cagirdigmz icin diger methodlarda sadece, cagrilacak endpointtin alacagi ekstra adres bilgisi var ise onu ekliyoruz
    addTodo: builder.mutation({
      //mutation, burda query yapmiyoruz yeni eleman ekledigmiz icin query degil, mutation olacak..
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      //update de bir query degil bir degisiklik meydana gelecek dolaysi ile mutation olacak...
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      //Burasi da mutation query degil ve e todo geliyor paramtreden biz destructuring ile icindeki id yi aliyoruz
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;

/*
Kendimize ait bir klasor altindaki json dosyasini fake-server olusturup ordan geliyor gibi kullanmak icin asagidaki islemleri yapmak gerek...		
data klasoru altindaki datalari bir fake-server dan geliyor gibi kullanmak icin..		
npm i json-server -g				
 json-server --watch data/db.json --port 3500				
http://localhost:3500/todos				
 http://localhost:3500				
*/