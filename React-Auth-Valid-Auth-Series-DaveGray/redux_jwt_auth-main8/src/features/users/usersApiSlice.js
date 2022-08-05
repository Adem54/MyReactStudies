import { apiSlice } from "../../app/api/apiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            keepUnusedDataFor: 5,//5 seconds,bu RTK query cache ile ilgili yer, default olark 60seconds, 
            //60 saniye beklmemek icin 5 saniye ye dusurduk test ederken hemen gorulebilsin diye
        })
    })
})

export const {
    useGetUsersQuery
} = usersApiSlice 