// const posts = [
//   {
//     id: 1,
//     title: "Learning Redux Toolkit",
//     content: "I've heard good things",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     //Daha onceden kendimiz manuel olarak tarih eklersek o zaman o tarihi
//     //bu sekilde 10 dakka onceden yazilmis olarak yazmak icin minutes u da ekliyoruz
//     reactions: {
//       thumbsUp:0,
//       wow:0,
//       heart:0,
//       rocket:0,
//       coffee:0,
//     }
//   },
//   {
//     id: 2,
//     title: "Slices...",
//     content: "The more I say slice, the more I want pizza :) ",
//     date: sub(new Date(), { minutes: 5 }).toISOString(), //5 dakka onceden yazilmis oldugnu belirtmek icin minuts objesi ekliyoruz
//     reactions: {
//       thumbsUp:0,
//       wow:0,
//       heart:0,
//       rocket:0,
//       coffee:0,
//     }
//   },
// ];
//DAtayi artik api den getirecegiz..

import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);

    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    try {
      const response = await axios.post(POSTS_URL, initialPost);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
/*
Bu bu sekilde de yapilir ama bunun yerine bu ilsem i Promise pending-fullfilled-rejected ile
slice icinde yapacagiz
try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
*/

export const createPostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.posts.push(action.payload);
      },
      prepare: ({ title, content, userId }) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            //Tarih islemlerinde tam datayi eklerken o anki tarih alinarak, kullanicin postu yazma tarihini eklemis oluruz..
            //Bu bestpractise de boyledir, tarih islemleri her zaman stringe cevrilerek gonderilir ki o formattan istedgin formata
            //cevirmek kolaydir cunku....

            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded: (state, action) => {
      //Burda hangi post tiklandi ise o posttaki reactions  ile ilgili bir guncelleme yapiyor olacagiz..
      const { postId, reaction } = action.payload;
      console.log("action payload: ", action.payload);
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++; //Gelen reaction hangi reaction property si ise  onu getirir
        //Ve bu sayede biz o reaction property sinin valuesini aliriz ve de 1 arttirmis oluruz o valueyi...
        //Bu bestpractise dir, cunku degiskenler uzerinden, biz accessmember . notasyonu ile degiskenler uzerinden
        //dinamik islem yapamayiz, cunku . notasyonu na tiklayinca, o direk arama yapmaya calisiyor ama bulamiyor...
        //Bu arada burda biz datayi mutate ediyorz yani datanin memory deki adresi degismemis oluyor referans degismiyor
        //ancak redux-toolkitte bu isi bizim iicn immer.js yaptigi icin sorun yasamiyoruz...
      }
    },
  },
  //Asenkron islemler icin kullaniriz burayi..
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;
        //Bize back-end den gelen her bir post icine biz date ve readtions datasini kendimiz burda ekliyoruz...
        //BESTPRACTISE...BURASI COOK ONEMLI...
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        //Bu sekilde elimizdeki data ile loadedPost u birlestirmis oluyoruz.. ve tek bir dizi olarak aliyoruz
       
        state.posts = loadedPosts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.log("rejected");
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        //BESTPRACTISE...api den gelen data icine biz, api formatinda data gondermek zorundayiz
        //ama state icerisinde data gonderirken biz kullaniciya date ve reactions alanlarini da
        //gostermek istiyruz ondan dolayi da yeni data eklerken onlari da ekliyoruz...
        action.payload.userId = Number(action.payload.userId);
        //Api den gelen data formatinda date alani yok o zaman eklememiz gerekiyor
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        console.log("action.paylod: ", action.payload);
        state.posts.push(action.payload);
      });
  },
});

export default createPostsSlice.reducer;
export const selectPosts = (state) => state.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const { postAdded, reactionAdded } = createPostsSlice.actions;
