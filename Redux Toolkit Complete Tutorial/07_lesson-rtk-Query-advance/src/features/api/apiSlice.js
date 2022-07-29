import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    // tagTypes: ['Post', 'User'],
    tagTypes: ['Post', 'User'],
    endpoints: builder => ({})
})

/*
npm i json-server -g		
 json-server --watch data/db.json --port 3500		
http://localhost:3500/todos		
 http://localhost:3500		
		
*/