import { createSlice, nanoid, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";



const initialState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  count: 0,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      return response.data;
    } catch (error) {
      //Biz fake api kullandigmiz icin, biz kendi ekledigmiz bir post un editlemek istdimzde
      //editlenen postu bize dondurmyor ve catche ddusuyor bu problemi simdilik cozmek icin
      //bizde guncellenen datayi error kisminda da return ediyoruz
      //return error.message;
      return initialPost;
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`${POSTS_URL}/${id}`);
      if (response?.status === 200) return initialPost; //Burdan bir data donmesi gerekiyor ki veya en azindan id
      //biz de o id yi alip altta kendi stattimzden silebilelim, yani dogrudan id yi  de gonderebilirdik
      //Normalde rest-api ler delete islemlerinde herhangi birsey dondurmezler ondan dolayi biz kendimiz
      //api den silinen data nin id sini, retutrn olarak dondururuz ki, biz de statimizden silebilelim
      return `${response?.status}: ${response.statusText}`;
    } catch (error) {
      return error.message;
    }
  }
);
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
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
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    increaseCount(state, action) {
      state.count += 1;
      //Dikkat edelim ,mutate islem yapiyoruz, ama problem yasamiyoruz immer.js sayesind o arkada immutable yapiyor datayi
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions
        let min = 1;
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

        // Add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        //Burasi onemli...
        if (!action.payload?.id) {
          //optional chaining ile burayi da kurtariyoruz...
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        //BURAYA DIKKAT EDELIM, DAHA ONCE GORMEMISTIM BU SEKILDE
        //Cok ilginc bir udpate yontemi yapiyor, degistirilecek olan
        //id li, post u once tum postlardan siliyor sonra da
        //degistirilmis olan postu tum postlara ekliyor...
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        state.posts = state.posts.filter((post) => post.id !== id);
      });
  },
});


export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;

//Bestpractise...Burasi onemli..
//id ye gore post secebilecek bir selector olusturacagiz, yani verilen id nin postunu bulacak
//Dikkat etti isek farkli bir islem yapiyoruz ve parametre olarak state yaninda postId de aliyoruz
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

  //PERFORMANS PROBLEMI COZUMU...
  //Gereksiz UserPage in render edilmesini engellemek icin yapiyoruz, sadece userId degistiginde, olussun veya calissin diyoruz...
  //useMemoize gibi dusunebiliriz....
 export const selectPostByUser=createSelector(
    [selectAllPosts,(state,userId)=>userId],
    (posts,userId)=>posts.filter(post=>post.userId===userId)
 ); //Artik biz sadece Header icindeki, increase actionfunctina tiklaynca hic alakasi olmamasina ragmen, userPage render edilmemis olacak...
export const { postAdded, reactionAdded,increaseCount } = postsSlice.actions;

export default postsSlice.reducer;
