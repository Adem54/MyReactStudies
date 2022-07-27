import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { apiSlice } from "../api/apiSlice";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformResponse: (responseData) => {
        let min = 1;
        const loadedPosts = responseData.map((post) => {
          if (!post?.date)
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
        //Adapter sayesinde biz normalize data aldik, obje icinde tek tek datalar, sadece id lerin oldugu dizi ve herzamanki kullandigmiz dizi icinde objelerimizin oldugu data...
      },
      providesTags: (result, error, arg) => [
        { type: "Post", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Post", id })),
        //Burda result.ids bizim id lerin oldugu dizi yi veriyor..
      ],
    }),
    getPostsByUserId: builder.query({
      query: (id) => `/posts/?userId=${id}`,
      //Tum datayi getirme islemi burda da yapiliyor cunku bu dataya bizim detay sayfasinda da ihtiyacimiz olacak...
      transformResponse: (responseData) => {
        let min = 1;
        const loadedPosts = responseData.map((post) => {
          if (!post?.date)
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => [
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),
    addNewPost: builder.mutation({
      //Burda addNewPost, bir action dir, yani, burda query yok mutation var veri degistirme, ver ekleme
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...initialPost,
          userId: Number(initialPost.userId),
          date: new Date().toISOString(),
          reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          },
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation({
      query: (initialPost) => ({
        url: `/posts/${initialPost.id}`,
        method: "PUT",
        body: {
          ...initialPost,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    //optimistic update
    //Burda farkli islemler yapiyoruz cunku burdaki data bize serverdan gelmiyor ve normalize da bu data yok ondan dolayi burda farkli islemlerle kendimiz yapacagiz
    addReaction: builder.mutation({
        query: ({ postId, reactions }) => ({
            url: `posts/${postId}`,
            method: 'PATCH',
            // In a real app, we'd probably need to base this on user ID somehow
            // so that a user can't do the same reaction more than once
            //Gercek uygulamada userId ye ihtiyacimiz var ki, ayni kullanici, ayni emojiye birden fazla tiklayamasin..
            body: { reactions }
        }),
        async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
            // `updateQueryData` requires the endpoint name and cache key arguments,
            // so it knows which piece of cache state to update
            const patchResult = dispatch(
                extendedApiSlice.util.updateQueryData('getPosts', undefined, draft => {
                    // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                    const post = draft.entities[postId]
                    if (post) post.reactions = reactions
                })
            )
            try {
                await queryFulfilled
            } catch {
                patchResult.undo()
            }
        }
    })
  }),
});

export const {
  useGetPostQuery,
  useGetPostsByUserIdQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddReactionMutation,
} = extendedApiSlice;

//returns the query result object, entire result object burasi data degil
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

//Creates memoized selector
const selectPostsData = createSelector(
  selectPostsResult, //input function olarak entire resultobject i aliyor
  (postsResult) => postsResult.data //normalized state object with ids & entities
);
//2 input aliyor, output olarak, data yi veriyor

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(
  (state) => selectPostsData(state) ?? initialState
); //eger, selectPostsData dan state gelirse onu kullan yok o null gelir  ise o zaman da initialState i kullan demis oluyoruz...
