import * as actionTypes from "./actionTypes";

export const addNewTodo=(title)=>(
    {
        type:actionTypes.ADD_NEW_TODO,
        payload:title
    }
)

export const CleanCompletedTodos=()=>{
    return {
        type:actionTypes.CLEAN_COMPLETED_TODOS,
    }
}

export const todoToggle=(id)=>{
    return {
        type:actionTypes.TODO_TOGGLE,
        payload:id
    }
}