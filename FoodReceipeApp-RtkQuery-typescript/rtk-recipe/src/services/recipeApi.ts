import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APP_KEY = "713d20e3e60cd85c91c62d2378a4dacf";
const APP_ID = "6d5f2abb";
//https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free
//https://api.edamam.com/search?q=chicken&app_id=6d5f2abb&app_key=713d20e3e60cd85c91c62d2378a4dacf&from=0&to=3&calories=591-722&health=alcohol-free
//burda q=chicken burda chicken dinamik olacak, ayni sekilde health=alcohol-free bu da dinamik olacak
export const recipeApi = createApi({
  reducerPath: "recipeApi", //recipeApi ile store arasindaki baglantiyi kuruyor
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.edamam.com/" }),
  endpoints: (builder) => ({
    //Bunun icerisinde action operasyonlarimizi olusturuyoruz
    getRecipes: builder.mutation({
      //Burda biz searchQuery yi alacagiz ondan dolayi mutation yaziyoruz...burasi onemli dikkat edelikm karistirmayalim
      //searchQuery yi almamiz gerektigi icin mutation kullaniriz
      query: ({ query, health }) => {//Bunlar component icinde calistiracgimz methoda parametre olarak gecilecek...
        //query ve health bunlar aramda kullanacagimz kritlerlerdir
        return {
          url: `search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=${health}`,
          method:"GET",
        };
      },
    }),
  }),
});

export const { useGetRecipesMutation } = recipeApi;


/*
Mutation endpoints may also modify the response contents before the result is cached, define "tags" to identify cache invalidation, and provide cache entry lifecycle callbacks to run additional logic as cache entries are added and removed.
kullanilan tagslar cahche deki datayi kaldirp yerine yenie geleni koymaya yariyor tags kullanmaz isek cahce de ne varsa onu getiriyor sayfa yenilemeden de gelmiyor
*/
/*
Biz apilerle calisirken her zaman api lerin icerisindeki bazi degerleri dinamik kullanarak, islemlerimizi yapiyoruz...
*/

/*
rtk-query konfigurasyonu yaptiktan sonra, redux dev tools da chrome da bu datalari gormemiz gerekiyor, dogru konfigurasyon yaptimgiiz anlamak icin
{
  recipeApi: {
    queries: {},
    mutations: {},
    provided: {},
    subscriptions: {},
    config: {
      online: true,
      focused: true,
      middlewareRegistered: true,
      refetchOnFocus: false,
      refetchOnReconnect: false,
      refetchOnMountOrArgChange: false,
      keepUnusedDataFor: 60,
      reducerPath: 'recipeApi'
    }
  }
}
*/