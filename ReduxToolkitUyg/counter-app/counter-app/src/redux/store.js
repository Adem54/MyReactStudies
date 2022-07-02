import {configureStore} from '@reduxjs/toolkit';


import counterReducer from './counter/counterSlice';

export const store=configureStore({
    reducer:{
        counter:counterReducer,
    },
})





//Burasi storumuz ve reducerlar araciiligi ile tum state leri burda toplayacagiz ve burayi da ana react componenti olan App.jsx e buranin varligindan haberdar edecegiz yani react ile redux i baglayacagiz.....main.jsx de