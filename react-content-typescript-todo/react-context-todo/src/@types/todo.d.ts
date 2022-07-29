
export interface ITodo {
    id:number;
    title:string;
    description:string;
    status:boolean;
}

export type TodoContextType={
    todos:ITodo[];
    saveTodo:(todo:ITodo)=>void;
    updateTodo:(id:number)=>void;
}

/*
TypeScript types allow you to define what a variable or function should expect as a value in order to help the compiler catch errors before runtime.
As you can see, the interface ITodo defines the shape of a to-do object. Next, we have the type TodoContextType that expects an array of to-dos and the methods to add or update a to-do.
*/