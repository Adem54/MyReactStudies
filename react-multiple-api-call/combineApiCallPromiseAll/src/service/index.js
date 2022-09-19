import axios from "axios";

let one =
"https://api.storyblok.com/v1/cdn/stories/health?version=published&token=wANpEQEsMYGOwLxwXQ76Ggtt";
let two =
"https://api.storyblok.com/v1/cdn/datasources/?token=wANpEQEsMYGOwLxwXQ76Ggtt";
let three =
"https://api.storyblok.com/v1/cdn/stories/vue?version=published&token=wANpEQEsMYGOwLxwXQ76Ggtt";


const getOne=async()=>{
    const res= await axios.get(one);
    return res.data;
}

const getTwo=async()=>{
    const res= await axios.get(two);
    return res.data;
}

const getThree=async()=>{
    const res= await axios.get(three);
    return res.data;
}

//With PromiseAll
export const getAllInfo=async ()=>{
    try {
        const responses= await Promise.all([getOne(),getTwo(),getThree()]);
        console.log("responsen: ",responses);
        const responseOne=responses[0];
        const responseTwo=responses[1];
        const responseThree=responses[2];
        const result=[];
        //Burda map ten gecirip iclerinden sectigmiz datalari dizi icine doldurup onu return etmeliyiz normalde
        result.push(responseOne,responseTwo,responseThree)
        return result;
    } catch (error) {
        return [];
    }
}



/*  Asagida hem ayri ayri hem de axios.all ile nasil bir endpointten gelen response icindeki
endpointlere de 1 kere de istek gondererek tum datayi elde ederiz onu gorebiliriz
*/

let urlOne="https://api.github.com/users/Adem54";
//Bu url endpointinden gelen response alttaki url leri response olarak getirecek ve biz o ikisine ayni anda request gonderecegiz..

let urlTwo="https://api.github.com/users/Adem54/followers";

let urlThree="https://api.github.com/users/Adem54/repos";


export const getUser=async()=>{
    const res=await axios.get(urlOne);
    return res.data;
}

export const getFollowers=async(url)=>{
    const res= await axios.get(url);
    return res.data;
}

export const getRepos=async(url)=>{
    const res=await axios.get(url);
    return res.data;
}

export const getAllData=async()=>{
    const user=await getUser();
    const {followers_url,repos_url}=user;
    const followers=await getFollowers(followers_url);
    console.log("folloowers:",followers)
    const repos=await getRepos(repos_url);
    console.log("repos:",repos)
    const data=[]
    data.push(user,followers,repos)
    return data;
}



//axios.all ile tum dataya erismek
export const getAxiosAll=async(user)=>{
    const {followers_url,repos_url}=user;
    const res=await axios.all([getFollowers(followers_url),getRepos(repos_url)]);
    const followers=res[0];
    console.log("FOLLOWERSS:",followers)
    const repos=res[1]
    console.log("REPOSS:",repos)
    console.log("axiosAll: ",res);
    return res;
}

export const getAllDataWithAxios=async()=>{
    const user=await getUser();
    const {followers_url,repos_url}=user;
    const myData=[];
    const res=await getAxiosAll(user);
    //Bir dizi icinde gelen datalari bize veriyor...
   myData.push(...res,user);
   return myData;
}

/*
async await islemlerinde dataya erisirken await ile erismeliyiz yoksa
bize data yerine Promise donecektir...biz Promise den datayi ya 
async-await ile ya da then ile aliriz...
*/