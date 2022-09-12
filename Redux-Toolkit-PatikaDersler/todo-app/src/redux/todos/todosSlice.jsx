

import {createSlice,nanoid,createAsyncThunk,current } from "@reduxjs/toolkit";
import axios from "axios";
//Burdaki name action fonksiyhonlari parametresindeki action
    //objesi icinde type olarak su sekilde geliyor todosSlice/addTodo- name/funcitonname gibi
export const getTodosAsync=createAsyncThunk('todos/getTodosAsync',async ()=>{
    //`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`
   
    const response=await fetch("http://localhost:7000/todos");
    // const data= await response.json();
    // console.log("response.json: ", data);
    return await response.json();
})
//pending-fulfilled-rejected diye kavramlar geliyor-loading-success-error

export const addTodoAsync=createAsyncThunk("todos/addTodoAsync", async (data)=>{
    const response=await axios.post("http://localhost:7000/todos",data);
    return response.data;
})

//Burda ister id ve gonderilecek data yi ayri ayri gondeririz istersek de bir obje icinde
//gonderebiliriz ama tek bir obje icinde gonderedebiliriz
export const toggleTodoAsync=createAsyncThunk("todos/toggleTodoAsync", async ({id,data})=>{
  
    const response=await axios.patch("http://localhost:7000/todos/"+id,data);
    return response.data;
})

export const removeTodoAsync=createAsyncThunk("todos/removeTodoAsync",async ({id})=>{
    const response=await axios.delete("http://localhost:7000/todos/"+id);
    return id;
})

export const clearAllTodoAsync=createAsyncThunk("clearAllTodoAsync", async()=>{
    const response=await axios.delete("http://localhost:7000/todos/");
    return response.data;
})

export const todosSlice=createSlice({
name:"todosSlice",
initialState:{
    items:[
        // {id:1,title:"doing homework",completed:false},
        // {id:2,title:"go to walk",completed:true},
        // {id:3,title:"watch movie",completed:false},
    ],
    isLoading:false,
    error:null,
    addNewTodoLoading:false,
    addNewTodoError:null,
    todosStatus:localStorage.getItem("status") || "All",
    todosStatus2:[
        {name:"All",
        status:localStorage.getItem("status")==="All" ? true:false,
        filter:(todos)=>todos},
        {name:"Active",
        status:localStorage.getItem("status")==="Active" ? true:false,
        filter:(todos)=>todos.filter(todo=>!todo?.completed)},
        {name:"Completed",
        status:localStorage.getItem("status")==="Completed" ? true:false,
        filter:(todos)=>todos.filter(todo=>todo?.completed)},
    ]
},
reducers:{

    addTodo:{
        reducer:(state,action)=>{    
            state.items.push(action.payload);
    },
    prepare:({title})=>{
        return {
            payload:{
                id:nanoid(),
                completed:false,
                title,
            },
        };
    },
},
    toggleTodo:(state,action)=>{
        console.log("action: ",action);
      //  state.items=state.items.map(todo=>todo.id===action.payload ? {...todo,completed:!todo.completed} : todo);
        const todo=state.items.find(todo=>todo.id===action.payload);
         todo.completed=!todo.completed;   
      console.log("state: ",state.items);
    },
    removeTodo:(state,action)=>{
       
        state.items=state.items.filter(todo=>todo.id!==action.payload);
    },
    todosByStatus:(state,action)=>{
        state.todosStatus=action.payload;
    },
    todosByStatus2:(state,action)=>{
        const status=action.payload;
        // localStorage.setItem("status",status);
        state.todosStatus2=state.todosStatus2.map(stat=>stat.name===status ? {...stat,status:true}:{...stat,status:false});
    },
    clearCompleted:(state,action)=>{
        state.items=state.items.filter(todo=>!todo.completed);
    }
},

//Api islemleri ile ilgili slice icinde reducers dan sonra geliyor
//Biz api islemleri ile, yaptigimz add,remove,updat islemlerini yapiyorsak
//reducer da bunlarla ilgili islem yapmaycagiz,ustte ayni islemlerin var olma sebebi, 
//biz extrareducer dan once, yani datalari asenkron olarak almadan once, 
//datalari biz kendimiz asenkron olmayan bir sekilde sadece lokal de kendimiz 
//yapmistik ondan dolayi
extraReducers:{
    //getTodos
      [getTodosAsync.pending]:(state,action)=> {
        //pendign durumunda isLoading true olacak
        state.isLoading=true;
        state.error=null;
      },
      [getTodosAsync.fulfilled]:(state,action)=>{
        //Burasi da success durumunda, bize datayi dondurecek dolayisi ile o da bize
        //action.payload uzerinden gelecek
        console.log("action.payload-getTodoAsync: ",action.payload);
         state.items=action.payload;
         state.isLoading=false;
      } ,
      [getTodosAsync.rejected]:(state,action)=>{
        state.isLoading=false;
        state.error=action.error.message;

      } ,
      //addTodos
      [addTodoAsync.pending]:(state,action)=>{
            state.addNewTodoLoading=true;
            state.addNewTodoError=null;
      }, [addTodoAsync.fulfilled]:(state,action)=>{
        //Bilmemiz gereken onemli noktalar...
        //Birincisi, burda biz datayi hem api ye hem de stattimize ekliyoruz 
        //Statetimize datayi biz response dan gelen gelen data dan alip da eklyoruz
        //Dolayisi ile datayi eklemek icin enter a basma ile data nin on yuzde
        //eklenmesi, arasinda gecen sure de loading olacak...
        state.items.push(action.payload);
        state.addNewTodoLoading=false;
  },  [addTodoAsync.rejected]:(state,action)=>{
    state.addNewTodoLoading=false;
    state.addNewTodoError=action.error.message;
},
    [toggleTodoAsync.fulfilled]:(state,action)=>{
        const {id,completed}=action.payload;
        // let todo=state.items.find(todo=>todo.id===id);
        //  todo.completed=action.payload.completed;
        //state.items=state.items.map(todo=>todo.id===id ? {...todo,completed}:todo);
        const index=state.items.findIndex(item=>item.id===id);
        state.items[index].completed=completed;
    },
    [removeTodoAsync.fulfilled]:(state,action)=>{
        const id=action.payload;
        console.log("remove: ",action.payload);
        // state.items=state.items.filter(todo=>todo.id!==id);
        const index=state.items.findIndex(item=>item.id===id);
        state.items.splice(index,1);
    },
    [clearAllTodoAsync.fulfilled]:(state,action)=>{
        console.log("clearAll: ",action.payload);
        state.items=action.payload;
    }
}
}) 

export const selectfilteredItems=state=>{
    const todoSelected=state.todos.todosStatus2.find(todoS=>todoS.status);
    if(todoSelected){
        if(todoSelected.name==="All") return state.todos.items;
        if(todoSelected.name==="Active") return state.todos.items.filter(todo=>!todo.completed)
         if(todoSelected.name==="Completed") return state.todos.items.filter(todo=>todo.completed)
    }return state.todos.items;
   
}
    
   

export const selectTodos=state=>state.todos.items;
//Burasini da extraReducer da getTodosAsync isleminde api den gelen data lokal state timize eklenmis oluyor...
export const selectLoading=state=>state.todos.isLoading;
export const selectError=state=>state.todos.error;
export const selectAddTodoLoading=state=>state.todos.addNewTodoLoading;
export const selectAddTodoError=state=>state.todos.addNewTodoError;
export const selectTodosStatus=state=>state.todos.todosStatus;

export const todos=todosSlice.reducer;
export const {addTodo,toggleTodo,removeTodo,todosByStatus,todosByStatus2,clearCompleted}=todosSlice.actions;

/*
BESTPRACTISE..
Filtreleme islemlerinin hicbirinde ana datayi-state i degistirmek le isin yok ana data da ,state de  sadece status degisecek
kullanici hangi butona basarsa state deki status o tiklanan butonun statusu olacak ve status un durumuna gore
ana data nin listelendigi component icinde bir tane filtereleme fonksiyonu yazilacak ve o fonksiyon ana datayi kullanarak
status un durumuna gore ana datanin filtrelenmis halini dondurecek ve o fonksiyonun invoke edilmis halini ana data yi
listelerken map mehtodu ile kullandigmiz yerde artik dogrudan ana data yerine, o filterelem icin yaptimigz fonksiyou
kullaniriz ki, ana data hem degismesiin, hem de filtrelemeden gecerek listelensin....
if cumlecigi ile componentte ana datayi filtreleyeceksin ama degistirmeyeceksin....coook onemli...
slice da yapacagim is sadece state timdeki status durumunu dinamik oolarak guncellemek
*/