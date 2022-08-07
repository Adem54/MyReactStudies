import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { formValueType } from "../pages/Auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://testtourapp.herokuapp.com",
  }),
  endpoints: (builder) => ({
    //post-request, because of this mutation
    loginUser: builder.mutation({
      query: (body: Partial<formValueType>) => {
        return {
          url: "/users/signin",
          method: "post",
          body,
        };
      },
    }),
    registerUser:builder.mutation({
        query:(registerForm:formValueType)=>{
            return {
                url: "/users/signup",
                method: "POST",
                body: registerForm
            }
        }
    })
  }),
});

export const { useLoginUserMutation,useRegisterUserMutation } = authApi;
